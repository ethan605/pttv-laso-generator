import axios from 'axios';
import cheerio from 'cheerio';
import docxWasm from '@nativedocuments/docx-wasm';
import qs from 'qs';

import { HOURS_CONVERSION, LASO_IMAGE_CONFIGS } from './constants';

export async function convertDocxToPdf(id) {
  await docxWasm.init({
    ...require('./docx-wasm.json'),
    ENVIRONMENT: 'NODE',
    LAZY_INIT: true,
  });

  const api = await docxWasm.engine();
  await api.load(`./output/${id}.docx`);
  const arrayBuffer = await api.exportPDF();
  await api.close();

  return new Uint8Array(arrayBuffer);
}

export async function fetchLasoImage(record) {
  const { birthDay, birthHour, birthMonth, birthYear, gender, id } = record;

  const body = {
    anh_mau: '1',
    gio_duong: HOURS_CONVERSION[birthHour],
    gioi_tinh: gender === 'male' ? '1' : '0',
    ho_ten: id,
    loai_lich: '1',
    luutru: '1',
    nam_duong: birthYear,
    nam_xem: '2019',
    ngay_duong: birthDay,
    phut_duong: '00',
    thang_duong: birthMonth,
  };

  const { data: pageHtml } = await axios.post('https://tuvivietnam.vn/index.php?anlaso/laso', qs.stringify(body));
  const $ = cheerio.load(pageHtml);
  const imageLink = $('input#barCopy')[0].attribs.value;
  const { data: imageData } = await axios.get(imageLink, { responseType: 'arraybuffer' });
  const buffer = Buffer.alloc(imageData.length, imageData, 'binary');
  const data = buffer.toString('base64');
  return { ...LASO_IMAGE_CONFIGS, data };
}
