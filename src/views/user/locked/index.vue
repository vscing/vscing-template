<script setup lang="ts">
import { ref } from 'vue';
import {
  NavBar as VantNavBar,
  Image as VantImage,
  Icon as VantIcon,
  Empty as VantEmpty,
  Pagination as VantPagination
} from 'vant';
import { useRouter } from 'vue-router';
import { getUserGoods } from '@/api/goods';
import { to } from '@/utils';
import { Images } from '@/assets/images';

const router = useRouter();

const page = ref<number>(1);
const total = ref<number>(0);
const list = ref<any[]>([]);

const goDetail = (id: number) => {
  router.push('/locked/detail?id='+id)  
}

const onLoad = async () => {
  const [_, res] = await to(getUserGoods({
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
  <VantNavBar class="nav-bar" safe-area-inset-top fixed left-arrow @click-left="onClickLeft" title="藏品管理" />
  <div v-if="list.length > 0">
    <ul class="product-list">
      <li class="product-item" v-for="item in list" :key="item.id" @click="goDetail(item.id)">
        <VantImage class="product-item-img"
          :src="item.img"
          :show-loading="false" :show-error="false" width="100%" fit="cover" lazy-load :radius="4" />
        <div class="product-item-info">
          <h2>#{{item.goods_number}} {{ item.title }}</h2>
          <p class="product-item-price">￥{{ item.goods_price }}</p>
          <p class="product-item-desc">
            <span>艺术家 {{ item.user_name }}</span>
            <span class="product-item-like">
              <VantIcon name="like-o" />
            </span>
          </p>
        </div>
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
    width: calc(50% - 5px);
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
