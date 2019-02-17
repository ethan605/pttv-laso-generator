import fs from 'fs';
import path from 'path';

import chalk from 'chalk';
import docx4js from 'docx4js';
import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';

async function fillTemplate() {
  try {
    const content = fs.readFileSync(path.resolve('./template.docx'), 'binary');
    const zip = new JSZip(content);
    const doc = new Docxtemplater();
    doc.loadZip(zip);

    doc.setData({
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
    });

    doc.render();

    const buffer = doc.getZip().generate({ type: 'nodebuffer' });
    fs.writeFileSync(path.resolve('./output.docx'), buffer);
  } catch (error) {
    console.error(chalk.redBright(error.message));
  }
}

async function loadTemp2() {
  try {
    const docx = await docx4js.load('./template.docx');
    debugger;
  } catch (error) {
    console.error(chalk.redBright(error.message));
  }
}

// fillTemplate();
loadTemp2();
