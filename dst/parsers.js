"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCsv = parseCsv;

var _lodash = _interopRequireDefault(require("lodash"));

var _csv = _interopRequireDefault(require("csv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function parseQuestions(questions) {
  var compacted = _lodash.default.compact(questions);

  var coupled = _lodash.default.slice(compacted, 0, compacted.length - compacted.length % 2);

  if (_lodash.default.isEmpty(coupled)) return undefined;

  var titles = _lodash.default.filter(coupled, function (__, idx) {
    return idx % 2 === 0;
  });

  var answers = _lodash.default.reject(coupled, function (__, idx) {
    return idx % 2 === 0;
  });

  var pairs = _lodash.default.unzip([titles, answers]);

  return _lodash.default.map(pairs, function (_ref, index) {
    var _ref2 = _slicedToArray(_ref, 2),
        title = _ref2[0],
        answer = _ref2[1];

    return {
      answer: answer,
      title: "".concat(index + 1, ". ").concat(title)
    };
  });
}

function parseRecordRows(records) {
  return _lodash.default.map(records, function (rec) {
    var _rec = _toArray(rec),
        id = _rec[0],
        fullName = _rec[1],
        contactDetail = _rec[2],
        gender = _rec[3],
        birthHour = _rec[4],
        birthDay = _rec[5],
        birthMonth = _rec[6],
        birthYear = _rec[7],
        explanation = _rec[8],
        rawQuestions = _rec.slice(9);

    var mainParagraphs = _lodash.default.split(explanation, '\n');

    var questions = parseQuestions(rawQuestions);
    return {
      birthDay: birthDay,
      birthHour: birthHour,
      birthMonth: birthMonth,
      birthYear: birthYear,
      contactDetail: contactDetail,
      fullName: fullName,
      gender: gender,
      id: id,
      mainParagraphs: mainParagraphs,
      questions: questions
    };
  });
}
/* eslint-disable import/prefer-default-export */


function parseCsv(csvData) {
  var stringifiedCsvData = String(csvData);
  return new Promise(function (resolve, reject) {
    _csv.default.parse(stringifiedCsvData, function (error, rawRecords) {
      if (error != null) {
        reject(error);
        return;
      }

      var records = _lodash.default.slice(rawRecords, 1);

      resolve(parseRecordRows(records));
    });
  });
}