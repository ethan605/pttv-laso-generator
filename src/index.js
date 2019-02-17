import fs from 'fs';

import _ from 'lodash';
import chalk from 'chalk';
import csv from 'csv';
import docxWasm from '@nativedocuments/docx-wasm';
import docxTemplates from 'docx-templates';

function loadList() {
  const input = String(fs.readFileSync('./input/list.csv'));

  csv.parse(input, (error, rawRecords) => {
    if (error != null) {
      console.error(chalk.redLight(error.message));
      return;
    }

    const records = _.slice(rawRecords, 1);
    const list = _.map(records, rec => {
      const [
        id,
        fullName,
        gender,
        birthHour,
        birthDay,
        birthMonth,
        birthYear,
        calendar,
        explainationDetail,
        ...rawQuestions
      ] = rec;

      // const questions =

      return {
        birthHour,
        calendar,
        fullName,
        gender,
        id,
        birthDate: `${birthDay}/${birthMonth}/${birthYear}`,
      };
    });

    console.debug(list);
  });
}

function fillTemplate() {
  try {
    docxTemplates({
      template: './template.docx',
      output: './output.docx',
      cmdDelimiter: '~',
      data: {
        full_name: 'Nguyễn Văn A',
        gender: 'Nam',
        birth_hour: 'Ngọ',
        birth_date: '12/08/Đinh Sửu',
        calendar: 'Âm lịch',
        contact_type: 'Số điện thoại',
        contact_detail: '0652455478',
        explaination_detail: 'Đương số tuổi Ngọ',
        laso_image: { width: 12.7, height: 16.93, path: './laso_placeholder.jpg', extension: '.jpg' },
        questions: [
          {
            title: '1. Hỏi năm nay làm ăn được không?',
            answer: 'Năm nay làm ăn tốt',
          },
          {
            title: '2. Gia đình sức khoẻ tốt không?',
            answer: 'Năm nay làm ăn tốt',
          },
        ],
      },
    });
  } catch (error) {
    console.error(chalk.redLight(error.message));
  }
}

async function convertToPdf() {
  try {
    await docxWasm.init({
      ENVIRONMENT: 'NODE',
      LAZY_INIT: false,
      ND_DEV_ID: '0P268FOEJBKENB0IUHDKD6JNUT',
      ND_DEV_SECRET: '01J2TEPVHD3PDGA6G38PRCFMH4',
    });

    const api = await docxWasm.engine();
    await api.load('./output.docx');
    const arrayBuffer = await api.exportPDF();
    await api.close();

    fs.writeFileSync('./output.pdf', new Uint8Array(arrayBuffer));
  } catch (error) {
    console.error(chalk.redLight(error.message));
  }
}

loadList();
// fillTemplate();
// convertToPdf();
