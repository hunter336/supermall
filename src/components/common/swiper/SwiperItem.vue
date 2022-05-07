<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Slide',
}
</script>

<style scoped>
.slide {
  overflow: hidden;
  width: 100%;
  height: 200px;
  flex-shrink: 0;
}

.slide img {
  width: 100%;
}
</style>
