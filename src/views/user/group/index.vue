<script lang="ts" setup>
import { Image as VantImage, Icon as VantIcon } from 'vant';
import { getHelp } from '@/api/config';
import { ref } from 'vue';
import { to } from '@/utils';

const info = ref<any>({});

const init = async() => {
  const [_, res] = await to(getHelp());
  if(res) {
    info.value = res.help
  }
}
init();

</script>

<template>
  <div class="abouts-box">
    <h2>加入我们</h2>
    <VantImage :src="info.code1"/>
  </div>
</template>

<style lang="less" scoped>
  .abouts-box {
    background-color: #ffffff;
    height: 100vh;
    padding: 50px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > h2 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 50px;
    }
    .abouts-box-tel {
      cursor: pointer;
      margin-top: 50px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      a {
        color: #397fe7;
      }
    }
    :deep(.van-image) {
      width: 200px;
      height: auto;
      margin: 20px 0;
    }
  }
</style>
