<script setup lang="ts">
import { ref } from 'vue';
import {
  NavBar as VantNavBar,
  Empty as VantEmpty,
  Pagination as VantPagination
} from 'vant';
import { useRouter } from 'vue-router';
import { getChildList } from '@/api/distribute';
import { to } from '@/utils';
import { Images } from '@/assets/images';
import { columnToDateTime } from '@/utils/dateUtil';

const router = useRouter();

const page = ref<number>(1);
const total = ref<number>(0);
const list = ref<any[]>([]);

const onLoad = async () => {
  const [_, res] = await to(getChildList({
    page: page.value
  }))
  if (res) {
    list.value = res.list || []
    total.value = Math.ceil(res.total / 10) || 0
  }
}

onLoad();

const onClickLeft = () => {
  router.go(-1);
};
</script>

<template>
  <VantNavBar class="nav-bar" safe-area-inset-top fixed left-arrow @click-left="onClickLeft" title="邀请列表" />
  <div v-if="list.length > 0">
    <ul class="product-list">
      <li class="product-item" v-for="item in list" :key="item.id">
        <h2>昵称：{{item.nickname}}</h2>
        <p>手机号：{{item.phone}}</p>
        <p>实名认证：{{item.is_real == 1 ? '已认证':'未认证'}}</p>
        <p>绑定银行卡：{{item.is_bank == 1 ? '已绑定':'未绑定'}}</p>
        <p>注册时间：{{columnToDateTime(item.created_at)}}</p>
      </li>
    </ul>
    <VantPagination v-model="page" :page-count="total" mode="simple" @change="onLoad" />
  </div>
  <VantEmpty v-else class="empty" :image="Images.empty" :description="`暂无商品`" />
</template>

<style lang="less" scoped>
.nav-bar {
  position: fixed;
  top: env(safe-area-inset-top);
  top: constant(safe-area-inset-top);
  left: 0;
  width: 100%;
  z-index: 9999;

  :deep(.van-icon) {
    color: #000000;
  }

  :deep(.van-nav-bar__title) {
    color: #000000;
  }
}
.product-list {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-bottom: 10px;
  padding: 50px 10px 0;

  .product-item {
    padding: 10px;
    margin-top: 10px;
    width: 100%;
    border-radius: 4px;
    background-color: #ffffff;
    box-shadow: rgba(182, 182, 182, 0.16) 0px 2px 10px 0px;

    &:nth-child(2n) {
      margin-left: 10px;
    }

    .product-item-img {
      margin-bottom: 10px;
    }

    .product-item-info {
      color: #5a5f6d;
      font-size: 14px;
      font-weight: 300;

      .product-item-price {
        font-size: 16px;
        font-weight: 600;
        color: #01c2c3;
      }

      .product-item-desc {
        font-weight: 500;
      }

      &>h2 {
        color: #000000;
        font-size: 16px;
        font-weight: 600;
      }

      &>p {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .product-item-like {
          display: flex;
          align-items: center;

          &>i {
            margin-right: 5px;
          }
        }
      }
    }
  }
}
.empty {
  padding-top: 20vh;
}
</style>
