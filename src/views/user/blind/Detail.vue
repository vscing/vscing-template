<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import {
  NavBar as VantNavBar,
  Image as VantImage,
  Button as VantButton,
  Overlay as VantOverlay,
  Dialog,
  Toast
} from 'vant';
import { to } from '@/utils';
import { useUserStore } from '@/store/modules/user';
import { ref } from 'vue';
import { getBlindInfo, openBlind, setNotSend } from '@/api/blind';

const userStore = useUserStore();
const userInfo = userStore.getUserInfo;
console.log('%c [ userInfo ]-18', 'font-size:13px; background:pink; color:#bf2c9f;', userInfo)
const router = useRouter();
const data = ref<any>({});
const disabled = ref<boolean>(false);
const show = ref<boolean>(false);
const goodsInfo = ref<any>({});

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

const hanleOpen = () => {
  Dialog.confirm({
    title: '提示',
    message: '是否确认开启盲盒？',
  })
  .then(async() => {
    disabled.value = true;
    const [_, res] = await to(openBlind({ id }));
    if (res) {
      goodsInfo.value = res.data || {};
      show.value = true;
    }
    disabled.value = false;
  })
  .catch(() => {
  });
}

const hanleSend = async() => {
  if(data.value.sell_status == 10) {
    router.push('/blind/agree?id='+id)
  } else {
    const [_, res] = await to(setNotSend({id}));
    if(res) {
      Toast.success('产品下架成功')
      onClickLeft()
    }
  }
}
</script>

<template>
  <VantNavBar class="nav-bar" title="盲盒详情" left-arrow @click-left="onClickLeft" safe-area-inset-top />

  <div class="image-box">
    <VantImage width="100%" height="auto" :src="data.img" />
  </div>

  <div class="config-box">
    <div class="goods-head">
      <h2>食艺术盲盒</h2>
    </div>
    <div class="price-box">
      <span class="goods-price">￥{{data.blind_price}}</span>
    </div>
  </div>

  <div class="info-box">
    <h2>商品描述</h2>
    <div v-html="data.desc"></div>
  </div>

  <div class="btn-list">
    <VantButton type="primary" round block color="#01c2c3" :disabled="disabled" @click="hanleSend">
      {{data.sell_status != 10 ? '盲盒下架':'发布盲盒'}}
    </VantButton>
    <VantButton type="primary" round block color="#01c2c3" :disabled="disabled" @click="hanleOpen">
      开启盲盒
    </VantButton>
  </div>

  <VantOverlay :show="show">
    <div class="wrapper" @click.stop>
      <div class="goods-box">
        <VantImage width="100%" height="auto" :src="goodsInfo.img" />
        <p class="title">{{goodsInfo.title}}</p>
        <p class="number">编号：#{{goodsInfo.goods_number}}</p>
        <VantButton type="primary" round block color="#01c2c3" @click="router.go(-2)">
          前往查看
        </VantButton>
      </div>
    </div>
  </VantOverlay>
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
  :deep(.van-button) {
    width: 48%;
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.goods-box {
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px;
  max-width: 80vw;
  .title {
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 700;
  }
  .number {
    text-align: center;
    margin: 10px 0;
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
