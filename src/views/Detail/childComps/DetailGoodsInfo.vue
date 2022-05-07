<template>
  <div class="goods-info">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-list"
         v-for="(item, index) of detailInfo.detailImage"
         :key="index">
      <div class="info-key">{{item.key}}</div>
      <div class="info-img">
        <img :src="img"
             v-for="(img, index) of item.list"
             :key="index"
             @load="imgLoad">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  data() {
    return {
      counter: 0,  //加载完成的图片个数
    }
  },
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    // 请求数据的图片的个数
    imgLength() {
      return this.detailInfo.detailImage[0].list.length
    }
  },
  methods: {
    imgLoad() {
      // 判断所有的图片加载完了, 只触发一次事件就行
      if (++this.counter === this.imgLength) {
        this.$emit('load-event')
      }
    }
  }
}
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
}

.info-desc{
  position: relative;
  padding: 0 10px;
}

.info-desc .desc {
  padding: 15px 0;
}

.start,
.end {
  position: relative;
  width: 90px;
  height: 1px;
  background-color: black;
}

.end {
  position: absolute;
  right: 10px;
}

.start::before,
.end::after {
  content: '';
  position: absolute;
  top: -5px;
  width: 5px;
  height: 5px;
  background-color: black;
}

.end::after {
  right: 0;
}

.info-list .info-key {
  margin: 8px 0 10px 15px;
}

.info-list .info-img img{
  width: 100%;
}
</style>
