const axios = require('axios')

function _getMonthRank() {
  return axios.get('https://api.vc.bilibili.com/link_draw/v2/Doc/rank?biz=1&rank_type=month&page_size=5')
}

function _getWeekRank() {
  return axios.get('https://api.vc.bilibili.com/link_draw/v2/Doc/rank?biz=1&rank_type=week&page_size=5')
}

function _getDayRank() {
  return axios.get('https://api.vc.bilibili.com/link_draw/v2/Doc/rank?biz=1&rank_type=day&page_size=5')
}

function rankApi(app) {
  app.get('/api/rank', (req, res) => {
    axios.all([_getMonthRank(), _getWeekRank(), _getDayRank()])
      .then(axios.spread(function (month, week, day) {
        res.json({ month: month.data, week: week.data, day: day.data })
      })).catch(e => console.log(e))
  })
}

module.exports = rankApi
