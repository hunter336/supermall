<template>
  <div class="home">
    <NavBar class="navbar">
      <template v-slot:center>购物街</template>
    </NavBar>
    <TabControl :text="['新款', '流行', '精选']"
                @tab-click="itemClick"
                :class="{ fixed: isTabFixed }"
                ref="tabControl1"
                v-show="isTabFixed" />
    <Scroll ref="scrollRef"
            :probe-type="3"
            :pull-up-load="true"
            @scroll-event="onScroll"
            @pulling-up="loadMore">
      <HomeSwiper :banner1="banner"
                  @swiper-load="swiperImgLoad" />
      <HomeRecommend :features="recommend" />
      <HomeFeature />
      <TabControl :text="['新款', '流行', '精选']"
                  @tab-click="itemClick"
                  ref="tabControl2" />
      <GoodsList :goods-list="goods[currentType].list" />
    </Scroll>
    <BackTop @click.native="backTopClick"
             v-show="showFlag" />
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommend from './childComps/HomeRecommend.vue'
import HomeFeature from './childComps/HomeFeature.vue'
import TabControl from '@/components/content/tabControl/TabControl.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'
import Scroll from '@/components/common/scroll/Scroll.vue'
import BackTop from '@/components/content/backTop/BackTop.vue'

import { getHomeMultiData, getHomeGoodsData } from '@/network/home.js'
// 导入节流函数
import { debounce } from '@/common/util.js'

export default {
  name: 'Home',
  data() {
    return {
      banner: [],
      recommend: [],
      // 重点  这个数据结构
      goods: {
        new: { page: 0, list: [] },
        pop: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: 'new',
      showFlag: false,
      tabOffsetTop: 0,  //tabControl组件的offsetTop
      isTabFixed: false,
      scrollY: 0,
      listItemImgLoad: null   //GoodsListItem图片加载完成自定义事件
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
    Scroll,
    BackTop,
    BackTop,
  },
  created() {
    // 获取banner和recommend数据
    this.getHomeMulti()
    // 获取商品数据
    for (let key in this.goods) {
      this.getHomeGoods(key)
    }
  },
  mounted() {
    // 监听GoodsListItem组件中的图片加载完成
    const refresh = debounce(this.$refs.scrollRef.refresh, 200)
    this.listItemImgLoad = () => {
      refresh()
    }
    this.$bus.$on('item-load', this.listItemImgLoad)
  },
  activated() {
    console.log('activated');
    // console.log(this.scrollY);
  },
  // keep-alive 缓存的组件失活时调用
  deactivated() {
    console.log('deactivated');
    // 记录滚动距离
    this.scrollY = this.$refs.scrollRef.scroll.y
    // 当此组件失活时, 则移除GoodsListItem组件触发的自定义事件
    this.$bus.$off('item-load', this.listItemImgLoad)
  },
  methods: {
    getHomeMulti() {
      getHomeMultiData().then(({ data: res }) => {
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoodsData(type, page).then(({ data: { data: res } }) => {
        // 这里不要直接赋值, 应该把每一页的数据都存到对应的数组中
        this.goods[type].list.push(...res.list)
        this.goods[type].page++

        // 结束上拉加载行为
        this.$refs.scrollRef.finishPullUp()
      })
    },
    itemClick(index) {
      this.currentType = index === 0 ? 'new' : index === 1 ? 'pop' : index === 2 ? 'sell' : ''
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
      // 每次点击tab栏, 都会从开头展示商品 即滚动this.scrollY
      this.$refs.scrollRef.scrollTo(0, -627)
    },
    backTopClick() {
      // this.$refs.scrollRef.scroll.scrollTo(0, 0, 500)
      // 以上不易阅读
      // 如下调用的是组件实例的scrollTo(), 里面有scrollTo()
      this.$refs.scrollRef.scrollTo(0, 0)
    },
    onScroll(position) {
      // console.log(position)
      // 上划一定距离后, 按钮显示
      this.showFlag = -position.y > 1000
      // tabControl是否吸顶  (添加fixed类)
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scrollRef.refresh()
    },
    // 轮播图加载完成
    swiperImgLoad() {
      // 获取tabControl组件的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
  },
}
</script>

<style scoped>
.home {
  height: 100vh;
}

.navbar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
</style>
