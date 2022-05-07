export function createdTime() {
  // 从服务器获取到的时间单位是秒, 需要乘以1000转换为毫秒
  const time = new Date(this.commentInfo.created * 1000)
  const y = time.getFullYear()
  const m = time.getMonth() + 1
  const d = time.getDay()
  const h = time.getHours()
  const min = time.getHours()
  const s = time.getSeconds()
  return [y, m, d].join('-') + ' ' + [h, min, s].join(':')
}
