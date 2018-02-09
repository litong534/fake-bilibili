const axios = require('axios');
function actApi(app) {
  app.get('/api/center', (req, res) => {
    axios({
      url: `https://api.vc.bilibili.com/photo_activity/v2/Activity/list?type=0&biz=0&page_num=0&page_size=20&source=center`,
      method: 'get'
    })
      .then(response => {
        res.json(response.data);
      }).catch(e => console.log(e));
  });
}

module.exports = actApi;