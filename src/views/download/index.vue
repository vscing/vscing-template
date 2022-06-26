
<script setup lang="ts">
import { ref } from 'vue';
import {
  Image as VantImage
} from 'vant';
import { Images } from '@/assets/images';
import { isWechat } from '@/utils';

const isShow = ref<boolean>(false);

const onApp = (type) => {
  if(isWechat()) {
    isShow.value = true;
    return
  }
  if(type === 1){
    window.open('itms-services:///?action=download-manifest&url=https://public.ysxqbjz.com/nft/app.plist')
  } else {
    window.open('https://public.ysxqbjz.com/nft/app.apk')
  }
}
</script>

<template>
  <div class="tips" v-show="isShow" @click="isShow = false">
    <img :src="Images.d1" class="d1" />
    <img :src="Images.d2" class="d2" />
  </div>
  <div class="download">
    <VantImage :src="Images.app" />
    <div class="btnList">
      <div class="btnItem" @click="onApp(1)">
        <VantImage :src="Images.ios" class="icon" />
        <span>iphone 版本下载</span>
      </div>
      <div class="btnItem" @click="onApp(2)">
        <VantImage :src="Images.android" class="icon" />
        <span>android 版本下载</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.tips {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000cc;
  z-index: 1;
  .d1 {
    position: absolute;
    top: 0;
    right: 15px;
    width: 200px;
  }
  .d2 {
    position: absolute;
    top: 30px;
    right: 22px;
    width: 180px;
  }
}
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
