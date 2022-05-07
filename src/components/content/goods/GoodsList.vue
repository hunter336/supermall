<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goodsList" :key="index" :goods-item="item"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  name: 'GoodsList',
  components: {
    GoodsListItem,
  },
  props: {
    goodsList: {
      type: Array,
      // 对象或数组的默认值必须从一个工厂函数返回
      default() {
        return []
      },
    },
  },
}
</script>

<style scoped>
.goods {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
