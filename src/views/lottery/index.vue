<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import {
  NavBar as VantNavBar,
  Button as VantButton,
  Toast
} from 'vant';
import { Images } from '@/assets/images';
import { ref } from 'vue';
import { to } from '@/utils';
import { getNum, setTake } from '@/api/prize';

const route = useRoute();
const { goods_id=0 } = route.query

const router = useRouter();

const onClickLeft = () => {
  router.go(-1);
};

const num = ref<number>(0);

const onTake = async() => {
  const [_, res] = await to(setTake({
    goods_id
  }));
  if(res) {
    Toast.success('抽签完成')
    init();
  }
}

const init = async() => {
  const [_, res] = await to(getNum({
    goods_id
  }));
  if(res) {
    num.value = res.num;
  }
}

init()
</script>

<template>
  <VantNavBar class="nav-bar" title="抽签环节" left-arrow @click-left="onClickLeft" safe-area-inset-top />

  <div class="luckey">
    <img :src="Images.take" />
    <p>本次活动剩余抽签次数 {{num}} 次</p>
    <VantButton type="primary" :disabled="num ? false:true" round :color="num ? '#01c2c3':'#999999'" @click="onTake">抽签</VantButton>
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
.luckey {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    height: 50vh;
    width: auto;
  }
  p {
    padding-bottom: 20px;
    font-size: 16px;
    font-weight: 600;
  }
  .van-button {
    width: 35vw;
  }
}
</style>
