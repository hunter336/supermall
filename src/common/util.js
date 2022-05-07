// 封装防抖函数 如果直接执行refresh()会执行30次
export function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      // console.log(this)  //undefined
    }, delay)
  }
}
