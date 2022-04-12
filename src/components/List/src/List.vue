<script setup lang="ts">
import { ref } from 'vue';
import { withDefaults, defineProps, watch } from 'vue';
import {
  List as VantList,
  PullRefresh as VantPullRefresh
} from 'vant';
import { to } from '@/utils';

interface Props {
  apiFunc: (data: any) => Promise<any[]>;
  page?: number;
  pageSize?: number;
  params?: any;
  isPull?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  page: 1,
  pageSize: 10,
  params: {},
  isPull: false
})

watch(
  () => props.params,
  (val, _) => {
    console.log('%c [ val ]-27', 'font-size:13px; background:pink; color:#bf2c9f;', val)
    page.value = 1;
    total.value = 0;
    list.value = [];
    onLoad()
  },
  { deep: true }
)

// 下拉刷新状态
const refreshing = ref(false);

// 下拉刷新事件
const onRefresh = () => {
  console.log('%c [ 下拉刷新事件 ]-29', 'font-size:13px; background:pink; color:#bf2c9f;')
  // 清空列表数据
  list.value = [];
  total.value = 0;
  page.value = 1;
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};

// 分页参数
const page = ref(props.page);
const pageSize = ref(props.pageSize);
const total = ref(0);
// 数据列表
const list = ref([]);
// 加载状态
const loading = ref(false);
// 请求错误
const error = ref(false);
// 加载完
const finished = ref(false);
// 请求
const onLoad = async () => {
  const [err, res] = await to(props.apiFunc({
    ...props.params,
    page: page.value,
    pageSize: pageSize.value
  }));
  console.log('%c [ err, res ]-55', 'font-size:13px; background:pink; color:#bf2c9f;', err, res)
  if(res){
    list.value = list.value.concat(res.list)
    total.value = res.total
    if(list.value.length === total.value) {
      finished.value = true;
    }
    if(list.value.length < total.value) {
      page.value = page.value + 1;
    }
  }
  if(err) {
    error.value = true
  }
  loading.value = false
  refreshing.value = false
};

// 初始加载
onLoad();

</script>

<template>
  <VantPullRefresh v-if="list.length > 0" v-model="refreshing" @refresh="onRefresh" success-text="刷新成功" :disabled="props.isPull">
    <VantList v-model:loading="loading" :finished="finished" finished-text="没有更多了" v-model:error="error"
      error-text="请求失败，点击重新加载" @load="onLoad">
      <slot :list="list"></slot>
    </VantList>
  </VantPullRefresh>
  <slot v-else name="empty"></slot>
</template>

<style lang="less" scoped>

</style>
