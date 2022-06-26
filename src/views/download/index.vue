
<script setup lang="ts">
import {
  Image as VantImage
} from 'vant';
import { Images } from '@/assets/images';

const onApp = () => {
  window.open('http://d.firim.pro/4lqa')
}

</script>

<template>
  <div class="download">
    <VantImage :src="Images.app" />
    <div class="btnList">
      <div class="btnItem" @click="onApp()">
        <VantImage :src="Images.ios" class="icon" />
        <span>iphone 版本下载</span>
      </div>
      <div class="btnItem" @click="onApp()">
        <VantImage :src="Images.android" class="icon" />
        <span>android 版本下载</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.download {
  font-family: PingFang SC-Bold, PingFang SC;
  background-color: #ffffff;
  min-height: 100vh;
  :deep(.van-image) {
    display: block;
  }
  .btnList {
    background-color: #ffffff;
    font-size: 16px;
    padding: 30px 0;
    .btnItem {
      border-radius: 25px;
      height: 50px;
      margin: 0 30px 15px;
      color: #ffffff;
      background-color: #0B0425;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        width: 20px;
        margin-right: 10px;
      }
    }
  }
}

</style>
