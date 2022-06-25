<script setup lang="ts" name="Home">
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
    Image as VantImage,
    Empty as VantEmpty,
    NoticeBar as VantNoticeBar
  } from 'vant';
  import { TabList } from '@/components/TabList';
  import { One } from '@/components/One';
  import { Images } from '@/assets/images';
  import { getHome } from '@/api/index';
  import { to } from '@/utils';
  import { columnToDateTime } from '@/utils/dateUtil';

  const value = ref<string>('');
  const homeData = reactive<any>({
    banner: [],
    currentGoods: null,
    goodsList: [],
    num: 0,
    config: {
      site_notice: '食艺术公告',
      blind: 2,
      lottery: 2,
      unitary: 2
    }
  });

  const router = useRouter();

  const goto = (url: string) => {
    if(!url) return;
    router.push(url);
  }

  const onDetail = (id: number) => {
    router.push('/sell/detail?id='+id)
  }

  //抽奖跳转
  const lucky = (url: string) => {
      router.push(url);
  }

  const init = async() => {
    const [_, res] = await to(getHome());
    if(res){
      homeData.banner = res.banner;
      homeData.currentGoods = res.currentGoods;
      homeData.goodsList = res.goodsList;
      homeData.config = res.config;
      homeData.num = res.num;
    }
  }

  init();

  const onNotice = () => {
    router.push('/webview')
  }
</script>

<template>
  <div class="header">
    <VantIcon name="scan" />
    <VantSearch v-model="value" placeholder="请输入搜索关键词" />
  </div>
  
  <VantNoticeBar
    color="#1989fa" 
    background="#ecf9ff"
    left-icon="volume-o"
    scrollable
    :text="homeData.config.site_notice"
    @click="onNotice"
  />

  <VantSwipe :autoplay="3000" lazy-render indicator-color="#000">
    <VantSwipeItem v-for="item in homeData.banner" :key="item.id" @click="goto(item.url)">
      <img class="swiper-img" :src="item.img" height="200"/>
    </VantSwipeItem>
  </VantSwipe>

  <VantGrid>
    <VantGridItem icon="fire-o" text="最新活动" @click="goto('/news/list?type=0')" />
    <VantGridItem icon="notes-o" text="合成策略" @click="goto('/news/list?type=1')" />
    <VantGridItem icon="link-o" text="餐饮合作" @click="goto('/canteen')"/>
    <VantGridItem icon="service-o" text="客服帮助" @click="goto('/news/list?type=2')" />
  </VantGrid>

  <One v-if="homeData.config.unitary == 1" :num="homeData.num" />

  <!-- homeData.currentGoods && homeData.currentGoods?.status == 20 &&  -->
  <div class="luckey" v-if="homeData.currentGoods && homeData.currentGoods?.status == 20 && homeData.config.lottery == 1">
      <img :src="Images.lucky" @click="lucky(`/lottery?id=${homeData.currentGoods?.id}`)" />
  </div>

  <div class="luckey" v-if="homeData.config.blind == 1">
      <img src="https://public.ysxqbjz.com/nft/web/lucky.png" @click="lucky(`/blind`)" />
  </div>

  <div class="product" v-if="homeData.currentGoods">
    <h2 class="title">本期发售</h2>
    <ul class="product-sell-box">
      <li class="product-sell-item" @click="onDetail(homeData.currentGoods?.id)">
        <VantImage
          :src="homeData.currentGoods?.img"
          fit="cover"
          lazy-load
          width="100%"
          :radius="4"
          :show-loading="false"
          :show-error="false"
        />
        <div class="product-item-info">
          <div class="product-title-box">
            <h2>{{homeData.currentGoods?.title}}</h2>
            <p>
              <span>产品数量：</span>
              <span class="product-item-value">{{homeData.currentGoods?.total_stock}}份</span>
            </p>
          </div>
          <p>发售价格：<span class="product-item-value">¥{{homeData.currentGoods?.price}}</span></p>
          <p>发售时间：<span class="product-item-value">{{columnToDateTime(homeData.currentGoods?.presell_time)}}</span></p>
          <!-- <p>抢购倒计时：<span class="product-item-value product-item-color">00:00:00:00</span></p> -->
          <p class="btn-list">
            <span></span>
            <VantButton color="#393742" v-if="false" @click="onDetail(homeData.currentGoods?.id)">优先抢购</VantButton>
            <VantButton v-if="homeData.currentGoods && homeData.currentGoods?.status == 20 && homeData.config.lottery == 1" color="#01c2c3" @click.stop="lucky(`/lottery?id=${homeData.currentGoods?.id}`)">限时抽签</VantButton>
          </p>
        </div>
      </li>
    </ul>
  </div>

  <div class="product">
    <div class="prev">
      <h2 class="title">往期发售</h2>
      <span @click="goto('/sell/list')">更多>></span>
    </div>
    <ul class="product-sell-box product-old" v-if="homeData.goodsList.length > 0">
      <li v-for="item in homeData.goodsList" class="product-sell-item product-sell-old" @click="onDetail(item.id)">
        <VantImage
          :src="item.img"
          fit="cover"
          lazy-load
          width="100%"
          :radius="4"
          :show-loading="false"
          :show-error="false"
        />
        <div class="product-item-info">
          <div class="product-title-box">
            <h2>{{item.title}}</h2>
          </div>
          <!-- <p>
            <span>产品数量：</span>
            <span class="product-item-value">{{item.total_stock}}份</span>
          </p> -->
          <p>发售价格：<span class="product-item-value">已售罄</span></p>
          <!-- <p>发售时间：<span class="product-item-value">{{columnToDateTime(item.presell_time)}}</span></p> -->
        </div>
      </li>
    </ul>
    <VantEmpty
      v-else
      class="custom-image"
      :image="Images.product"
      description="暂无往期发售"
    />
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
      .van-cell {
        background-color: var(--van-search-content-background-color);
      }
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
    .title {
      font-size: 18px;
      font-weight: bold;
      color: #000000;
      margin-bottom: 10px;
    }
    .prev {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &>span{
        margin-bottom: 10px;
      }
    }
    .product-sell-box {
      .product-sell-item {
        border-radius: 4px;
        background-color: #ffffff;
        padding: 10px;
        box-shadow: rgba(182, 182, 182, 0.16) 0px 2px 10px 0px;
        margin-bottom: 20px;
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
              font-weight: 600;
            }
          }
          & > p {
            margin-top: 10px;
          }
          .product-item-value {
            color: #000000; 
            font-weight: 600;
          }
          .product-item-color {
            color: #01c2c3;
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
    .product-old{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        .product-sell-old{
          width: 48%;
        }
        .product-sell-old:nth-child(odd){
          margin-right: 14px;
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
          .product-item-price {
            font-weight: 500;
          }
          & > h2 {
            color: #000000;
            font-size: 16px;
            font-weight: 600;
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
