export function imageClip(url, width, height) {
  return url.replace(/(jpg)|(png)|(gif) \1 \2 \3/, '$1$2$3' + `@${width}w_${height}h_1e.$1$2$3`)
}
