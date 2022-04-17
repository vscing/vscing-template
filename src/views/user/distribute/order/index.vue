<script setup lang="ts">
import { ref } from 'vue';
import {
  Image as VantImage,
  Pagination as VantPagination,
  Empty as VantEmpty,
  NavBar as VantNavBar
} from 'vant';
import { TabList } from '@/components/TabList';
import { getList } from '@/api/distribute';
import { to } from '@/utils';
import { columnToDateTime } from '@/utils/dateUtil';
import { Images } from '@/assets/images';

const page = ref<number>(1);
const total = ref<number>(0);
const list = ref<any[]>([]);

const onLoad = async () => {
  const [_, res] = await to(getList({
    page: page.value
  }))
  if (res) {
    list.value = res.list || []
    total.value = Math.ceil(res.total / 10) || 0
  }
}
onLoad();

</script>

<template>
  <VantNavBar fixed safe-area-inset-top class="nav-bar" title="分销订单" />
  <div v-if="list.length > 0">
    <ul class="product-sell-box" v-if="list.length > 0">
      <li v-for="item in list" class="product-sell-item">
        <p>佣金：{{item.middle_price}}</p>
        <p>获得日期：{{ columnToDateTime(item.order_time) }}</p>
      </li>
    </ul>
    <VantPagination v-model="page" :page-count="total" mode="simple" @change="onLoad" />
  </div>
  <VantEmpty v-else class="empty" :image="Images.order" :description="`暂无分销订单`" />
  <TabList />
</template>

<style lang="less" scoped>
.product-sell-box {
  padding-top: 55px;
  .product-sell-item {
    border-radius: 4px;
    background-color: #ffffff;
    padding: 10px;
    box-shadow: rgba(182, 182, 182, 0.16) 0px 2px 10px 0px;
    margin-bottom: 10px;
  }

}
.empty {
  padding-top: 20vh;
}
</style>
