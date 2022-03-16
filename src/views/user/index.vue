<script setup lang="ts">
import { TabList } from '@/components/TabList';
import { Image as VantImage, Icon as VantIcon } from 'vant';
import { useRouter } from 'vue-router';

const router = useRouter();
const goTo = (path: string) => {
  router.push(path)
}

</script>

<template>
  <div class="user-box">
    <div class="header-box">
      <div class="header-box-icon">
        <VantIcon name="scan" size="25" />
      </div>
      <div class="header-box-icon" @click="goTo('/setup')">
        <VantIcon name="setting-o" size="25" />
      </div>
    </div>

    <div class="user-info">
      <VantImage round width="70" height="70" src="https://pic3.zhimg.com/v2-4b647d2db75f90ecc3dc8390659a9a6a_is.jpg?source=32738c0c" />
      <span>聚宝阁-00001</span>
    </div>

    <div class="dashboard">
      <!-- <div class="dashboard-item">
        <VantIcon name="service-o" size="20" />
        <span>客服电话</span>
      </div> -->
      <!-- <div class="dashboard-item">
        <VantIcon name="chat-o" size="20" />
        <span>客服微信</span>
      </div> -->
      <div class="dashboard-item" @click="goTo('/job')">
        <VantIcon name="notes-o" size="20" />
        <span>任务清单</span>
      </div>
      <div class="dashboard-item" @click="goTo('/payment')">
        <VantIcon name="balance-pay" size="20" />
        <span>支付管理</span>
      </div>
      <div class="dashboard-item" @click="goTo('/distribut')">
        <VantIcon name="cluster-o" size="20" />
        <span>分销中心</span>
      </div>
      <div class="dashboard-item" @click="goTo('/about')">
        <VantIcon name="friends-o" size="20" />
        <span>需求合作</span>
      </div>
      <!-- <div class="dashboard-item">
        <VantIcon name="shop-collect-o" size="20" />
        <span>个人藏品</span>
      </div> -->
    </div>

    <div class="dashboard2">
      <div class="dashboard2-item" @click="goTo('/collect')">
        <div class="dashboard2-item-left">
          <VantIcon name="star-o" size="20" color="#333" />
          <span>收藏</span>
        </div>
        <div class="dashboard2-item-right">
          <span>0</span>
          <VantIcon name="arrow" size="16" color="#00000059" />
        </div>
      </div>
      <div class="dashboard2-item" @click="goTo('/locked')">
        <div class="dashboard2-item-left">
          <VantIcon name="goods-collect-o" size="20" color="#333" />
          <span>锁藏品</span>
        </div>
        <div class="dashboard2-item-right">
          <span>0</span>
          <VantIcon name="arrow" size="16" color="#00000059" />
        </div>
      </div>
      <div class="dashboard2-item" @click="goTo('/compound')">
        <div class="dashboard2-item-left">
          <VantIcon name="after-sale" size="20" color="#333" />
          <span>产品合成</span>
        </div>
        <div class="dashboard2-item-right">
          <span>0</span>
          <VantIcon name="arrow" size="16" color="#00000059" />
        </div>
      </div>
      <div class="dashboard2-item" @click="goTo('/grant')">
        <div class="dashboard2-item-left">
          <VantIcon name="share-o" size="20" color="#333" />
          <span>赠予管理</span>
        </div>
        <div class="dashboard2-item-right">
          <span>0</span>
          <VantIcon name="arrow" size="16" color="#00000059" />
        </div>
      </div>
    </div>

    <div class="views-order">
      <div class="views-order-amount">
        我的订单
      </div>
      <!-- <div class="views-order-button">
        <span>0</span>
        <VantIcon name="arrow" size="10" />
      </div> -->
    </div>
    <div class="order-status">
      <div class="order-desc" @click="goTo('/order/buy')">
        <VantIcon name="cart-o" size="20" />
        <span>我买到的</span>
      </div>
      <div class="order-desc" @click="goTo('/order/publish')">
        <VantIcon name="guide-o" size="20" />
        <span>我发布的</span>
      </div>
      <div class="order-desc" @click="goTo('/order/sale')">
        <VantIcon name="cash-back-record" size="20" />
        <span>我卖出的</span>
      </div>
    </div>

    <!-- <div class="views-distribution">
      <div class="views-distribution-sum">
        <div class="views-distribution-amount">
          <div class="views-distribution-desc">
            <VantIcon name="cluster-o" size="20" color="#333" />
            <span>分销</span>
          </div>
          <div class="views-distribution-title">
            <span>邀请好友领奖励</span>
          </div>
        </div>
        <div class="views-distribution-button" @click="goTo('/distribut')">
          <VantIcon name="arrow" size="10" />
        </div>
      </div>
      <div class="views-distribution-sum views-distribution-right">
        <div class="views-distribution-amount">
          <div class="views-distribution-desc">
            <VantIcon name="shop-o" size="18" color="#333" />
            <span>商品出售</span>
          </div>
          <div class="views-distribution-title">
            <span>商品售卖价格</span>
          </div>
        </div>
        <div class="views-distribution-button">
          <VantIcon name="arrow" size="10" />
        </div>
      </div>
    </div> -->
  </div>
  <TabList />
