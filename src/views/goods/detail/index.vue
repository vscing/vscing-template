<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { 
    NavBar as VantNavBar,
    Image as VantImage,
    Icon as VantIcon,
    Button as VantButton 
  } from 'vant';
  import { SvgIcon } from '@/components/SvgIcon';

  const router = useRouter();

  const onClickLeft = () => {
    router.go(-1);
  }; 
</script>

<template>
  <VantNavBar
    class="nav-bar"
    title="商品详情"
    left-arrow
    @click-left="onClickLeft"
    safe-area-inset-top
  />

  <div class="image-box">
    <VantImage width="100%" height="auto" src="https://source.theone.art/watermarkResize/37a3adf0c780332f729e80cb16afe7e2/ccb7c9c4c5052c8299734c957c176ac6-16466350452770.25.jpg" />
  </div>
  
  <div class="config-box">
    <h2>火锅 白菜</h2>
    <p>产品编号 #662 / 1000</p>
    <div class="price-box">
      <span>￥150</span>
      <div class="price-like-box">
        <VantIcon name="like-o" />
      </div>
    </div>
  </div>

  <div class="config-box">
    <h2>认证信息</h2>
    <ul class="config-list">
      <li class="config-item">
        <span>合约地址</span>
        <p>
          <span>0x9AB8...1b5D19</span>
          <SvgIcon name="copy"/>
        </p>
      </li>
      <li class="config-item">
        <span>认证标识</span>
        <p>
          <span>244443...126376</span>
          <SvgIcon name="copy"/>
        </p>
      </li>
      <li class="config-item">
        <span>认证标准</span>
        <span>erc721</span>
      </li>
      <li class="config-item">
        <span>认证网络</span>
        <span>Polygon</span>
      </li>
    </ul>
  </div>

  <!-- <div class="config-box">
    <h2>价格波动</h2>
    <ul>
      <li></li>
    </ul>
  </div> -->

  <div class="config-box">
    <h2>合成信息</h2>
    <ul>
      <li>将2张同一种类的卡片整合到一张卡片上，次数为两张卡片的剩余次数之和，最高不超过此卡片本身的次数上限。</li>
      <li>将2张同一种类的卡片整合到一张卡片上，次数为两张卡片的剩余次数之和，最高不超过此卡片本身的次数上限。</li>
      <li>将2张同一种类的卡片整合到一张卡片上，次数为两张卡片的剩余次数之和，最高不超过此卡片本身的次数上限。</li>
      <li>将2张同一种类的卡片整合到一张卡片上，次数为两张卡片的剩余次数之和，最高不超过此卡片本身的次数上限。</li>
    </ul>
  </div>

  <div class="info-box">
    <h2>商品描述</h2>
    <div>
      商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商
      品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述品描述商品描述商品描述商品描述商品描
      述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述
    </div>
  </div>
  
  <div class="btn-list">
    <VantButton type="primary" round block color="#01c2c3">产品购买</VantButton>
  </div>
</template>

<style lang="less" scoped>
  .nav-bar {
    position: fixed;
    top: env(safe-area-inset-top);
    top: constant(safe-area-inset-top);
    left: 0;
    width: 100%;
    z-index: 9999;
    :deep(.van-icon) {
      color: #000000;
    }
    :deep(.van-nav-bar__title) {
      color: #000000;
    }
  }
  .image-box {
    margin-top: var(--van-nav-bar-height);
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
    .config-list {
      .config-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 5px;
        &>p {
          display: flex;
          align-items: center;
          &>span {
            padding-right: 5px;
          }
        }
      }
    }
  }
  .info-box {
    background-color: #ffffff;
    padding: 10px 20px;
    margin-bottom: 60px;
    color: #5a5f6d;
    font-size: 14px;
    font-weight: 300;
    & > h2 {
      font-size: 16px;
      color: #000000;
      font-weight: 600;
      margin-bottom: 5px;
    }
  }
  .btn-list {
    position: fixed;
    height: 50px;
    bottom: env(safe-area-inset-bottom);
    bottom: constant(safe-area-inset-bottom);
    left: 0;
    width: 100%;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    box-shadow: rgba(182, 182, 182, 0.16) 0px 2px 10px 0px;
    // :deep(.van-button) {
    //   width: 48%;
    // }
  }
</style>
