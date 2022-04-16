<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import {
  Tabs as VantTabs,
  Tab as VantTab,
  Pagination as VantPagination,
  Image as VantImage,
  Empty as VantEmpty
} from 'vant';
import { useRouter, useRoute } from 'vue-router';
import { getArticleList } from '@/api/article';
import { to } from '@/utils';
import { Images } from '@/assets/images';
import { columnToDateTime } from '@/utils/dateUtil';

const route = useRoute();
const type = Number(route.query.type) || 0

const tabTitle = reactive(['最新活动', '合成策略', '客服帮助']);
const page = ref<number>(1);
const total = ref<number>(0);
const active = ref<number>(type);
const list = ref<any[]>([]);

const router = useRouter();

const onDetail = (id: number) => {
  router.push(`/news/detail?id=${id}`)
}

watch(active, (val: any, old: any) => {
  if (val !== old) {
    onLoad();
  }
})

const onLoad = async () => {
  const [_, res] = await to(getArticleList({
    page: page.value,
    type: active.value + 1
  }))

  if (res) {
    list.value = res.list || []
    total.value = Math.ceil(res.total / 10) || 0
  }
}
onLoad();
</script>

<template>
  <VantTabs class="tabs-box" v-model:active="active">
    <VantTab v-for="item in tabTitle" :title="item"></VantTab>
  </VantTabs>
  <div v-if="list.length > 0">
    <div class="product-list">
      <div v-for="item in list" class="product-data" :key="item.id" @click="onDetail(item.id)">
        <div class="product-img">
          <VantImage :src="item.img" fit="cover" lazy-load width="100%" :radius="4" :show-loading="false" />
        </div>
        <div class="product-title">{{ item.title }}</div>
        <div class="product-desc">{{ item.desc }}</div>
        <div class="product-time">{{ columnToDateTime(item.created_at) }}</div>
      </div>
    </div>
    <VantPagination v-model="page" :page-count="total" mode="simple" @change="onLoad"/>
  </div>
  <VantEmpty v-else :image="Images.empty" :description="`暂无${tabTitle[active]}`"
  />
</template>

<style lang="less" scoped>
.tabs-box {
  :deep(.van-tabs__line) {
    background-color: #01c2c3;
  }
}

.product-list {

  .product-data {
    padding: 15px;
    margin-bottom: 10px;

    .product-img {
      display: flex;
      justify-content: center;
    }
    .product-title {
      font-size: 16px;
      color: #000000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-top: 10px;
    }

    .product-desc {
      padding-top: 10px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, .4);
    }

    .product-time {
      padding-top: 10px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, .4);
    }
  }
}
</style>
