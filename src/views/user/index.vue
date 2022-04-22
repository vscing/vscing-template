<script setup lang="ts">
import { TabList } from '@/components/TabList';
import { Image as VantImage, Icon as VantIcon, Toast, Skeleton as VantSkeleton, Dialog } from 'vant';
import { SvgIcon } from '@/components/SvgIcon';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { getUserInfo } from '@/api/user';
import { sliceStr, to } from '@/utils';
import useClipboard from 'vue-clipboard3';
import { ref } from 'vue';

const router = useRouter();
const userStore = useUserStore();
const userInfo = ref<any>({});

const { toClipboard } = useClipboard()

const copy = async (value: string) => {
  try {
    await toClipboard(value)
    Toast.success('复制成功')
  } catch (e) {
    console.error(e)
    Toast.fail('复制失败')
  }
}

// 判断是否实名或绑定银行卡
const goTo = (path: string) => {
  if(userInfo.value.is_name && userInfo.value.is_bank) {
    router.push(path)
  }
  if(!userInfo.value.is_name){
    Dialog.confirm({
      title: '提示',
      message:'请先实名认证、并绑定银行卡后操作。',
    })
      .then(() => {
        router.push('/realName')
      })
      .catch(() => {
        // on cancel
      });
    return false;
  }
  if(!userInfo.value.is_bank){
    Dialog.confirm({
      title: '提示',
      message:'请先实名认证、并绑定银行卡后操作。',
    })
      .then(() => {
        router.push('/bankCard')
      })
      .catch(() => {
        // on cancel
      });
    return false;
  }
}

const init = async() => {
  const [_, res] = await to(getUserInfo());
  if(res) {
    userStore.setUserInfo(res?.userInfo);
    userInfo.value = res?.userInfo || {};
  }
}

init();
</script>

<template>
  <VantSkeleton title :row="100" :loading="!userInfo['polygon_address']">
    <div class="user-box">
      <div class="user-box-background" :style="{backgroundImage:`url(${userInfo['background']})`}">
          <div class="header-box">
            <div class="header-box-icon">
              <!-- <VantIcon name="scan" size="25" color="#ffffff" /> -->
            </div>
            <div class="header-box-icon" @click="goTo('/setup')">
              <VantIcon name="setting-o" size="25" color="#ffffff" />
            </div>
          </div>

          <div class="user-info">
            <VantImage round width="70" height="70" :src="userInfo?.avatar" />
            <div class="user-name">
              <div>
                <span>{{userInfo?.nickname}}</span>
                <span v-if="!userInfo['is_name']" class="auth" @click="goTo('/realName')">{{userInfo['is_name'] ? '已认证':'未认证'}}</span>
              </div>
              <div class="polygon-item">
                <span>{{sliceStr(userInfo['polygon_address'])}}</span>
                <SvgIcon name="whiteCopy" @click="copy(userInfo['polygon_address'])"/>
              </div>
            </div>
          </div>
      </div>
      
      <div class="dashboard">
        <div class="dashboard-item" @click="() => Toast('敬请期待')">
          <VantIcon name="notes-o" size="20" />
          <span>条件清单</span> 
          <!--  @click="goTo('/job')" -->
        </div>
        <div class="dashboard-item" @click="goTo('/payment')">
          <VantIcon name="balance-pay" size="20" />
          <span>支付管理</span>
        </div>
        <div class="dashboard-item" @click="goTo('/distribute')">
          <VantIcon name="cluster-o" size="20" />
          <span>邀请新人</span>
        </div>
        <div class="dashboard-item" @click="goTo('/about')">
          <VantIcon name="friends-o" size="20" />
          <span>需求合作</span>
        </div>
        <div class="dashboard-item" @click="goTo('/realName')">
          <VantIcon name="manager-o" size="20" />
          <span>实名认证</span>
        </div>
        <div class="dashboard-item" @click="() => Toast('敬请期待')">
          <VantIcon name="scan" size="20" />
          <span>扫一扫</span>
        </div>
      </div>

      <div class="dashboard2" v-show="true">
        <!-- @click="goTo('/collect')" -->
        <div class="dashboard2-item" @click="() => Toast('敬请期待')">
          <div class="dashboard2-item-left">
            <VantIcon name="star-o" size="20" color="#333" />
            <span>收藏</span>
          </div>
          <div class="dashboard2-item-right">
            <!-- <span>0</span> -->
            <VantIcon name="arrow" size="16" color="#00000059" />
          </div>
        </div>
        <div class="dashboard2-item" @click="goTo('/locked')">
          <div class="dashboard2-item-left">
            <VantIcon name="goods-collect-o" size="20" color="#333" />
            <span>藏品管理</span>
          </div>
          <div class="dashboard2-item-right">
            <!-- <span>0</span> -->
            <VantIcon name="arrow" size="16" color="#00000059" />
          </div>
        </div>
        <!--  @click="goTo('/compound')" -->
        <div class="dashboard2-item" @click="goTo('/compound')">
          <div class="dashboard2-item-left">
            <VantIcon name="after-sale" size="20" color="#333" />
            <span>产品合成</span>
          </div>
          <div class="dashboard2-item-right">
            <!-- <span>0</span> -->
            <VantIcon name="arrow" size="16" color="#00000059" />
          </div>
        </div>
        <div class="dashboard2-item" @click="goTo('/group')">
          <div class="dashboard2-item-left">
            <VantIcon name="share-o" size="20" color="#333" />
            <span>加入社群</span>
          </div>
          <div class="dashboard2-item-right">
            <VantIcon name="arrow" size="16" color="#00000059" />
          </div>
        </div>
        <!--  @click="goTo('/grant')" -->
        <!-- <div class="dashboard2-item" @click="() => Toast('敬请期待')">
          <div class="dashboard2-item-left">
            <VantIcon name="share-o" size="20" color="#333" />
            <span>赠予管理</span>
          </div>
          <div class="dashboard2-item-right">
            <span>0</span>
            <VantIcon name="arrow" size="16" color="#00000059" />
          </div>
        </div> -->
      </div>

      <div class="views-order">
        <div class="views-order-amount">
          我的订单
        </div>
      </div>
      <div class="order-status">
        <div class="order-desc" @click="goTo('/order/buy')">
          <VantIcon name="cart-o" size="20" />
          <span>发售订单</span>
        </div>
        <div class="order-desc" @click="goTo('/order/market')">
          <VantIcon name="goods-collect-o" size="20" />
          <span>市场订单</span>
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
    </div>
  </VantSkeleton>
  <TabList />
</template>

<style lang="less" scoped>
.user-box {
  font-size: 14px;
  font-weight: 500px;
}
.user-box-background{
  height:242px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: revert;
  margin-bottom: 10px;
}
.header-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
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
  // margin-bottom: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  span {
    
    // color: #333;
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
  }
}
.user-name {
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .auth {
    padding-left: 5px;
    color: #ff0000;
  }
  .polygon-item {
    display: flex;
    align-items: center;
    span {
      font-weight: 500;
      font-size: 14px;
      padding-right: 5px;
    }
  }
}
.user-polygon {
  padding: 0 10px;
  color: #ffffff;
}
.dashboard {
  margin-bottom: 10px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  background-color: #fff;
  padding: 15px 15px 0;
  .dashboard-item {
    display: flex;
    width: 25%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
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
    padding: 15px 20px;
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
