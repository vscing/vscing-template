<script setup lang="ts">
  import { ref } from 'vue';
  import { Tabs as VantTabs, Tab as VantTab, List as VantList, Image as VantImage, Icon as VantIcon } from 'vant';
  import { useRouter } from 'vue-router';

  const loading = ref<boolean>(false);
  const finished = ref<boolean>(true);
  const active = ref<number>(0);

  const router = useRouter();

  const onDetail = () => {
    router.push('/news/detail')
  }

  const onLoad = () => {}

</script>

<template>
  <VantTabs class="tabs-box" v-model:active="active">
    <VantTab title="最新活动"></VantTab>
    <VantTab title="合成策略"></VantTab>
    <VantTab title="客服帮助"></VantTab>
  </VantTabs>

  <VantList
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <ul class="product-list">
      
    </ul>
  </VantList>
</template>

<style lang="less" scoped>
  .tabs-box {
    :deep(.van-tabs__line) {
      background-color: #01c2c3;
    }
  }
  .product-list {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin-top: var(--van-dropdown-menu-height);
    margin-bottom: 10px;
    padding: 0 10px;
  }
</style>
