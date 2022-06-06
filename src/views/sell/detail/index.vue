<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import {
  NavBar as VantNavBar,
  Image as VantImage,
  Icon as VantIcon,
  Button as VantButton,
  Toast
} from 'vant';
import { SvgIcon } from '@/components/SvgIcon';
import { to, sliceStr } from '@/utils';
import { getSellInfo } from '@/api/goods';
import { useUserStore } from '@/store/modules/user';
import { ref } from 'vue';
import useClipboard from 'vue-clipboard3';

const userStore = useUserStore();
const userInfo = userStore.getUserInfo;
const router = useRouter();
const data = ref<any>({});

const onClickLeft = () => {
  router.go(-1);
};

const route = useRoute();
const { id=0 } = route.query || {}

const init = async () => {
  const [_, res] = await to(getSellInfo({id}));
  if (res) {
    data.value = res.data || {}
  }
}

init();

const goOrder = () => {
  if(data.value.status == 30 || (data.value.status == 20 && data.value.vipNum > 0)) {
    if(userInfo){
      router.push(`/sell/agree?id=${id}`)
    } else {
      Toast.fail('请登录')
    }
  } else {
    Toast.fail('产品暂无法购买')
  }
}

const getBtn = () => {
  console.log('%c [ data ]-49', 'font-size:13px; background:pink; color:#bf2c9f;', data.value)
  if(data.value.status == 30 || (data.value.status == 20 && data.value.vipNum > 0)) {
    return '产品购买';
  }
  if(data.value.stock == 0 || data.value.status > 30) {
    return '产品已售罄';
  } 
  if(data.value.status == 20 && data.value.vipNum == 0) {
    return '产品预售中';
  }
}

const getDisabled = () => {
  console.log('%c [ data ]-62', 'font-size:13px; background:pink; color:#bf2c9f;', data.value)
  if(data.value.status == 30 || (data.value.status == 20 && data.value.vipNum > 0)) {
    return false;
  } else {
    return true;
  }
}

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

</script>

<template>
  <VantNavBar class="nav-bar" title="商品详情" left-arrow @click-left="onClickLeft" safe-area-inset-top />

  <div class="image-box">
    <VantImage width="100%" height="auto" :src="data.img" />
  </div>

  <div class="config-box">
    <div class="goods-head">
      <h2>{{data.title}}</h2>
      <span class="goods-num"># {{data.total_stock}} / {{data.total_stock}}</span>
    </div>
    <div class="price-box">
      <span class="goods-price">￥{{data.price}}</span>
      <div class="price-like-box">
        <VantIcon name="like-o" :size="20" />
      </div>
    </div>
  </div>

  <div class="config-box">
    <h2>认证信息</h2>
    <ul class="config-list">
      <li class="config-item">
        <span>合约地址</span>
        <p>
          <span>{{sliceStr(data.contract_address)}}</span>
          <SvgIcon name="copy" @click="copy(data.contract_address)" />
        </p>
      </li>
      <li class="config-item">
        <span>认证标识</span>
        <p>
          <span>{{sliceStr(data.token_id)}}</span>
          <SvgIcon name="copy" @click="copy(data.token_id)" />
        </p>
      </li>
      <li class="config-item">
        <span>认证标准</span>
        <span>{{data.token_standard}}</span>
      </li>
      <li class="config-item">
        <span>认证网络</span>
        <span>{{data.blockchain}}</span>
      </li>
    </ul>
  </div>

  <div class="info-box">
    <h2>商品描述</h2>
    <div v-html="data.content"></div>
  </div>

  <div class="btn-list">
    <VantButton type="primary" round block color="#01c2c3" :disabled="getDisabled()" @click="goOrder">
      {{getBtn()}}
    </VantButton>
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

  .goods-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    &>h2 {
      font-size: 20px;
      color: #000000;
      font-weight: 600;
      margin-bottom: 5px;
    }

    .goods-num {
      background: linear-gradient(154deg, #282828, #484848);
      color: #e7aa71;
      padding: 0 10px;
      border-radius: 10px;
    }
  }

  .price-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;

    .goods-price {
      color: #e7aa71;
      font-size: 24px;
      font-weight: 700;
    }

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

  &>h2 {
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
