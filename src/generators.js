import fs from 'fs';

import _ from 'lodash';
import chalk from 'chalk';
import docxTemplates from 'docx-templates';

import { convertDocxToPdf, fetchLasoImage } from './fetchers';
import { parseCsv } from './parsers';

async function generateDocx(record) {
  const { birthDay, birthMonth, birthYear, id, ...rest } = record;
  const lasoImage = fetchLasoImage(record);
  
  const data = {
    ...rest,
    lasoImage,
    birthDate: `${birthDay}/${birthMonth}/${birthYear}`,
  };

  docxTemplates({
    data,
    cmdDelimiter: '~',
    output: `./output/${id}.docx`,
    processLineBreaks: true,
    template: './template.docx',
  });
}

/* eslint-disable import/prefer-default-export */

export async function generateReports(toPdf = false) {
  try {
    const csvData = fs.readFileSync('./input.csv');
    const allRecords = await parseCsv(csvData);
    
    _.each(allRecords, record => {
      const { id } = record;
      generateDocx(record);

      if (toPdf) {
        const pdfData = convertDocxToPdf(id);
        fs.writeFileSync(`./output/${id}.pdf`, pdfData);
      }
    });
  } catch (error) {
    console.error(chalk.redBright(error.message));
  }
}
