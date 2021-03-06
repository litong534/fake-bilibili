const axios = require('axios')
const HEADERS = {
  'Origin': 'https://h.bilibili.com',
  'Referer': 'https://h.bilibili.com/<your uid>',
  'Host': 'api.vc.bilibili.com',
  'Cookie': '<your cookie>'
}

let baseAxios

if (process.env.NODE_ENV === 'production') {
  baseAxios = axios.create({
    baseURL: 'https://api.rozwel.club/api/bilibili/api/',
    timeout: 5000
  })
} else {
  baseAxios = axios.create({
    baseURL: '/api',
    timeout: 5000
  })
}
module.exports = {
  HEADERS,
  baseAxios
}
