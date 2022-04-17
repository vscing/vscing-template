<script setup lang="ts">
import {
  Empty as VantEmpty,
  Button as VantButton
} from 'vant';
import { useRouter } from 'vue-router';
import { Images } from '@/assets/images';
const router = useRouter();

const onBack = () => {
  router.replace('/user');
}
</script>

<template>
  <VantEmpty class="payImage" description="支付成功" :image="Images.paySuccess">
    <VantButton type="primary" round block @click="onBack()">去往个人中心查看我的订单</VantButton>
  </VantEmpty>
</template>

<style scoped lang="less">
.payImage {
  :deep(.van-empty__image) {
    width: 80%;
    height: auto;
  }
  :deep(.van-empty__description) {
    color: #39c522;
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
