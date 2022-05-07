<template>
  <swiper v-if="banner1.length">
    <swiper-item v-for="(item, index) in banner1" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/common/swiper/index.js'
export default {
  name: 'HomeSwiper',
  data() {
    return {
      isLoad: false,
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banner1: {
      type: Array,
      required: true,
    },
  },
  methods: {
    imgLoad() {
      // 四张轮播图 只需触发一次自定义事件就行
      if (this.isLoad) return
      this.$emit('swiper-load')
      this.isLoad = true
    },
  },
}
</script>

<style></style>
