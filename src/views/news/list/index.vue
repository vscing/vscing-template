<script setup lang="ts">
  import { reactive, ref, watch } from 'vue';
  import { 
    Tabs as VantTabs, 
    Tab as VantTab, 
    Pagination as VantPagination, 
    Image as VantImage
  } from 'vant';
  import { useRouter } from 'vue-router';
  import { getArticleList } from '@/api/article';
import { to } from '@/utils';
import { Images } from '@/assets/images';

const tabTitle = reactive(['最新活动', '合成策略', '客服帮助']);
  const page = ref<number>(1);
  const total = ref<number>(0);
  const active = ref<number>(0);
  const list = ref<any[]>([]);

  const router = useRouter();

  const onDetail = (id: number) => {
    router.push(`/news/detail?id=${id}`)
  }

  watch(active, (val: any, old: any) => {
    if(val !== old) {
      onLoad();
    }
  })

  const onLoad = async() => {
    const [_, res] = await to(getArticleList({
      page: page.value,
      type: active.value
    }))

    if(res) {
      list.value = res.list || []
      total.value = res.total || 0
    }
  }
  onLoad();
</script>

<template>
  <VantTabs class="tabs-box" v-model:active="active">
    <VantTab v-for="item in tabTitle" :title="item"></VantTab>
  </VantTabs>
  <div v-if="list.length > 0">
    <div class="item" @click="onDetail(1)">
      内容啊啊啊啊啊啊啊
      <VantImage
        src="item.img"
        fit="cover"
        lazy-load
        width="100%"
        :radius="4"
        :show-loading="false"
        :show-error="false"
      />
    </div>
    <VantPagination v-model="page" :page-count="total" mode="simple"/>
  </div>
  <VantEmpty
    v-else
    :image="Images.empty"
    :description="`暂无${tabTitle[active]}`"
  />
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
