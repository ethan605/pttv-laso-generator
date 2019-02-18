"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertDocxToPdf = convertDocxToPdf;
exports.fetchLasoImage = fetchLasoImage;

var _axios = _interopRequireDefault(require("axios"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _docxWasm = _interopRequireDefault(require("@nativedocuments/docx-wasm"));

var _qs = _interopRequireDefault(require("qs"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function convertDocxToPdf(_x) {
  return _convertDocxToPdf.apply(this, arguments);
}

function _convertDocxToPdf() {
  _convertDocxToPdf = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(id) {
    var api, arrayBuffer;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _docxWasm.default.init(_constants.DOCX_WASM_CONFIGS);

          case 2:
            _context.next = 4;
            return _docxWasm.default.engine();

          case 4:
            api = _context.sent;
            _context.next = 7;
            return api.load("./output/".concat(id, ".docx"));

          case 7:
            _context.next = 9;
            return api.exportPDF();

          case 9:
            arrayBuffer = _context.sent;
            _context.next = 12;
            return api.close();

          case 12:
            return _context.abrupt("return", new Uint8Array(arrayBuffer));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _convertDocxToPdf.apply(this, arguments);
}

function fetchLasoImage(_x2) {
  return _fetchLasoImage.apply(this, arguments);
}

function _fetchLasoImage() {
  _fetchLasoImage = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(record) {
    var birthDay, birthHour, birthMonth, birthYear, gender, id, body, _ref, pageHtml, $, imageLink, _ref2, imageData, buffer, data;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            birthDay = record.birthDay, birthHour = record.birthHour, birthMonth = record.birthMonth, birthYear = record.birthYear, gender = record.gender, id = record.id;
            body = {
              anh_mau: '1',
              gio_duong: _constants.HOURS_CONVERSION[birthHour],
              gioi_tinh: gender === 'male' ? '1' : '0',
              ho_ten: id,
              loai_lich: '1',
              luutru: '1',
              nam_duong: birthYear,
              nam_xem: '2019',
              ngay_duong: birthDay,
              phut_duong: '00',
              thang_duong: birthMonth
            };
            _context2.next = 4;
            return _axios.default.post('https://tuvivietnam.vn/index.php?anlaso/laso', _qs.default.stringify(body));

          case 4:
            _ref = _context2.sent;
            pageHtml = _ref.data;
            $ = _cheerio.default.load(pageHtml);
            imageLink = $('input#barCopy')[0].attribs.value;
            _context2.next = 10;
            return _axios.default.get(imageLink, {
              responseType: 'arraybuffer'
            });

          case 10:
            _ref2 = _context2.sent;
            imageData = _ref2.data;
            buffer = Buffer.alloc(imageData.length, imageData, 'binary');
            data = buffer.toString('base64');
            return _context2.abrupt("return", _objectSpread({}, _constants.LASO_IMAGE_CONFIGS, {
              data: data
            }));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _fetchLasoImage.apply(this, arguments);
}