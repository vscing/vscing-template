<script setup lang="ts">
import { ref } from 'vue';
import {
  Image as VantImage,
  Pagination as VantPagination,
  Empty as VantEmpty,
  NavBar as VantNavBar
} from 'vant';
import { TabList } from '@/components/TabList';
import { useRouter } from 'vue-router';
import { getSellList } from '@/api/goods';
import { to } from '@/utils';
import { columnToDateTime } from '@/utils/dateUtil';
import { Images } from '@/assets/images';

const page = ref<number>(1);
const total = ref<number>(0);
const list = ref<any[]>([]);

const router = useRouter();

const onDetail = (id: number) => {
  router.push(`/sell/detail?id=${id}`)
}

const onLoad = async () => {
  const [_, res] = await to(getSellList({
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
  <VantNavBar fixed safe-area-inset-top class="nav-bar" title="往期发售" />
  <div v-if="list.length > 0">
    <ul class="product-sell-box" v-if="list.length > 0">
      <li v-for="item in list" class="product-sell-item" @click="onDetail(item.id)">
        <VantImage :src="item.img" fit="cover" lazy-load width="100%" :radius="4" :show-loading="false"
          :show-error="false" />
        <div class="product-item-info">
          <div class="product-title-box">
            <h2>{{ item.title }}</h2>
            <p>
              <span>产品数量：</span>
              <span class="product-item-value">{{ item.total_stock }}份</span>
            </p>
          </div>
          <p>发售价格：<span class="product-item-value">已售罄</span></p>
          <p>发售时间：<span class="product-item-value">{{ columnToDateTime(item.presell_time) }}</span></p>
        </div>
      </li>
    </ul>
    <VantPagination v-model="page" :page-count="total" mode="simple" @change="onLoad" />
  </div>
  <VantEmpty v-else class="empty" :image="Images.empty" :description="`暂无往期发售`" />
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
    margin-bottom: 20px;

    .product-item-info {
      margin-top: 10px;
      color: #5a5f6d;
      font-size: 14px;
      font-weight: 300;

      .product-title-box {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &>h2 {
          color: #000000;
          font-size: 16px;
          font-weight: 600;
        }
      }

      &>p {
        margin-top: 10px;
      }

      .product-item-value {
        color: #000000;
        font-weight: 600;
      }

      .product-item-color {
        color: #01c2c3;
      }

      .product-item-desc {
        .ellipsis(2);
      }

      .btn-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

}
.empty {
  padding-top: 20vh;
}
</style>
