<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { 
  NavBar as VantNavBar, 
  Icon as VantIcon, 
  Button as VantButton
} from "vant";
import { blindOrderPay } from '@/api/blindMarket';
import { to } from '@/utils';

const router = useRouter();
const route = useRoute();
const { order_id=0, blind_price=0.00, go=0 }: any = route.query || {}

const onClickLeft = () => {
  router.go(go ? -1:-4);
};

const getProductBuy = async() => {
  const [_, res] = await to(blindOrderPay({
    order_id
  }));
  if(res) {
    router.push('/pay/success');
  }
};
</script>

<template>
  <VantNavBar
    class="nav-bar"
    title="订单详情"
    left-arrow
    @click-left="onClickLeft"
    safe-area-inset-top
  />

  <div class="content-product">
    <div class="pay-time">
      <VantIcon name="warning-o" color="#f00" size="22" />
      <div>请在10分钟内完成支付</div>
    </div>

    <div class="pay-info">
      <span class="pay-title">付款给食艺术</span>
      <div class="moneny">￥<span>{{blind_price}}</span></div>
    </div>

    <div class="settlementPay">
      <VantButton class="content-product-button" type="primary" @click="getProductBuy"
        >立即支付</VantButton
      >
    </div>
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
      & > p {
        display: flex;
        align-items: center;
        & > span {
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
.content-product {
  margin-top: var(--van-nav-bar-height);
  .pay-time {
    width: 100%;
    height: 44px;
    background: #ffc0cbbf;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    & > div {
      color: #f00;
      padding-left: 8px;
      padding-top: 3px;
    }
  }

  .pay-info {
    line-height: 40px;
    text-align: center;
    margin-top: 30px;
    .pay-title {
      font-size: 18px;
    }
    .moneny {
      & > span {
        font-size: 35px;
        font-weight: bolder;
      }
    }
    .remain-payTime {
      font-size: 12px;
      & > span {
        color: #f00;
      }
    }
  }

  .settlementPay {
    width: 90%;
    display: flex;
    margin: 20px auto;
    .content-product-button {
      flex: 1;
      color: white;
      background: rgb(1, 194, 195) !important;
      border-color: rgb(1, 194, 195) !important;
      border-radius: 20px;
    }
  }
}
.captcha-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 35vh;
}
</style>
