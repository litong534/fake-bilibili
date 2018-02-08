const axios = require('axios');
const HEADERS = {
  'Origin': 'https://h.bilibili.com',
  'Referer': 'https://h.bilibili.com/3191077',
  'Host': 'api.vc.bilibili.com',
  'Cookie': 'l=v; sid=c8827bog; finger=edc6ecda; LIVE_BUVID=AUTO2515178073286281; fts=1517807336; buvid3=615D8768-B0E9-40D1-ADBB-E2DA063A366728070infoc; DedeUserID=3191077; DedeUserID__ckMd5=874ca7b1339e6381; SESSDATA=a5a07765%2C1520474499%2Cc298da59; bili_jct=319f8150f75edad66575731b9af8c0ba; Hm_lvt_8a6d461cf92ec46bd14513876885e489=1517814713,1517882693; Hm_lvt_8a6e55dbd2870f0f5bc9194cddf32a02=1517288176,1517814450,1517814703,1517882693; _dfcaptcha=19830921a93cdb1b675ab053467c24de'
}

let baseAxios;

baseAxios = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

if(process.env.NODE_ENV === 'production') {
  baseAxios = axios.create({
    baseURL: '<your server host>',
    timeout: 5000,
  });  
}

module.exports = {
  HEADERS,
  baseAxios
}