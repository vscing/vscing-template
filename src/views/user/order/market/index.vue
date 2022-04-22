<script setup lang="ts">
import { ref } from 'vue';
import {
  Tabs as VantTabs,
  Tab as VantTab,
  Image as VantImage,
  Pagination as VantPagination,
  Empty as VantEmpty
} from 'vant';
import { getOrderSkuList } from '@/api/order';
import { to } from '@/utils';
import { columnToDateTime } from '@/utils/dateUtil';
import { Images } from '@/assets/images';

const page = ref<number>(1);
const total = ref<number>(0);
const list = ref<any[]>([]);
const active = ref<number>(0);

const onLoad = async () => {
  const [_, res] = await to(getOrderSkuList({
    page: page.value,
    type: 2,
    // type: active.value
  }));
  if (res) {
    list.value = res.list || []
    total.value = Math.ceil(res.total / 10) || 0
  }
}

onLoad()

const getStatusText = (status: number) => {
  if(status == 10) {
    return '未付款';
  } else if(status == 20) {
    return '已付款';
  } else if(status == 30) {
    return '已取消';
  }
}
</script>

<template>
  <!-- <VantTabs class="tabs-box" v-model:active="active" @change="onLoad">
    <VantTab title="全部"></VantTab>
    <VantTab title="待付款"></VantTab>
    <VantTab title="已完成"></VantTab>
    <VantTab title="已取消"></VantTab>
  </VantTabs> -->
  <div v-if="list.length > 0">
    <ul class="product-list">
      <li class="product-item" v-for="item in list" :key="item.id">
        <VantImage 
          class="product-item-img"
          :src="item.img"
          :show-loading="false"
          :show-error="false"
          width="100%" 
          fit="cover" 
          lazy-load 
          :radius="4" 
        />
        <div class="product-item-info">
          <p>
            <h2>#{{item.goods_number}} {{item.title}}</h2>
            <span class="status">{{getStatusText(item.payment_status)}}</span>
          </p>
          <p>
            <span>订单号：</span>
            <span>{{item.order_number}}</span>
          </p>
          <p>
            <span>订单金额：</span>
            <span class="price">￥{{item.order_price}}</span>
          </p>
          <p>
            <span>支付方式：</span>
            <span>{{item.payment_type == 2 ? '支付宝':'余额'}}</span>
          </p>
          <p>
            <span>下单日期：</span>
            <span>{{columnToDateTime(item.created_at)}}</span>
          </p>
        </div>
      </li>
    </ul>
    <VantPagination v-model="page" :page-count="total" mode="simple" @change="onLoad" />
  </div>
  <VantEmpty v-else class="empty" :image="Images.order" :description="`暂无订单`" />
</template>

<style lang="less" scoped>
.tabs-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  :deep(.van-tabs__line) {
    background-color: #01c2c3;
  }
}

.product-list {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-bottom: 10px;
  padding: 0 10px;
  // padding-top: 50px;

  .product-item {
    padding: 10px;
    margin-top: 10px;
    width: 100%;
    border-radius: 4px;
    background-color: #ffffff;
    box-shadow: rgba(182, 182, 182, 0.16) 0px 2px 10px 0px;
    display: flex;
    justify-content: space-between;

    .product-item-img {
      margin-bottom: 10px;
      width: 100px !important;
      :deep(.van-image__img) {
        height: auto;
      }
    }

    .product-item-info {
      display: flex;
      flex-direction: column;
      color: #5a5f6d;
      font-size: 14px;
      font-weight: 300;
      & > p {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &>h2 {
          color: #000000;
          font-size: 16px;
          font-weight: 600;
        }
        &>span:nth-child(2){
          color: #000000;
          font-weight: 600;
        }
      }
      .status {
        color: #01c2c3 !important;
        font-weight: 700 !important;
        font-size: 16px;
      }
      .price {
        color: #f4a33a !important;
        font-weight: 700 !important;
        font-size: 16px;
      }
    }
  }
}
.empty {
  padding-top: 20vh;
}
</style>
