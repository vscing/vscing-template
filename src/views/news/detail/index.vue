<script setup lang="ts">
import {
  NavBar as VantNavBar
} from 'vant';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { getArticleInfo } from '@/api/article';
import { to } from '@/utils';

const info = ref<string>('');
const route = useRoute();

const { id=0 } = route.query || {}

const init = async () => {
  const [_, res] = await to(getArticleInfo({id}));
  if(res) {
    info.value = res.data || ''
  }
}

init();
</script>

<template>
  <VantNavBar title="详情" />
  <div class="info" v-html="info"></div>
</template>

<style lang="less" scoped>
.info {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 400;
  color: #666;
  line-height: 28px;
}
</style>
