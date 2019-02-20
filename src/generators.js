import fs from 'fs';

import _ from 'lodash';
import chalk from 'chalk';
import docxTemplates from 'docx-templates';

import { convertDocxToPdf, fetchLasoImage } from './fetchers';
import { parseCsv } from './parsers';

async function generateDocx(record) {
  try {
    const { birthDay, birthMonth, birthYear, id, ...rest } = record;
    console.log(chalk.greenBright(`Generating report for ID ${id}`));

    const lasoImage = await fetchLasoImage(record);
    
    const data = {
      ...rest,
      lasoImage,
      birthDate: `${birthDay}/${birthMonth}/${birthYear}`,
    };
  
    await docxTemplates({
      data,
      cmdDelimiter: '~',
      output: `./output/${id}.docx`,
      processLineBreaks: true,
      template: './template.docx',
    });
  } catch (error) {
    console.error(chalk.redBright(error.message));
  }
}

/* eslint-disable import/prefer-default-export */

export async function generateReports(toPdf = false) {
  try {
    console.log(chalk.yellowBright('Parsing input data'));
    const csvData = fs.readFileSync('./input.csv');
    const allRecords = await parseCsv(csvData);
    
    _.each(allRecords, async record => {
      const { id } = record;
      await generateDocx(record);

      if (toPdf) {
        const pdfData = await convertDocxToPdf(id);
        fs.writeFileSync(`./output/${id}.pdf`, pdfData);
      }
    });
  } catch (error) {
    console.error(chalk.redBright(error.message));
  }
}
