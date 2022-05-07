<template>
  <swiper v-if="images.length">
    <swiper-item class="item"
                 v-for="(item, index) in images"
                 :key="index">
      <img :src="item" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/common/swiper/index.js'
export default {
  name: 'DetailSwiper',
  data() {
    return {
      isLoad: false,
    }
  },
  props: {
    images: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
}
</script>

<style scoped>
.item {
  height: 300px;
}
</style>
