<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import {
    Icon as VantIcon,
    Search as VantSearch,
    Swipe as VantSwipe, 
    SwipeItem as VantSwipeItem, 
    Grid as VantGrid, 
    GridItem as VantGridItem,
    Button as VantButton,
    Image as VantImage
  } from 'vant';
  import { TabList } from '@/components/TabList';

  const value = ref<string>('');
  const images = reactive<string[]>([
    'https://nft.ysxqfeicui.com/banner.png',
    'https://nft.ysxqfeicui.com/banner.png'
  ])

  const router = useRouter();

  const onDetail = () => {
    router.push('/goods/detail')
  }

</script>

<template>
  <div class="header">
    <VantIcon name="scan" />
    <VantSearch v-model="value" placeholder="请输入搜索关键词" />
  </div>
  
  <VantSwipe :autoplay="3000" lazy-render indicator-color="#000">
    <VantSwipeItem v-for="image in images" :key="image">
      <img class="swiper-img" :src="image" height="200"/>
    </VantSwipeItem>
  </VantSwipe>

  <VantGrid>
    <VantGridItem icon="fire-o" text="最新活动" />
    <VantGridItem icon="notes-o" text="合成策略" />
    <VantGridItem icon="like-o" text="我的收藏" />
    <VantGridItem icon="service-o" text="客服帮助" />
  </VantGrid>

  <div class="product">
    <h2>产品发售</h2>
    <ul class="product-sell-box">
      <li class="product-sell-item" @click="onDetail">
        <VantImage
          :src="`https://nft.ysxqfeicui.com/banner.png`"
          fit="cover"
          lazy-load
          :radius="4"
          :show-loading="false"
          :show-error="false"
        />
        <div class="product-item-info">
          <div class="product-title-box">
            <h2>唐 门神</h2>
            <p class="product-item-price">
              <span>产品数量</span>
              <span>3500份</span>
            </p>
          </div>
          <p class="product-item-time">发售时间：<span>2022-03-10 08:00:00</span></p>
          <p class="product-item-desc">简短的产品介绍介绍啊啊啊啊啊简短的产品介绍介绍啊啊啊啊啊简短的产品介绍介绍啊啊啊啊啊</p>
          <p class="btn-list">
            <VantButton size="mini" color="#393742">VIP提前预购</VantButton>
            <VantButton size="mini" color="#01c2c3">限时抢购</VantButton>
          </p>
        </div>
      </li>
    </ul>
  </div>

  <div class="product">
    <h2>产品展示</h2>
    <ul class="product-list">
      <li class="product-item" v-for="item in [1,2,3,4,5,6,7,8,9,0]" :key="item" @click="onDetail">
        <VantImage 
          class="product-item-img"
          :src="`https://nft.ysxqfeicui.com/banner.png?v=${item}`"
          :show-loading="false"
          :show-error="false"
          fit="cover"
          lazy-load
          :radius="4"
        />
        <div class="product-item-info">
          <h2>唐 门神</h2>
          <p>******</p>
          <p>
            <span>￥150</span>
            <span class="product-item-like">
              <VantIcon name="like-o" />
              120000
            </span>
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
  .product {
    padding: 10px;
    & > h2 {
      font-size: 18px;
      font-weight: bold;
      color: #000000;
      margin-bottom: 10px;
    }
    .product-sell-box {
      .product-sell-item {
        border-radius: 4px;
        background-color: #ffffff;
        padding: 10px;
        box-shadow: rgba(182, 182, 182, 0.16) 0px 2px 10px 0px;
        .product-item-info {
          margin-top: 10px;
          color: #5a5f6d;
          font-size: 14px;
          font-weight: 300;
          .product-title-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            & > h2 {
              color: #000000;
              font-size: 16px;
              font-weight: 500;
            }
          }
          & > p {
            margin-top: 10px;
          }
          .product-item-price {
            color: #000000; 
          }
          .product-item-desc {
            .ellipsis(2);
          }
          .btn-list {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
      
    }
    .product-list {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      margin-bottom: 10px;
      .product-item {
        padding: 10px;
        margin-bottom: 10px;
        width: calc(50% - 5px);
        border-radius: 4px;
        background-color: #ffffff;
        box-shadow: rgba(182, 182, 182, 0.16) 0px 2px 10px 0px;
        &:nth-child(2n) {
          margin-left: 10px;
        }
        .product-item-img {
          margin-bottom: 10px;
        }
        .product-item-info {
          color: #5a5f6d;
          font-size: 14px;
          font-weight: 300;
          & > h2 {
            color: #000000;
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 10px;
          }
          & > p {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .product-item-like {
              display: flex;
              align-items: center;
              & > i {
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
</style>
