<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="deepPink">
      <template v-slot:item-icon>
        <img src="@/assets/img/tabbar/home.svg" />
      </template>
      <template v-slot:item-icon-active>
        <img src="@/assets/img/tabbar/home_active.svg" />
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="deepPink">
      <template v-slot:item-icon>
        <img src="@/assets/img/tabbar/category.svg" />
      </template>
      <template v-slot:item-icon-active>
        <img src="@/assets/img/tabbar/category_active.svg" />
      </template>
      <template v-slot:item-text>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/shopcart" activeColor="deepPink">
      <template v-slot:item-icon>
        <img src="@/assets/img/tabbar/shopcart.svg" />
      </template>
      <template v-slot:item-icon-active>
        <img src="@/assets/img/tabbar/shopcart_active.svg" />
      </template>
      <template v-slot:item-text>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="deepPink">
      <template v-slot:item-icon>
        <img src="@/assets/img/tabbar/profile.svg" />
      </template>
      <template v-slot:item-icon-active>
        <img src="@/assets/img/tabbar/profile_active.svg" />
      </template>
      <template v-slot:item-text>
        <div>我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar.vue'
import TabBarItem from '@/components/common/tabbar/TabBarItem.vue'
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style></style>
