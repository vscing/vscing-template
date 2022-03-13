<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import {
    Icon as VantIcon,
    Search as VantSearch,
    Swipe as VantSwipe, 
    SwipeItem as VantSwipeItem, 
    Grid as VantGrid, 
    GridItem as VantGridItem
  } from 'vant';
  import { TabList } from '@/components/TabList';

  const value = ref<string>('');
  const images = reactive<string[]>([
    'https://nft.ysxqfeicui.com/banner.png',
    'https://nft.ysxqfeicui.com/banner.png'
  ])
</script>

<template>
  <div class="header">
    <VantIcon name="scan" />
    <VantSearch v-model="value" placeholder="请输入搜索关键词" />
  </div>
  
  <VantSwipe :autoplay="3000" lazy-render indicator-color="#040404">
    <VantSwipeItem v-for="image in images" :key="image">
      <img class="swiper-img" :src="image" height="200"/>
    </VantSwipeItem>
  </VantSwipe>

  <VantGrid>
    <VantGridItem icon="photo-o" text="文字" />
    <VantGridItem icon="photo-o" text="文字" />
    <VantGridItem icon="photo-o" text="文字" />
    <VantGridItem icon="photo-o" text="文字" />
  </VantGrid>

  <div class="product-sell">
    <h2>产品发售</h2>
    <ul class="product-sell-box">
      <li class="product-sell-item">
        <img class="product-item-img" src="https://nft.ysxqfeicui.com/banner.png" />
        <div class="product-item-info">
          <div class="product-title-box">
            <h2 class="">唐 门神</h2>
            <p>
              <span>产品数量</span>
              <span>3500份</span>
            </p>
          </div>
          <p>发售时间：2022-03-10 08:00:00</p>
          <p>简短的产品介绍介绍啊啊啊啊啊简短的产品介绍介绍啊啊啊啊啊简短的产品介绍介绍啊啊啊啊啊</p>
          <p>
            <button>VIP提前预购</button>
            <button>限时抢购</button>
          </p>
        </div>
      </li>
    </ul>
  </div>

  <TabList />
</template>

<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    box-shadow: rgba(182, 182, 182, 0.16) 0px 2px 10px 0px;
    :deep(.van-icon) {
      font-size: 20px;
      padding-left: 10px;
    }
    :deep(.van-search) {
      flex: 1;
    }
  }
  .swiper-img {
    height: 180px;
    width: 100%;
  }
  :deep(.van-swipe) {
    margin: 10px;
    background-color: #ffffff;
    border-radius: 4px;
  }
  .product-sell {
    padding: 10px;
    & > h2 {
      font-size: 18px;
      font-weight: bold;
      color: #040404;
      margin-bottom: 10px;
    }
    .product-sell-box {
      border-radius: 4px;
      background-color: #ffffff;
      padding: 10px;
      box-shadow: rgba(182, 182, 182, 0.16) 0px 2px 10px 0px;
      & > h2 {
        color: #040404;
      }
    }
  }
</style>
