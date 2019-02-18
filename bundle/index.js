"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.LASO_IMAGE_CONFIGS=exports.GENDERS_MAPPING=exports.HOURS_MAPPING=exports.HOURS_CONVERSION=exports.DOCX_WASM_CONFIGS=void 0;var DOCX_WASM_CONFIGS={ND_DEV_ID:"0P268FOEJBKENB0IUHDKD6JNUT",ND_DEV_SECRET:"01J2TEPVHD3PDGA6G38PRCFMH4"};exports.DOCX_WASM_CONFIGS=DOCX_WASM_CONFIGS;var HOURS_CONVERSION={tys:"00",suu:"02",dan:"04",mao:"06",thin:"08",tyj:"10",ngo:"12",mui:"14",than:"16",dau:"18",tuat:"20",hoi:"22"};exports.HOURS_CONVERSION=HOURS_CONVERSION;var HOURS_MAPPING={tys:"Tý",suu:"Sửu",dan:"Dần",mao:"Mão",thin:"Thìn",tyj:"Tỵ",ngo:"Ngọ",mui:"Mùi",than:"Thân",dau:"Dậu",tuat:"Tuất",hoi:"Hợi"};exports.HOURS_MAPPING=HOURS_MAPPING;var GENDERS_MAPPING={female:"Nữ",male:"Nam"};exports.GENDERS_MAPPING=GENDERS_MAPPING;var LASO_IMAGE_CONFIGS={extension:".jpg",height:16.93,width:12.7};exports.LASO_IMAGE_CONFIGS=LASO_IMAGE_CONFIGS,Object.defineProperty(exports,"__esModule",{value:!0}),exports.convertDocxToPdf=convertDocxToPdf,exports.fetchLasoImage=fetchLasoImage;var _axios=_interopRequireDefault(require("axios")),_cheerio=_interopRequireDefault(require("cheerio")),_docxWasm=_interopRequireDefault(require("@nativedocuments/docx-wasm")),_qs=_interopRequireDefault(require("qs")),_constants=require("./constants");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(e){_defineProperty(t,e,r[e])})}return t}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function asyncGeneratorStep(e,t,r,n,o,a,i){try{var u=e[a](i),s=u.value}catch(e){return void r(e)}u.done?t(s):Promise.resolve(s).then(n,o)}function _asyncToGenerator(u){return function(){var e=this,i=arguments;return new Promise(function(t,r){var n=u.apply(e,i);function o(e){asyncGeneratorStep(n,t,r,o,a,"next",e)}function a(e){asyncGeneratorStep(n,t,r,o,a,"throw",e)}o(void 0)})}}function convertDocxToPdf(e){return _convertDocxToPdf.apply(this,arguments)}function _convertDocxToPdf(){return(_convertDocxToPdf=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_docxWasm.default.init(_constants.DOCX_WASM_CONFIGS);case 2:return e.next=4,_docxWasm.default.engine();case 4:return r=e.sent,e.next=7,r.load("./output/".concat(t,".docx"));case 7:return e.next=9,r.exportPDF();case 9:return n=e.sent,e.next=12,r.close();case 12:return e.abrupt("return",new Uint8Array(n));case 13:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function fetchLasoImage(e){return _fetchLasoImage.apply(this,arguments)}function _fetchLasoImage(){return(_fetchLasoImage=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var r,n,o,a,i,u,s,c,l,f,_,p,d,h,y;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.birthDay,n=t.birthHour,o=t.birthMonth,a=t.birthYear,i=t.gender,u=t.id,s={anh_mau:"1",gio_duong:_constants.HOURS_CONVERSION[n],gioi_tinh:"male"===i?"1":"0",ho_ten:u,loai_lich:"1",luutru:"1",nam_duong:a,nam_xem:"2019",ngay_duong:r,phut_duong:"00",thang_duong:o},e.next=4,_axios.default.post("https://tuvivietnam.vn/index.php?anlaso/laso",_qs.default.stringify(s));case 4:return c=e.sent,l=c.data,f=_cheerio.default.load(l),_=f("input#barCopy")[0].attribs.value,e.next=10,_axios.default.get(_,{responseType:"arraybuffer"});case 10:return p=e.sent,d=p.data,h=Buffer.alloc(d.length,d,"binary"),y=h.toString("base64"),e.abrupt("return",_objectSpread({},_constants.LASO_IMAGE_CONFIGS,{data:y}));case 15:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.generateReports=generateReports;var _fs=_interopRequireDefault(require("fs")),_lodash=_interopRequireDefault(require("lodash")),_chalk=_interopRequireDefault(require("chalk")),_docxTemplates=_interopRequireDefault(require("docx-templates")),_fetchers=(_constants=require("./constants"),require("./fetchers")),_parsers=require("./parsers");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(e){_defineProperty(t,e,r[e])})}return t}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _objectWithoutProperties(e,t){if(null==e)return{};var r,n,o=_objectWithoutPropertiesLoose(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],0<=t.indexOf(r)||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function _objectWithoutPropertiesLoose(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],0<=t.indexOf(r)||(o[r]=e[r]);return o}function asyncGeneratorStep(e,t,r,n,o,a,i){try{var u=e[a](i),s=u.value}catch(e){return void r(e)}u.done?t(s):Promise.resolve(s).then(n,o)}function _asyncToGenerator(u){return function(){var e=this,i=arguments;return new Promise(function(t,r){var n=u.apply(e,i);function o(e){asyncGeneratorStep(n,t,r,o,a,"next",e)}function a(e){asyncGeneratorStep(n,t,r,o,a,"throw",e)}o(void 0)})}}function generateDocx(e){return _generateDocx.apply(this,arguments)}function _generateDocx(){return(_generateDocx=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var r,n,o,a,i,u,s,c,l;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r=t.birthDay,n=t.birthHour,o=t.birthMonth,a=t.birthYear,i=t.gender,u=t.id,s=_objectWithoutProperties(t,["birthDay","birthHour","birthMonth","birthYear","gender","id"]),c=(0,_fetchers.fetchLasoImage)(t),l=_objectSpread({},s,{lasoImage:c,birthDate:"".concat(r,"/").concat(o,"/").concat(a),birthHour:_constants.HOURS_MAPPING[n],gender:_constants.GENDERS_MAPPING[i]}),(0,_docxTemplates.default)({data:l,cmdDelimiter:"~",output:"./output/".concat(u,".docx"),processLineBreaks:!0,template:"./template.docx"});case 4:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function generateReports(){return _generateReports.apply(this,arguments)}function _generateReports(){return(_generateReports=_asyncToGenerator(regeneratorRuntime.mark(function e(){var n,t,r,o=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=0<o.length&&void 0!==o[0]&&o[0],e.prev=1,t=_fs.default.readFileSync("./input.csv"),e.next=5,(0,_parsers.parseCsv)(t);case 5:r=e.sent,_lodash.default.each(r,function(e){var t=e.id;if(generateDocx(e),n){var r=(0,_fetchers.convertDocxToPdf)(t);_fs.default.writeFileSync("./output/".concat(t,".pdf"),r)}}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.error(_chalk.default.redBright(e.t0.message));case 12:case"end":return e.stop()}},e,this,[[1,9]])}))).apply(this,arguments)}var _generators=require("./generators");(0,_generators.generateReports)(),Object.defineProperty(exports,"__esModule",{value:!0}),exports.parseCsv=parseCsv;_lodash=_interopRequireDefault(require("lodash"));var _csv=_interopRequireDefault(require("csv"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _toArray(e){return _arrayWithHoles(e)||_iterableToArray(e)||_nonIterableRest()}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return r}function _arrayWithHoles(e){if(Array.isArray(e))return e}function parseQuestions(e){var t=_lodash.default.compact(e),r=_lodash.default.slice(t,0,t.length-t.length%2);if(!_lodash.default.isEmpty(r)){var n=_lodash.default.filter(r,function(e,t){return t%2==0}),o=_lodash.default.reject(r,function(e,t){return t%2==0}),a=_lodash.default.unzip([n,o]);return _lodash.default.map(a,function(e,t){var r=_slicedToArray(e,2),n=r[0];return{answer:r[1],title:"".concat(t+1,". ").concat(n)}})}}function parseRecordRows(e){return _lodash.default.map(e,function(e){var t=_toArray(e),r=t[0],n=t[1],o=t[2],a=t[3],i=t[4],u=t[5],s=t[6],c=t[7],l=t[8],f=t.slice(9);return{birthDay:u,birthHour:i,birthMonth:s,birthYear:c,contactDetail:o,fullName:n,gender:a,id:r,mainParagraphs:_lodash.default.split(l,"\n"),questions:parseQuestions(f)}})}function parseCsv(e){var t=String(e);return new Promise(function(n,o){_csv.default.parse(t,function(e,t){if(null==e){var r=_lodash.default.slice(t,1);n(parseRecordRows(r))}else o(e)})})}