</template>

<style lang="less" scoped>
.user-box {
  font-size: 14px;
  font-weight: 500px;
}
.header-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  position: fixed;
  top: env(safe-area-inset-top);
  top: constant(safe-area-inset-top);
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  .header-box-icon {
    display: flex;
    align-items: center;
  }
}
.user-info {
  margin-top: 40px;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: #fff;
  span {
    padding-left: 10px;
    color: #333;
    font-size: 16px;
    font-weight: 600;
  }
}
.dashboard {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px;
  .dashboard-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > span {
      margin-top: 5px;
    }
  }
}
.dashboard2 {
  display: flex;
  flex-flow: row wrap;
  background-color: #fff;
  margin-bottom: 10px;
  width: 100%;
  .dashboard2-item {
    padding: 15px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(50% - 10px);
    &:nth-child(2n) {
      margin-left: 20px;
    }
    & > div {
      display: flex;
      align-items: center;
      & > span {
        margin-right: 5px;
        line-height: 20px;
      }
    }
    .dashboard2-item-left {
      & > span {
        margin-left: 5px;
      }
    }
  }
}
.views-order {
  background-color: #fff;
  padding: 10px;
  display: flex;
  align-items: center;
  .views-order-amount {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    height: 24px;
    color: #000;
  }
  .views-order-button {
    display: flex;
    align-items: center;
    margin-right: 10px;
    span {
      font-size: 14px;
      line-height: 20px;
      height: 20px;
      padding-right: 5px;
    }
  }
}
.order-status {
  display: flex;
  background-color: #fff;
  padding: 5px 10px 15px;
  margin-bottom: 10px;
  .order-desc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    .van-icon {
      display: flex;
      justify-content: center;
      color: #333;
    }
    span {
      display: flex;
      justify-content: center;
      font-size: 14px;
      padding-top: 5px;
    }
  }
}
.views-distribution {
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px;
  .views-distribution-sum {
    display: flex;
    width: 50%;
    padding-right: 10px;
    .views-distribution-amount {
      flex: 1;
      display: flex;
      flex-direction: column;
      .views-distribution-desc {
        span {
          font-weight: 500;
          color: #333;
          font-size: 14px;
          line-height: 24px;
        }
      }
      .views-distribution-title {
        span {
          font-weight: 400;
          color: #999;
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
    .views-distribution-button {
      display: flex;
      align-items: center;
      span {
        font-weight: 400;
        font-size: 12px;
      }
    }
  }
  .views-distribution-right {
    border-left: 1px solid #eaeaea;
    padding-left: 10px;
    padding-right: 0;
  }
}
</style>
