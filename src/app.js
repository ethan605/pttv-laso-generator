import fs from 'fs';

import _ from 'lodash';

import { renderChartReading } from './renderers';
import { parseCsv } from './parsers';

async function parseAndGenerate() {
  try {
    const csvData = fs.readFileSync('./input.csv', 'utf-8');
    const records = await parseCsv(csvData);

    _.each(records, async record => {
      const { checksum, id } = record;
      const report = await renderChartReading(record);
      const fileName = `${id}_${checksum.substring(checksum.length - 6)}`;
      fs.writeFileSync(`./outputs/${fileName}.html`, report, 'utf-8');
    });
  } catch (error) {
    console.error(error);
  }
}

parseAndGenerate();
