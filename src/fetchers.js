import axios from 'axios';
import cheerio from 'cheerio';
import qs from 'qs';

import {
  /* BASE64_IMAGE_PREFIX, */ CHART_GENERATOR_URL,
  CORS_ANYWHERE_URL,
  HOURS_CONVERSION,
} from './constants';

/* eslint-disable import/prefer-default-export */

export async function fetchChartImage(record) {
  const {
    birthDay, birthHour, birthMonth, birthYear, gender, id,
  } = record;

  const body = {
    anh_mau: '1',
    gio_duong: HOURS_CONVERSION[birthHour],
    gioi_tinh: gender === 'Nam' ? '1' : '0',
    ho_ten: id,
    loai_lich: '1',
    luutru: '0',
    nam_duong: birthYear,
    nam_xem: '2019',
    ngay_duong: birthDay,
    phut_duong: '00',
    thang_duong: birthMonth,
  };

  const { data: pageHtml } = await axios.post(
    CORS_ANYWHERE_URL + CHART_GENERATOR_URL,
    qs.stringify(body),
    { Origin: 'null' },
  );
  const selector = cheerio.load(pageHtml);
  const imageLink = selector('div.content_wrap_laso > img')[0].attribs.src;
  const imageUrl = new URL(imageLink);
  return imageUrl.origin + imageUrl.pathname;

  // const { data: pageHtml } = await axios.post(CHART_GENERATOR_URL, qs.stringify(body));
  // const selector = cheerio.load(pageHtml);
  // const imageLink = selector('div.content_wrap_laso > img')[0].attribs.src;
  // const { data: imageData } = await axios.get(imageLink, { responseType: 'arraybuffer' });
  // const imageBase64 = Buffer.alloc(imageData.byteLength, imageData, 'binary').toString('base64');
  // return `data:image/png;base64,${imageBase64}`;
}
