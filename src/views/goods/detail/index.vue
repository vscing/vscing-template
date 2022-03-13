<script setup lang="ts">
  import { NavBar as VantNavBar } from 'vant';
  const onClickLeft = () => {}; 
</script>

<template>
  <VantNavBar
    title="商品详情"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    safe-area-inset-top
  />
</template>

<style lang="less" scoped>
</style>
