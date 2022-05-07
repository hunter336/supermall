import { request } from './index.js'

export function getGoodsDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid,
    },
  })
}

export function getRecommendData() {
  return request({
    url: '/recommend',
  })
}

// 导出Goods   此处有点妙
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.nowPrice = itemInfo.highNowPrice
  }
}

// 店铺信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}
// 商品图片信息
export class DetailInfo {
  constructor(detailInfo) {
    this.desc = detailInfo.desc
    this.detailImage = detailInfo.detailImage
  }
}
// 商品参数信息
export class GoodsParams {
  constructor(itemParams) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = itemParams.info.images ? itemParams.info.images[0] : ''
    this.infos = itemParams.info.set
    this.sizes = itemParams.rule.tables[0]
  }
}
