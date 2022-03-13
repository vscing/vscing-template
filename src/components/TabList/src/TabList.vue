<script setup lang="ts">
import { ref } from 'vue';
import { Tabbar, TabbarItem } from 'vant';

// const props = defineProps({});
const active = ref<number>(0);
</script>

<template>
  <Tabbar v-model="active" route active-color="#040404" inactive-color="#bfbfbf">
    <TabbarItem replace to="/" icon="home-o">首页</TabbarItem>
    <TabbarItem icon="bag-o">市场</TabbarItem>
    <TabbarItem replace to="/user" icon="friends-o">我的</TabbarItem>
  </Tabbar>
</template>

<style lang="less">
</style>
