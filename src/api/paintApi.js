const axios = require('axios')
const common = require('./common')
function initApi(app) {
  // slidershow data request
  app.get('/api/getHeader', (req, res) => {
    axios({
      url: 'https://api.vc.bilibili.com/oper/v1/banner/getListOnline',
      method: 'post',
      data: {
        'product': 2,
        'platform': 'pc',
        'position_id[0]': 8,
        'csrf_token': 'd99c98409f4064b96e22a27395abdeda'
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: Object.assign(common.HEADERS, {
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).then(response => {
      res.json(response.data)
    }).catch(e => console.log(e))
  })
  // not in use yet
  app.get('/api/activity', (req, res) => {
    axios.get('http://api.vc.bilibili.com/photo_activity/v2/Activity/list?type=0&biz=1&page_size=3')
      .then(response => {
        res.json(response.data)
      }).catch(e => console.log(e))
  })
  // recommend drawer data request
  app.get('/api/drawer', (req, res) => {
    axios.get('http://api.vc.bilibili.com/link_draw/v2/Doc/drawer?num=6')
      .then(response => {
        res.json(response.data)
      }).catch(e => console.log(e))
  })
  //  recommend illustration data request with infinity loading
  app.get('/api/recommends', (req, res) => {
    const pageNum = req.query.page
    axios.get(`https://api.vc.bilibili.com/link_draw/v2/Doc/list?category=all&type=hot&page_num=${pageNum}&page_size=30`)
      .then(response => {
        res.json(response.data)
      }).catch(e => console.log(e))
  })
  // illustration detail data request
  app.get('/api/illustration/detail', (req, res) => {
    const doc_id = req.query.doc_id
    axios.get(`http://api.vc.bilibili.com/link_draw/v1/doc/detail?doc_id=${doc_id}`)
      .then(response => {
        res.json(response.data)
      }).catch(e => console.log(e))
  })
  // user data request query with uid
  app.get('/api/user', (req, res) => {
    const uid = req.query.uid
    axios({
      url: `http://api.vc.bilibili.com/user_ex/v1/user/detail?user[]=info&user[]=level&room[]=live_status&room[]=room_link&feed[]=fans_count&feed[]=feed_count&feed[]=is_followed&uid=${uid}`,
      method: 'get',
      headers: common.HEADERS
    })
      .then(response => {
        res.json(response.data)
      }).catch(e => console.log(e))
  })
  // drawer homepage data requrest
  app.get('/api/drawerdetail', (req, res) => {
    const uid = req.query.uid
    axios({
      url: `https://api.live.bilibili.com/user/v1/User/get?uid=${uid}&platform=pc`,
      method: 'get',
      headers: common.HEADERS
    })
      .then(response => {
        res.json(response.data)
      }).catch(e => console.log(e))
  })
  // focus/unfocus request
  app.get('/api/attention', (req, res) => {
    const { uid, type } = req.query
    axios({
      url: 'https://api.live.bilibili.com/liveact/attention',
      method: 'post',
      data: {
        'uid': uid,
        'token': '',
        'type': type, //  0-unfocus;1-focus
        'platform': 'pc',
        'csrf_token': '319f8150f75edad66575731b9af8c0ba'
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Host': 'api.live.bilibili.com',
        'Origin': 'https://link.bilibili.com',
        'Referer': 'https://link.bilibili.com/p/world/index',
        'Cookie': 'l=v; sid=c8827bog; finger=edc6ecda; LIVE_BUVID=AUTO2515178073286281; fts=1517807336; buvid3=615D8768-B0E9-40D1-ADBB-E2DA063A366728070infoc; DedeUserID=3191077; DedeUserID__ckMd5=874ca7b1339e6381; SESSDATA=a5a07765%2C1520474499%2Cc298da59; bili_jct=319f8150f75edad66575731b9af8c0ba; _dfcaptcha=dcc808acc4a8b5cfa383a78ca7ae4bc4; Hm_lvt_8a6d461cf92ec46bd14513876885e489=1517814713,1517882693; Hm_lpvt_8a6d461cf92ec46bd14513876885e489=1517911174; Hm_lvt_8a6e55dbd2870f0f5bc9194cddf32a02=1517288176,1517814450,1517814703,1517882693; Hm_lpvt_8a6e55dbd2870f0f5bc9194cddf32a02=1517911175',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      res.json(response.data)
    }).catch(e => console.log(e))
  })
  // drawer homepage illustration data requrest
  app.get('/api/drawerillustration', (req, res) => {
    const uid = req.query.uid
    axios({
      url: `https://api.vc.bilibili.com/link_draw/v1/doc/ones?poster_uid=${uid}&page_size=20&next_offset=0&noFav=1&noLike=1&platform=pc`,
      method: 'get',
      headers: common.HEADERS
    }).then(response => {
      res.json(response.data)
    }).catch(e => console.log(e))
  })

  app.get(`/api/comments`, (req, res) => {
    const cid = req.query.cid
    axios({
      url: `https://api.bilibili.com/x/v2/reply?callback=__jp0&jsonp=jsonp&pn=1&type=11&oid=${cid}&sort=0&_=1527493121464`,
      method: 'get',
      headers: {
        'Host': 'api.bilibili.com',
        'Referer': `https://h.bilibili.com/${cid}`
      }
    }).then(response => {
      let obj = {}
      const __jp0 = function(callbackData) {
        obj = callbackData
      }
      eval(response.data)
      res.json(obj)
    })
  })
}

module.exports = initApi
//
