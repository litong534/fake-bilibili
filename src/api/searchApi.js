const axios = require('axios')
function searchApi (app) {
  app.get(`/api/search`, (req, res) => {
    const keyword = req.query.keyword
    const page = req.query.page
    axios.get(`https://search.bilibili.com/api/search?search_type=photo&keyword=${encodeURI(keyword)}&order=totalrank&category_id=1&page=${page}`)
      .then(response => {
        res.json(response.data)
      })
  })
}

module.exports = searchApi
