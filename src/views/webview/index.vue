<script setup lang="ts" name="WebView">
  import { useRouter } from 'vue-router';
  import {
    NavBar as VantNavBar
  } from 'vant';
  
  const router = useRouter();
  const onClickLeft = () => router.go(-1);
</script>

<template>
  <VantNavBar class="nav-bar" title="食艺术公告" left-arrow @click-left="onClickLeft" />
  <iframe src="https://docs.qq.com/doc/DTEdKWlFPUUJ6UWp4" style="width: 100vw; height: calc(100vh - 50px);"/>
</template>

<style scoped lang="less">
.nav-bar {
  width: 100%;
  :deep(.van-icon) {
    color: #000000;
  }
  :deep(.van-nav-bar__title) {
    color: #000000;
  }
}
</style>

