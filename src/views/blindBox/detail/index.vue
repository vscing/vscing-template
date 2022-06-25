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
import { useUserStore } from '@/store/modules/user';
import { ref } from 'vue';
import { getBlindInfo } from '@/api/blindMarket';
import useClipboard from 'vue-clipboard3';

const userStore = useUserStore();
const userInfo = userStore.getUserInfo;
const router = useRouter();
const data = ref<any>({});

const onClickLeft = () => {
  router.go(-1);
};

const route = useRoute();
const { id = 0 } = route.query || {}

const init = async () => {
  const [_, res] = await to(getBlindInfo({ id }));
  if (res) {
    data.value = res.data || {}
  }
}

init();

const goOrder = () => {
  if (data.value.sell_status != 20) {
    return false;
  }
  if (userInfo) {
    router.push(`/blindBox/agree?id=${id}`)
  } else {
    Toast.fail('请登录')
  }
}

const { toClipboard } = useClipboard()
console.log('%c [ toClipboard ]-50', 'font-size:13px; background:pink; color:#bf2c9f;', toClipboard)

// const copy = async (value: string) => {
//   try {
//     await toClipboard(value)
//     Toast.success('复制成功')
//   } catch (e) {
//     console.error(e)
//     Toast.fail('复制失败')
//   }
// }
</script>

<template>
  <VantNavBar class="nav-bar" title="商品详情" left-arrow @click-left="onClickLeft" safe-area-inset-top />

  <div class="image-box">
    <VantImage width="100%" height="auto" :src="data.img" />
  </div>

  <div class="config-box">
    <div class="goods-head">
      <h2>食艺术盲盒</h2>
    </div>
    <div class="price-box">
      <span class="goods-price">￥{{data.blind_price}}</span>
      <div class="price-like-box">
        <VantIcon name="like-o" />
      </div>
    </div>
  </div>

  <div class="info-box">
    <h2>商品描述</h2>
    <div v-html="data.desc"></div>
  </div>

  <div class="btn-list">
    <VantButton type="primary" round block :color="data.sell_status != 20 ? '#999999':'#01c2c3'" :disabled="data.sell_status != 20" @click="goOrder">
      {{data.sell_status != 20 ? '盲盒未寄售':'盲盒购买'}}
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
