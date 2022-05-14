<script setup lang="ts">
import { ref } from 'vue';
import {
  NavBar as VantNavBar,
  Image as VantImage,
  Empty as VantEmpty,
} from 'vant';
import { useRouter } from 'vue-router';
import { getUserCategory } from '@/api/goods';
import { to } from '@/utils';
import { Images } from '@/assets/images';

const router = useRouter();

const data = ref<any>({});

const goList = (id: number) => {
  router.push('/locked/list?goods_id='+id)  
}

const onLoad = async () => {
  const [_, res] = await to(getUserCategory({}))
  console.log('%c [ res ]-27', 'font-size:13px; background:pink; color:#bf2c9f;', res)
  if (res) {
    data.value = res.data || {}
  }
}

onLoad();

const onClickLeft = () => {
  router.go(-1);
};
</script>

<template>
  <VantNavBar class="nav-bar" safe-area-inset-top fixed left-arrow @click-left="onClickLeft" title="藏品管理" />
  <div v-if="Object.keys(data).length > 0">
    <ul class="product-list">
      <li class="product-item" v-for="item of data" :key="item.goods_id" @click="goList(item.goods_id)">
        <VantImage class="product-item-img"
          :src="item.img"
          :show-loading="false" :show-error="false" width="100%" fit="cover" lazy-load :radius="4" />
        <div class="product-item-info">
          <h2>藏品：{{ item.title }}</h2>
          <p class="product-item-price">拥有{{ item.count }}个</p>
        </div>
      </li>
    </ul>
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
