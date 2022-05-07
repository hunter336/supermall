<template>
  <div class="nav">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style scoped>
.nav {
  display: flex;
  position: relative;
  z-index: 99;
  height: 49px;
  line-height: 49px;
  text-align: center;
  background-color: #fff;
}

.left {
  width: 60px;
}
.center {
  flex: 1;
}
.right {
  width: 60px;
}
</style>
