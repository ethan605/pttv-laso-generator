import fs from 'fs';
import path from 'path';

import chalk from 'chalk';
import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';

async function loadTemplate() {
  try {
    // const content = fs.readFileSync(path.resolve(__dirname, 'template.docx'), 'binary');
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
      laso_image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIJBywfp3IOswAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAkUlEQVQY052PMQqDQBREZ1f/d1kUm3SxkeAF/FdIjpOcw2vpKcRWCwsRPMFPsaIQSIoMr5pXDGNUFd9j8TOn7kRW71fvO5HTq6qqtnWtzh20IqE3YXtL0zyKwAROQLQ5l/c9gHjfKK6wMZjADE6s49Dver4/smEAc2CuqgwAYI5jU9NcxhHEy60sni986H9+vwG1yDHfK1jitgAAAABJRU5ErkJggg==',
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
    // fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buffer);
    fs.writeFileSync(path.resolve('./output.docx'), buffer);
  } catch (error) {
    const detail = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties,
    };
    console.error(chalk.redBright('ERROR: ', JSON.stringify(detail, null, 2)));
  }
}

loadTemplate();
