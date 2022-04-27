<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import {
  NavBar as VantNavBar,
  Button as VantButton,
  Image as VantImage,
  Toast
} from 'vant';
import { ref } from 'vue';
import { to } from '@/utils';
import { getNum, setTake } from '@/api/prize';

const route = useRoute();
const { id=0 } = route.query

const router = useRouter();

const onClickLeft = () => {
  router.go(-1);
};

const num = ref<number>(0);
const img = ref<string>('');

const onTake = async() => {
  const [_, res] = await to(setTake({
    goods_id: id
  }));
  if(res) {
    Toast.success('抽签完成')
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
</script>

<template>
  <VantNavBar class="nav-bar" title="抽签环节" left-arrow @click-left="onClickLeft" safe-area-inset-top />

  <div class="luckey">
    <VantImage class="img" :src="img" fit="cover" lazy-load width="80%" :radius="4" :show-loading="false"
          :show-error="false" />
    <p>本次活动剩余抽签次数 {{num}} 次</p>
    <VantButton type="primary" :disabled="num ? false:true" round :color="num ? '#01c2c3':'#999999'" @click="onTake">抽签</VantButton>
    <div class="info">
      <h2>本次活动使用抽签的规则进行发售藏品“釜”共计250份，抽签入口将在首页进入。
抽签时间为：2022年4月26日18：30点至2022年4月27日12：00，发放藏品时间为2022年4月27日12：00至2022年4月27日15:00点。
秉着公正并且让所有用户都有机会购买以及参与，藏品发售抽签规则为：</h2>
      <h2>秉着公正并且让所有用户都有机会购买以及参与，藏品发售抽签规则为：</h2>
      <p>1，保证账户内有抽签藏品对应金额“釜”199元，即可参加抽签活动。</p>
      <p>2，活动时间内平台所有人员均可参加。</p>
      <p>3，中签率规则为：持有平台藏品越多，中签概率越大。</p>
      <p>4，中签人数为发行量总数。</p>
      <p>5，活动时间结束后，平台直接扣除中签人余额并且发放至个人中心“藏品管理”。</p>
      <p>6，参与抽签后余额直接冻结，活动结束后未中签人员余额直接解冻。</p>
      <p>所有人员均可在个人中心“我的抽签”查看个人是否中签，中签人员手机号在抽签活动结束后在最新活动内公布。</p>
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
