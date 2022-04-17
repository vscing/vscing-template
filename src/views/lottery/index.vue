<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import {
    NavBar as VantNavBar
  } from 'vant';

  const router = useRouter();

  const onClickLeft = () => {
    router.go(-1);
  };

</script>

<template>
  <VantNavBar
    class="nav-bar"
    title="抽奖环节"
    left-arrow
    @click-left="onClickLeft"
    safe-area-inset-top
  />
  
  <div class="luckey">
      <img src="../../assets/images/lucky.png" />
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
</style>