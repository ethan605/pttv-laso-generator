// import _ from 'lodash';
import chalk from 'chalk';
import docx4js from 'docx4js';

async function loadTemplate() {
  try {
    const docx = await docx4js.load('./template.docx');

    docx.render((type, props, children) => {
      debugger;
    });

    // const handler = new MyModelhandler();

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
    console.error(chalk.redBright(error.message));
  }
}

loadTemplate();
