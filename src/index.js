import _ from 'lodash';
import chalk from 'chalk';
import docxTemplates from 'docx-templates';

import { GENDERS_MAPPING, HOURS_MAPPING } from './constants';
import { convertDocxToPdf, fetchLasoImage } from './fetchers';
import { loadRecords } from './parsers';

async function generateDocx(record) {
  const { birthDay, birthHour, birthMonth, birthYear, gender, id, ...rest } = record;
  const lasoImage = fetchLasoImage(record);
  
  const data = {
    ...rest,
    lasoImage,
    birthDate: `${birthDay}/${birthMonth}/${birthYear}`,
    birthHour: HOURS_MAPPING[birthHour],
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

async function generateRecords() {
  try {
    const allRecords = await loadRecords();
    
    _.each(allRecords, record => {
      generateDocx(record);
      convertDocxToPdf(record.id);
    });
  } catch (error) {
    console.error(chalk.redBright(error.message));
  }
}

generateRecords();
