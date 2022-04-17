<script setup lang="ts">
import {
  NavBar as VantNavBar
} from 'vant';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { getArticleInfo } from '@/api/article';
import { to } from '@/utils';
import { columnToDateTime } from '@/utils/dateUtil'

const data = ref<any>({});
const route = useRoute();

const { id=0 } = route.query || {}

const init = async () => {
  const [_, res] = await to(getArticleInfo({id}));
  if(res) {
    data.value = res.data || ''
  }
}

init();
</script>

<template>
  <VantNavBar title="详情" />
  <h1 class="title">{{data.title}}</h1>
  <p class="time">{{columnToDateTime(data.created_at)}}</p>
  <div class="info" v-html="data.content"></div>
</template>

<style lang="less" scoped>
.title {
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
}
.time {
  margin-top: 10px;
  padding: 0 20px;
  color: rgba(0, 0, 0, .4);
}
.info {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, .4);
  line-height: 28px;
}
</style>
