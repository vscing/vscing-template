<script setup lang="ts">
  import { ref } from 'vue';
  import { Tabbar, TabbarItem } from 'vant';

  // const props = defineProps({});
  const active = ref<number>(0);
</script>

<template>
  <div class="tablist-placeholder"></div>
  <Tabbar v-model="active" route active-color="#000" inactive-color="#aaaabb" safe-area-inset-bottom>
    <TabbarItem replace to="/" icon="home-o">首页</TabbarItem>
    <TabbarItem replace to="/goods" icon="bag-o">藏品市场</TabbarItem>
    <TabbarItem replace to="/blindBox" icon="point-gift-o">盲盒市场</TabbarItem>
    <TabbarItem replace to="/user" icon="user-o">我的</TabbarItem>
  </Tabbar>
</template>

<style lang="less">
  .tablist-placeholder {
    height: var(--van-tabbar-height);
  }
</style>
