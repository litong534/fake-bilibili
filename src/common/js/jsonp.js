import originJsonp from 'jsonp';

export default function jsonp(url,data,option) {
    url += url.includes('?') ? '&' : '?' + param(data);
    return new Promise((res,rej) => {
        originJsonp(url,option,(err,data) => {
            if(!err) {
                res(data);
            }else {
                rej(err);
            }
        });
    });
}

function param(data) {
    let url = '';
    for (var k in data) {
        let value = data[k] !== undefined ? data[k] : '';
        url += `&${k}=${encodeURIComponent(value)}`;
    }
    return url ? url.substring(1) : '';
}