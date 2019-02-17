import fs from 'fs';

import _ from 'lodash';
import csv from 'csv';

export function parseQuestions(rawQuestions) {
  const compacted = _.compact(rawQuestions);
  const coupled = _.slice(compacted, 0, compacted.length - (compacted.length % 2));
  if (_.isEmpty(coupled)) return undefined;

  const questions = _.filter(coupled, (__, idx) => idx % 2 === 0);
  const answers = _.reject(coupled, (__, idx) => idx % 2 === 0);
  const pairs = _.unzip([questions, answers]);
  return _.map(pairs, ([question, answer], index) => ({ answer, title: `${index + 1}. ${question}` }));
}

export function parseCsvData(records) {
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

export function loadRecords() {
  return new Promise((resolve, reject) => {
    const input = String(fs.readFileSync('./input.csv'));

    csv.parse(input, (error, rawRecords) => {
      if (error != null) {
        reject(error);
        return;
      }

      const records = _.slice(rawRecords, 1);
      resolve(parseCsvData(records));
    });
  });
}
