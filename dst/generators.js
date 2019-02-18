"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateReports = generateReports;

var _fs = _interopRequireDefault(require("fs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _chalk = _interopRequireDefault(require("chalk"));

var _docxTemplates = _interopRequireDefault(require("docx-templates"));

var _constants = require("./constants");

var _fetchers = require("./fetchers");

var _parsers = require("./parsers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function generateDocx(_x) {
  return _generateDocx.apply(this, arguments);
}
/* eslint-disable import/prefer-default-export */


function _generateDocx() {
  _generateDocx = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(record) {
    var birthDay, birthHour, birthMonth, birthYear, gender, id, rest, lasoImage, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            birthDay = record.birthDay, birthHour = record.birthHour, birthMonth = record.birthMonth, birthYear = record.birthYear, gender = record.gender, id = record.id, rest = _objectWithoutProperties(record, ["birthDay", "birthHour", "birthMonth", "birthYear", "gender", "id"]);
            lasoImage = (0, _fetchers.fetchLasoImage)(record);
            data = _objectSpread({}, rest, {
              lasoImage: lasoImage,
              birthDate: "".concat(birthDay, "/").concat(birthMonth, "/").concat(birthYear),
              birthHour: _constants.HOURS_MAPPING[birthHour],
              gender: _constants.GENDERS_MAPPING[gender]
            });
            (0, _docxTemplates.default)({
              data: data,
              cmdDelimiter: '~',
              output: "./output/".concat(id, ".docx"),
              processLineBreaks: true,
              template: './template.docx'
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _generateDocx.apply(this, arguments);
}

function generateReports() {
  return _generateReports.apply(this, arguments);
}

function _generateReports() {
  _generateReports = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var toPdf,
        csvData,
        allRecords,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            toPdf = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : false;
            _context2.prev = 1;
            csvData = _fs.default.readFileSync('./input.csv');
            _context2.next = 5;
            return (0, _parsers.parseCsv)(csvData);

          case 5:
            allRecords = _context2.sent;

            _lodash.default.each(allRecords, function (record) {
              var id = record.id;
              generateDocx(record);

              if (toPdf) {
                var pdfData = (0, _fetchers.convertDocxToPdf)(id);

                _fs.default.writeFileSync("./output/".concat(id, ".pdf"), pdfData);
              }
            });

            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            console.error(_chalk.default.redBright(_context2.t0.message));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 9]]);
  }));
  return _generateReports.apply(this, arguments);
}