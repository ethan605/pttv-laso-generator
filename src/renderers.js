import Handlebars from 'handlebars/runtime';
import { fetchChartImage } from './fetchers';

import './configs/report.handlebars';

const INJECTED_VALUES = {
  currentYear: new Date().getFullYear(),
  publicPath: process.env.PUBLIC_PATH,
};

function registerPartials() {
  Handlebars.registerPartial('chartImage', Handlebars.templates.chart_image);
  Handlebars.registerPartial('clientInfo', Handlebars.templates.client_info);
  Handlebars.registerPartial('footer', Handlebars.templates.footer);
  Handlebars.registerPartial('generalReadings', Handlebars.templates.general_readings);
  Handlebars.registerPartial('header', Handlebars.templates.header);
  Handlebars.registerPartial('htmlHead', Handlebars.templates.html_head);
  Handlebars.registerPartial('opportunities', Handlebars.templates.opportunities);
  Handlebars.registerPartial('questions', Handlebars.templates.questions);
}

registerPartials();

/* eslint-disable import/prefer-default-export */

export async function renderChartReading(record) {
  const chartImage = await fetchChartImage(record);
  return Handlebars.templates.report({ ...INJECTED_VALUES, ...record, chartImage });
}
