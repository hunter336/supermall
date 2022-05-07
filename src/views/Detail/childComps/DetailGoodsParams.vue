<template>
  <div class="params-info">
    <div class="info">
      <table class="sizes-table">
        <tr v-for="(item, index) of goodsParams.sizes"
            :key="index">
          <td v-for="(item1, index1) of item"
              :key="index1">{{item1}}</td>
        </tr>
      </table>
      <table class="params-table">
        <tr v-for="(info, index) of goodsParams.infos"
            :key="index">
          <td>{{info.key}}</td>
          <td>{{info.value}}</td>
        </tr>
      </table>
      <div class="info-img">
        <img v-if="goodsParams.image" :src="goodsParams.image">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsParams',
  props: {
    goodsParams: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  table {
    border-collapse: collapse;
  }

  tr{
    height: 35px;
    border: 1px solid #ccc;
    border-left: 0;
    border-right: 0;
  }

  tr td:nth-child(1) {
    width: 80px;
  }

  .info {
    padding: 0 10px;
  }
  .sizes-table {
    width: 100%;
  }

  .params-table {
    width: 100%;
  }

  .params-table tr td:nth-child(2) {
    color: pink;
  }
</style>
