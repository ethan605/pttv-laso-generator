import fs from 'fs';

import _ from 'lodash';
import axios from 'axios';
import chalk from 'chalk';
import csv from 'csv';
import docxWasm from '@nativedocuments/docx-wasm';
import docxTemplates from 'docx-templates';

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

async function generateDocx(id, record) {
  const { birthDay, birthHour, birthMonth, birthYear, gender, ...rest } = record;
  
  const data = {
    ...rest,
    birthDate: `${birthDay}/${birthMonth}/${birthYear}`,
    birthHour: BIRTH_HOURS_MAPPING[birthHour],
    gender: GENDERS_MAPPING[gender],
  };

  docxTemplates({
    data,
    additionalJsContext: {
      renderLasoImage: () => ({ ...LASO_IMAGE_CONFIGS, path: './laso-placeholder.jpg' }),
    },
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
    renderLasoImage(allRecords[0]);

    // _.each(allRecords, record => {
    //   const { id, ...data } = record;
    //   generateDocx(id, data);
    //   convertToPdf(id);
    // });
  } catch (error) {
    console.error(chalk.redBright(error.message));
  }
}

async function renderLasoImage(data) {
  const { birthDay, birthHour, birthMonth, birthYear, gender, id } = data;
  const body = {
    ho_ten: id,
    gioi_tinh: gender === 'male' ? '1' : '0',
    loai_lich: '1',
    ngay_duong: birthDay,
    thang_duong: birthMonth,
    nam_duong: birthYear,
    gio_duong: BIRTH_HOURS_CONVERSION[birthHour],
    phut_duong: '00',
    nam_xem: '2019',
    anh_mau: '1',
    luutru: '1',
  };

  const response = await axios.post('https://tuvivietnam.vn/index.php?anlaso/laso', body);
  console.debug(response);
}

generateRecords();
