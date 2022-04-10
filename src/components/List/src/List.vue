<script setup lang="ts">
  import { CSSProperties, ref } from 'vue';
  import { computed, withDefaults, defineProps } from 'vue';
  import { 
    List as VantList,
    PullRefresh as VantPullRefresh 
  } from 'vant';

  interface Props{
    prefix?: string
    color?: string
    name: string
    size?: number | string
    spin?: boolean
  }
  const props = withDefaults(defineProps<Props>(),{
    prefix: 'icon',
    color: '',
    size: 16,
    spin: false
  })

  // 下拉刷新状态
  const refreshing = ref(false);

  // 下拉刷新事件
  const onRefresh = () => {
    console.log('%c [ 下拉刷新事件 ]-29', 'font-size:13px; background:pink; color:#bf2c9f;')
  };

  // 数据列表
  const list = ref([]);
  const loading = ref(false);
  const finished = ref(false);


  
</script>

<template>
  <VantPullRefresh 
    v-model="refreshing"
    @refresh="onRefresh"
    success-text="刷新成功"
    :disabled="false"
  >
    <VantList
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <slot></slot>
    </VantList>
  </VantPullRefresh>
</template>

<style lang="less" scoped>
  .svg-icon-spin {
    animation: loadingCircle 1s infinite linear;
  }
</style>
