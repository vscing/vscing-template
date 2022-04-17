<script setup lang="ts">
import { ref } from 'vue';
import {
  DropdownMenu,
  DropdownItem,
  Image as VantImage,
  Pagination as VantPagination,
  Empty as VantEmpty,
  Icon as VantIcon,
  Dialog
} from 'vant';
import { TabList } from '@/components/TabList';
import { useRouter } from 'vue-router';
import { getGoodsList } from '@/api/goods';
import { to } from '@/utils';
import { Images } from '@/assets/images';
import { useUserStore } from '@/store/modules/user';

const timeVal = ref<number>(0);
const priceVal = ref<number>(0);
const page = ref<number>(1);
const total = ref<number>(0);
const list = ref<any[]>([]);

const option1 = [
  { text: '全部商品', value: 0 },
  { text: '最新发售', value: 1 },
  { text: '7日热度最高', value: 2 },
];
const option2 = [
  { text: '默认排序', value: 0 },
  { text: '价格升序', value: 1 },
  { text: '价格降序', value: 2 },
];

const router = useRouter();
const userStore = useUserStore();
const userInfo = userStore.getUserInfo

const onDetail = (id: number) => {
  router.push(`/goods/detail?id=${id}`)
}

const init = () => {
  if(!userInfo?.is_name){
    Dialog.confirm({
      title: '提示',
      message:'请先实名认证、并绑定银行卡后操作。',
    })
      .then(() => {
        router.push('/realName')
      })
      .catch(() => {
        router.push('/user')
      });
  }
  if(!userInfo?.is_bank){
    Dialog.confirm({
      title: '提示',
      message:'请先实名认证、并绑定银行卡后操作。',
    })
      .then(() => {
        router.push('/bankCard')
      })
      .catch(() => {
        router.push('/user')
      });
  }
}

init()

const onLoad = async () => {
  const [_, res] = await to(getGoodsList({
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
  <DropdownMenu class="screen-box" :z-index="9999" active-color="#01c2c3">
    <DropdownItem v-model="timeVal" :options="option1" />
    <DropdownItem v-model="priceVal" :options="option2" />
  </DropdownMenu>
  <div v-if="list.length > 0">
    <ul class="product-list">
      <li class="product-item" v-for="item in list" :key="item.id" @click="onDetail(item.id)">
        <VantImage class="product-item-img" :src="item.img" :show-loading="false" :show-error="false" width="100%"
          fit="cover" lazy-load :radius="4" />
        <div class="product-item-info">
          <h2>{{ item.title }}</h2>
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
  <TabList />
</template>

<style lang="less" scoped>
.screen-box {
  position: fixed;
  top: env(safe-area-inset-top);
  top: constant(safe-area-inset-top);
  left: 0;
  width: 100%;
  z-index: 9999;
}

.product-list {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-top: var(--van-dropdown-menu-height);
  margin-bottom: 10px;
  padding: 0 10px;

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
