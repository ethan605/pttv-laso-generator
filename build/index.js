"use strict";

var _chalk = _interopRequireDefault(require("chalk"));

var _docx4js = _interopRequireDefault(require("docx4js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import _ from 'lodash';
async function loadTemplate() {
  try {
    const docx = await _docx4js.default.load('./template.docx');
    docx.render((type, props, children) => {
      debugger;
    }); // const handler = new MyModelhandler();
    // handler.on('*', ({ type }, dataNode, officeDocument) => {
    //   console.log(`found model:${type}`);
    // });
    // handler.on('r', ({ type }, dataNode, officeDocument) => {
    //   console.log(`found model:${type}`);
    // });
    // docx.parse(handler);
    // debugger;
    // // you can change content on docx.officeDocument.content, and then save
    // docx.officeDocument.content('w\\:t').text('hello');
    // docx.save('../changed.docx');
  } catch (error) {
    console.error(_chalk.default.redBright(error.message));
  }
}

loadTemplate();