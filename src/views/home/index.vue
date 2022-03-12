<script setup lang="ts">
  import { Tabbar, TabbarItem } from 'vant';
  import { Button } from 'vant';
</script>

<template>
  <h1>home</h1>
  <h2>index</h2>
  <Tabbar v-model="active">
    <TabbarItem icon="home-o">标签</TabbarItem>
    <TabbarItem icon="search" dot>标签</TabbarItem>
    <TabbarItem icon="friends-o" badge="5">标签</TabbarItem>
    <TabbarItem icon="setting-o" badge="20">标签</TabbarItem>
  </Tabbar>
</template>

<style lang="less">
</style>
