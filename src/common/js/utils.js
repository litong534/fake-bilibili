export function imageClip(url, width, height) {
  return url.replace(/(jpg)|(png)|(gif) \1 \2 \3/, '$1$2$3' + `@${width}w_${height}h_1e.$1$2$3`)
}

export const STATUS = {
  WAITING: 'WAITING',
  PENDING: 'PENDING',
  RESOLVED: 'RESOLVED'
}

export function saveHistoryToLocalStorage(key, value) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify([value]))
  }

  let currentHistory = JSON.parse(localStorage.getItem(key))

  if (currentHistory.includes(value)) {
    currentHistory.splice(currentHistory.indexOf(value), 1)
  }
  if (currentHistory.length === 10) {
    currentHistory.pop()
  }
  localStorage.setItem(key, JSON.stringify([value, ...currentHistory]))

  return [value, ...currentHistory]
}

export function getHistoryFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}
