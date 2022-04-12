<script setup lang="ts">
import {
  Empty as VantEmpty,
  Button as VantButton
} from 'vant';
import { useRouter } from 'vue-router';
const router = useRouter();

const onBack = () => {
  router.replace('/user');
}
</script>

<template>
  <VantEmpty description="支付失败">
    <VantButton round type="danger" class="bottom-button" @click="onBack()">按钮</VantButton>
  </VantEmpty>
</template>

<style scoped lang="less">
</style>
