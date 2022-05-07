<template>
  <div class="goods-item">
    <img :src="goodsUrl"
         @load="itemImgLoad"
         @click="itemClick" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">¥{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {
          iid: null
        }
      },
    },
  },
  computed: {
    goodsUrl() {
      return this.goodsItem.image || this.goodsItem.show.img
    },
    goodsIid() {
      return this.goodsItem.item_id || this.goodsItem.iid
    }
  },
  methods: {
    itemImgLoad() {
      this.$bus.$emit('item-load')
    },
    itemClick() {
      // console.log();
      this.$router.push('/detail/?iid=' + this.goodsIid)
    }
  },
}
</script>

<style scoped>
.goods-item {
  position: relative;
  overflow: hidden;
  width: 48%;
  padding-bottom: 40px;
}

.goods-item img {
  width: 100%;
}

.goods-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  overflow: hidden;
  font-size: 12px;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  position: absolute;
  left: -15px;
  top: 0;
  content: '';
  width: 14px;
  height: 14px;
  background: url('~@/assets/img/common/collect.svg') left/14px 14px;
}
</style>
