<template>
  <div class="tab-control">
    <div class="tab-item" v-for="(item, index) in text" :key="index" :class="{ active: index === currentIndex }" @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0,
    }
  },
  props: {
    text: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tab-click', index)
    },
  },
}
</script>

<style scoped>
.tab-control {
  display: flex;
  position: relative;
  text-align: center;
  font-size: 15px;
  background-color: #fff;
  z-index: 9;
  line-height: 40px;
}

.tab-item {
  flex: 1;
}

.tab-item span {
  padding: 5px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 2px solid var(--color-high-text);
}
</style>
