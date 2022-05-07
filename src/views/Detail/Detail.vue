<template>
  <div class="detail">
    <nav-bar class="navbar">
      <template v-slot:left>
        <img class="back"
             @click="backClick"
             src="@/assets/img/common/back.svg">
      </template>
      <template v-slot:center>
        <ul>
          <li v-for="(item, index) in titles"
              :key="index"
              :class="{active: index === currentIndex}"
              @click="itemClick(index)">
            {{item}}
          </li>
        </ul>
      </template>
    </nav-bar>
    <Scroll class="dScroll"
            ref="scrollRef">
      <DetailSwiper :images="topImages" />
      <DetailBaseInfo :goods="goods" />
      <DetailShopInfo :shopInfo="shopInfo" />
      <DetailGoodsInfo :detailInfo="detailInfo"
                       @load-event="imgLoad"
                       ref="goodsInfoRef" />
      <DetailGoodsParams :goodsParams="goodsParams"
                         ref="goodsParamsRef" />
      <DetailCommentsInfo :commentInfo="commentInfo"
                          ref="commentsInfoRef" />
      <GoodsList :goodsList="recommend"
                 ref="recommendRef" />
    </Scroll>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailGoodsParams from './childComps/DetailGoodsParams.vue'
import DetailCommentsInfo from './childComps/DetailCommentsInfo.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'
import Scroll from '@/components/common/scroll/Scroll.vue'

import { getGoodsDetail, Goods, Shop, DetailInfo, GoodsParams, getRecommendData } from '@/network/detail.js'
// 导入节流函数
import { debounce } from '@/common/util.js'

export default {
  name: 'Detail',
  data() {
    return {
      iid: '',  //商品id
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
      topImages: [],
      goods: {},  //商品信息
      shopInfo: {},  //店铺信息
      detailInfo: {},  //商品详情
      goodsParams: {},  //商品参数
      commentInfo: {},  //评论信息
      recommend: [],  //推荐数据 (嵌套解构而来)
      listItemImgLoad: null,   //GoodsListItem图片加载自定义事件
      offsetTopY: []  //每一个模块的offsetTop值
    }
  },
  created() {
    this.getDetail()
    this.getRecommend()
  },
  // 重要
  updated() {
    const refresh = debounce(this.$refs.scrollRef.refresh, 200)
    this.listItemImgLoad = () => {
      refresh()
    }
    this.$bus.$on('item-load', this.listItemImgLoad)
  },
  destroyed() {
    // 移除自定义事件监听器
    this.$bus.$off('item-load', this.listItemImgLoad)
  },
  components: {
    NavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailGoodsParams,
    DetailCommentsInfo,
    GoodsList,
    Scroll
  },
  methods: {
    getDetail() {
      this.iid = this.$route.query.iid
      getGoodsDetail(this.iid).then(({ data: res }) => {
        // 轮播图图片
        const data = res.result
        this.topImages = res.result.itemInfo.topImages
        // 重点
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        this.shopInfo = new Shop(data.shopInfo)
        this.detailInfo = new DetailInfo(data.detailInfo)
        this.goodsParams = new GoodsParams(data.itemParams)
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      })
    },
    // 获取推荐数据
    getRecommend() {
      getRecommendData().then(({ data: { data: { list } } }) => {
        this.recommend = list
      })
    },
    // 商品详情的图片加载完成后
    imgLoad() {
      this.$refs.scrollRef.refresh()
      this.offsetTopY.push(0)
      this.offsetTopY.push(this.$refs.goodsParamsRef.$el.offsetTop)
      this.offsetTopY.push(this.$refs.commentsInfoRef.$el.offsetTop)
      this.offsetTopY.push(this.$refs.recommendRef.$el.offsetTop)
    },
    itemClick(index) {
      this.currentIndex = index
      // 点击tab按钮, 跳转到指定位置
      this.$refs.scrollRef.scrollTo(0, -this.offsetTopY[index], 500)
    },
    backClick() {
      this.$router.back()
    },
  }
}
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 100;
  height: 100vh;
  background-color: #fff;
}

.back {
  margin-top: 14px;
}

ul {
  display: flex;
}

ul li {
  flex: 1;
  list-style: none;
  font-size: 13px;
}

.active {
  color: var(--color-high-text);
}
</style>
