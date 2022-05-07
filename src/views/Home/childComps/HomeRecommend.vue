<template>
  <div class="recommend">
    <div class="favor" v-for="(item, index) in features" :key="index">
      <a :href="item.link">
        <img :src="item.image" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    features: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.recommend {
  display: flex;
  margin-top: 10px;
  font-size: 14px;
  padding-bottom: 30px;
  border-bottom: 10px solid #eee;
}

.favor {
  flex: 1;
  text-align: center;
}

.favor img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>
