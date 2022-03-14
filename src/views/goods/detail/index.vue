<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { 
    NavBar as VantNavBar,
    Image as VantImage,
    Icon as VantIcon 
  } from 'vant';

  const router = useRouter();

  const onClickLeft = () => {
    router.go(-1);
  }; 
</script>

<template>
  <VantNavBar
    title="商品详情"
    left-arrow
    @click-left="onClickLeft"
    safe-area-inset-top
  />

  <VantImage width="100%" height="auto" src="https://img.yzcdn.cn/vant/cat.jpeg" />

  <div class="config-box">
    <h2>唐 门神</h2>
    <div class="price-box">
      <span>￥150</span>
      <div class="price-like-box">
        <VantIcon name="like-o" />
        <span>1000</span>
      </div>
    </div>
    <p class="config-box-desc">简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍</p>
  </div>

  <div class="config-box">
    <h2>认证信息</h2>
    <ul>
      <li></li>
    </ul>
  </div>

  <div class="config-box">
    <h2>价格波动</h2>
    <ul>
      <li></li>
    </ul>
  </div>

  <div class="config-box">
    <h2>合成信息</h2>
    <ul>
      <li></li>
    </ul>
  </div>

  <div class="info-box">
    <h2>商品描述</h2>

  </div>
  
  
</template>

<style lang="less" scoped>
  :deep(.van-nav-bar) {
    width: 100%;
    // .van-icon {
    //   color: #000000;
    // }
    // .van-nav-bar__title {
    //   color: #000000;
    // }
  }
  .config-box {
    padding: 10px;
    border-radius: 4px;
    background-color: #ffffff;
    box-shadow: rgba(182, 182, 182, 0.16) 0px 2px 10px 0px;
    margin: 0 10px 10px;
    color: #5a5f6d;
    font-size: 14px;
    font-weight: 300;
    & > h2 {
      font-size: 16px;
      color: #000000;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .price-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
      .price-like-box {
        display: flex;
        align-items: center;
        span {
          padding-left: 5px;
        }
      }
    }
    
  }
</style>
