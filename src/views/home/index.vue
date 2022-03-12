<script setup lang="ts">
  import { reactive } from 'vue';
  import { Swipe as VanSwipe, SwipeItem as VanSwipeItem } from 'vant';
  import { TabList } from '@/components/TabList';

  const images = reactive<string[]>([
    'https://img.yzcdn.cn/vant/apple-1.jpg',
    'https://img.yzcdn.cn/vant/apple-2.jpg'
  ])
</script>

<template>
  <VanSwipe :autoplay="3000" lazy-render indicator-color="#040404">
    <VanSwipeItem v-for="image in images" :key="image">
      <img :src="image" />
    </VanSwipeItem>
  </VanSwipe>
  <TabList />
</template>

<style lang="less" scoped>
  ::v-deep.van-swipe {
    margin: 10px;
    background-color: #ffffff;
    border-radius: 4px;
  }
</style>
