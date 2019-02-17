import fs from 'fs';

import _ from 'lodash';
import axios from 'axios';
import chalk from 'chalk';
import csv from 'csv';
import docxWasm from '@nativedocuments/docx-wasm';
import docxTemplates from 'docx-templates';
import cheerio from 'cheerio';
import qs from 'qs';

const BIRTH_HOURS_MAPPING = {
  tys: 'Tý',
  suu: 'Sửu',
  dan: 'Dần',
  mao: 'Mão',
  thin: 'Thìn',
  tyj: 'Tỵ',
  ngo: 'Ngọ',
  mui: 'Mùi',
  than: 'Thân',
  dau: 'Dậu',
  tuat: 'Tuất',
  hoi: 'Hợi',
};

const BIRTH_HOURS_CONVERSION = {
  tys: '00',
  suu: '02',
  dan: '04',
  mao: '06',
  thin: '08',
  tyj: '10',
  ngo: '12',
  mui: '14',
  than: '16',
  dau: '18',
  tuat: '20',
  hoi: '22',
};

const GENDERS_MAPPING = { female: 'Nữ', male: 'Nam' };

const LASO_IMAGE_CONFIGS = { extension: '.jpg', height: 16.93, width: 12.7 };

function parseQuestions(rawQuestions) {
  const compacted = _.compact(rawQuestions);
  const coupled = _.slice(compacted, 0, compacted.length - (compacted.length % 2));
  if (_.isEmpty(coupled)) return undefined;

  const questions = _.filter(coupled, (__, idx) => idx % 2 === 0);
  const answers = _.reject(coupled, (__, idx) => idx % 2 === 0);
  const pairs = _.unzip([questions, answers]);
  return _.map(pairs, ([question, answer], index) => ({ answer, title: `${index + 1}. ${question}` }));
}

function parseCsvData(records) {
  return _.map(records, rec => {
    const [
      id,
      fullName,
      contactDetail,
      gender,
      birthHour,
      birthDay,
      birthMonth,
      birthYear,
      explanation,
      ...rawQuestions
    ] = rec;

    const mainParagraphs = _.split(explanation, '\n');
    const questions = parseQuestions(rawQuestions);

    return {
      birthDay,
      birthHour,
      birthMonth,
      birthYear,
      contactDetail,
      fullName,
      gender,
      id,
      mainParagraphs,
      questions,
    };
  });
}

function loadRecords() {
  return new Promise((resolve, reject) => {
    const input = String(fs.readFileSync('./input.csv'));

    csv.parse(input, (error, rawRecords) => {
      if (error != null) {
        reject(error);
        return;
      }

      const records = _.slice(rawRecords, 1);
      resolve(parseCsvData(records));
    });
  });
}

async function fetchLasoImage(record) {
  const { birthDay, birthHour, birthMonth, birthYear, gender, id } = record;

  const body = {
    anh_mau: '1',
    gio_duong: BIRTH_HOURS_CONVERSION[birthHour],
    gioi_tinh: gender === 'male' ? '1' : '0',
    ho_ten: id,
    loai_lich: '1',
    luutru: '1',
    nam_duong: birthYear,
    nam_xem: '2019',
    ngay_duong: birthDay,
    phut_duong: '00',
    thang_duong: birthMonth,
  };

  const { data: pageHtml } = await axios.post('https://tuvivietnam.vn/index.php?anlaso/laso', qs.stringify(body));
  const $ = cheerio.load(pageHtml);
  const imageLink = $('input#barCopy')[0].attribs.value;
  const { data: imageData } = await axios.get(imageLink, { responseType: 'arraybuffer' });
  const buffer = Buffer.alloc(imageData.length, imageData, 'binary');
  const data = buffer.toString('base64');
  return { ...LASO_IMAGE_CONFIGS, data };
}

async function generateDocx(record) {
  const { birthDay, birthHour, birthMonth, birthYear, gender, id, ...rest } = record;
  const lasoImage = fetchLasoImage(record);
  
  const data = {
    ...rest,
    lasoImage,
    birthDate: `${birthDay}/${birthMonth}/${birthYear}`,
    birthHour: BIRTH_HOURS_MAPPING[birthHour],
    gender: GENDERS_MAPPING[gender],
  };

  docxTemplates({
    data,
    cmdDelimiter: '~',
    output: `./output/${id}.docx`,
    processLineBreaks: true,
    template: './template.docx',
  });
}

async function convertToPdf(id) {
  await docxWasm.init({
    ENVIRONMENT: 'NODE',
    LAZY_INIT: true,
    ND_DEV_ID: '0P268FOEJBKENB0IUHDKD6JNUT',
    ND_DEV_SECRET: '01J2TEPVHD3PDGA6G38PRCFMH4',
  });

  const api = await docxWasm.engine();
  await api.load(`./output/${id}.docx`);
  const arrayBuffer = await api.exportPDF();
  await api.close();

  fs.writeFileSync(`./output/${id}.pdf`, new Uint8Array(arrayBuffer));
}

async function generateRecords() {
  try {
    const allRecords = await loadRecords();
    
    _.each(allRecords, record => {
      generateDocx(record);
      // convertToPdf(record.id);
    });
  } catch (error) {
    console.error(chalk.redBright(error.message));
  }
}

generateRecords();
