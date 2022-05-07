import { request } from './index.js'

export function getHomeMultiData() {
  return request({
    method: 'get',
    url: '/home/multidata',
  })
}

export function getHomeGoodsData(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page,
    },
  })
}
