import jsonp from '../common/js/jsonp'

export function getComments(oid) {
  const url = 'https://api.bilibili.com/x/v2/reply'

  const data = {
    callback: 'jsonpCallback',
    jsonp: 'jsonp',
    pn: 1,
    type: 11,
    oid,
    sort: 0,
    _: 1517899289437
  }

  const options = {
    name: 'jsonpCallback'
  }

  return jsonp(url, data, options)
}
