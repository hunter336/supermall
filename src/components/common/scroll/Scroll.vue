<template>
  <div class="wrapper"
       ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'
import Pullup from '@better-scroll/pull-up'
BetterScroll.use(Pullup)
export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null,
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    setTimeout(() => {
      // 创建scroll对象
      this.scroll = new BetterScroll(this.$refs.wrapper, {
        probeType: this.probeType, //决定是否派发scroll事件, 对页面性能有影响
        pullUpLoad: this.pullUpLoad,
        click: true,
      })
      // 监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position)
        this.$emit('scroll-event', position)
      })
      // 监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pulling-up')
      })
      console.log(this.scroll)
    }, 20)
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      if (this.scroll) {
        this.scroll.finishPullUp()
      }
    },
    refresh() {
      console.log('haha');
      this.scroll && this.scroll.refresh()
    },
  },
}
</script>

<style scoped>
/* 这里必须要设置.wrapper的高度, 当.content的高度小于.wrapper高度时才会滚动 */

/* 第一种 */
/* .wrapper {
  height: calc(100vh - 93px);
  margin-top: 49px;
} */

/* 第二种 */
.wrapper {
  position: absolute;
  top: 49px;
  bottom: 44px;
}
</style>
