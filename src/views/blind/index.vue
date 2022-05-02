<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import {
  NavBar as VantNavBar,
  Button as VantButton,
  Toast
} from 'vant';
import { ref } from 'vue';
import { to } from '@/utils';
import { getConfig } from '@/api/config';
import { getNum, setTake } from '@/api/prize';

const route = useRoute();
const { id=0 } = route.query

const router = useRouter();

const onClickLeft = () => {
  router.go(-1);
};

const num = ref<number>(0);
const img = ref<string>('');
const info = ref<string>('');

const onTake = async() => {
  const [_, res] = await to(setTake({
    goods_id: id
  }));
  if(res) {
    Toast.success('盲盒抽取')
    init();
  }
}

const init = async() => {
  const [_, res] = await to(getNum({
    goods_id: id
  }));
  if(res) {
    num.value = res.num;
    img.value = res.img;
  }
}

init()

const initConfig = async () => {
  const [_, res] = await to(getConfig({type: 5}));
  if(res) {
    info.value = res.data || ''
  }
}

initConfig();
</script>

<template>
  <VantNavBar class="nav-bar" title="盲盒" left-arrow @click-left="onClickLeft" safe-area-inset-top />

  <div class="luckey">
    <VantButton type="primary" :disabled="num ? false:true" round :color="num ? '#01c2c3':'#999999'" @click="onTake">抽取</VantButton>
    <div class="info" v-html="info">
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
.luckey {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #01c2c335;
  .img {
    padding: 30px 0;
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
.info {
  padding: 20px;
  h2 {
    font-size: 16px;
    color: #333;
  }
  p {
    font-size: 14px;
    color: #666;
  }
}
</style>
