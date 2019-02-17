import fs from 'fs';

import _ from 'lodash';
import chalk from 'chalk';
import csv from 'csv';
import docxWasm from '@nativedocuments/docx-wasm';
import docxTemplates from 'docx-templates';

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

function parseCsvRecords(records) {
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
      calendar,
      explanation,
      ...rawQuestions
    ] = rec;

    const mainParagraphs = _.split(explanation, '\n');
    const questions = parseQuestions(rawQuestions);

    return {
      birthHour,
      calendar,
      contactDetail,
      fullName,
      gender,
      id,
      mainParagraphs,
      questions,
      birthDate: `${birthDay}/${birthMonth}/${birthYear}`,
    };
  });
}

function loadExplanationsList() {
  return new Promise((resolve, reject) => {
    const input = String(fs.readFileSync('./input/explanations_list.csv'));

    csv.parse(input, (error, rawRecords) => {
      if (error != null) {
        reject(error);
        return;
      }

      const records = _.slice(rawRecords, 1);
      resolve(parseCsvRecords(records));
    });
  });
}

async function generateDocx(id, data) {
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
    const allExplanations = await loadExplanationsList();

    _.each(allExplanations, data => {
      const { id } = data;
      generateDocx(id, data);
      // convertToPdf(id);
    });
  } catch (error) {
    console.error(chalk.redBright(error.message));
  }
}

generateRecords();
