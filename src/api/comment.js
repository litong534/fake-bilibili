import jsonp from '../common/js/jsonp'

export function getComments(oid) {
  const url = 'https://api.bilibili.com/x/v2/reply'

  const data = {
    jsonp: 'jsonp',
    sort: 2,
    type: 11,
    oid
  }

  return jsonp(url, data, {})
}
