import _ from 'lodash';
import csv from 'csv';

function parseQuestions(questions) {
  const compacted = _.compact(questions);
  const coupled = _.slice(compacted, 0, compacted.length - (compacted.length % 2));
  if (_.isEmpty(coupled)) return undefined;

  const titles = _.filter(coupled, (__, idx) => idx % 2 === 0);
  const answers = _.reject(coupled, (__, idx) => idx % 2 === 0);
  const pairs = _.unzip([titles, answers]);
  return _.map(pairs, ([title, answer], index) => ({ answer, title: `${index + 1}. ${title}` }));
}

function parseRecordRows(records) {
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

/* eslint-disable import/prefer-default-export */

export function parseCsv(csvData) {
  const stringifiedCsvData = String(csvData);

  return new Promise((resolve, reject) => {
    csv.parse(stringifiedCsvData, (error, rawRecords) => {
      if (error != null) {
        reject(error);
        return;
      }

      const records = _.slice(rawRecords, 1);
      resolve(parseRecordRows(records));
    });
  });
}
