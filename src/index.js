import fs from 'fs';

import chalk from 'chalk';
import docxWasm from '@nativedocuments/docx-wasm';
import docxTemplates from 'docx-templates';

function fillTemplate() {
  try {
    docxTemplates({
      template: './template.docx',
      output: './output.docx',
      cmdDelimiter: '~',
      additionalJsContext: {
        laso_image: () => ({ width: 12.7, height: 16.93, path: './laso_placeholder.jpg', extension: '.jpg' }),
      },
      data: {
        full_name: 'Nguyễn Văn A',
        gender: 'Nam',
        birth_hour: 'Ngọ',
        birth_date: '12/08/Đinh Sửu',
        calendar: 'Âm lịch',
        contact_type: 'Số điện thoại',
        contact_detail: '0652455478',
        explaination_detail: 'Đương số tuổi Ngọ',
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
    console.error(chalk.red(error.message));
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
    console.error(chalk.red(error.message));
  }
}

fillTemplate();
convertToPdf();
