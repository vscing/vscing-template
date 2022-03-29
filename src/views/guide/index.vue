<script setup lang="ts">
import { ref } from 'vue'
import { Overlay as VantOverlay, Toast } from 'vant';
import {
   getWxAuth
  } from '@/service/getData'

Toast.loading({
  message: '正在登录中...',
  forbidClick: true,
});


</script>

<template>
  <VantOverlay :show="true"/>
</template>

<style scoped lang="less">

</style>
