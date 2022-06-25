<script setup lang="ts">
import {
  NavBar as VantNavBar,
  Pagination as VantPagination,
  Empty as VantEmpty,
  Button as VantButton,
  Toast
} from "vant";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { getList } from '@/api/coupon';
import { to } from "@/utils";
import { Images } from '@/assets/images';

const page = ref<number>(1);
const total = ref<number>(0);
const list = ref<any[]>([]);

const router = useRouter();
const onClickLeft = () => router.go(-1);

const onDetail = (id: number) => {
  router.push(`/coupon/detail?id=${id}`)
}

const onLoad = async () => {
  const [_, res] = await to(getList({
    page: page.value,
    use_status: 1
  }))
  if (res) {
    list.value = res.list || []
    total.value = Math.ceil(res.total / 10) || 0
  }
}
onLoad();

</script>

<template>
  <VantNavBar class="nav-bar" title="优惠劵列表" left-arrow @click-left="onClickLeft" safe-area-inset-top fixed />

  <div class="list" v-if="list.length > 0">
    <div class="item" v-for="item in list" @click="onDetail(item.id)">
      <div class="item-logo">
        <img :src="item.logo" alt="" />
      </div>
      <div class="item-info">
        <div class="item-title">
          <p class="title">{{item.name}}</p>
          <p>¥<span class="price">{{item.amount}}</span></p>
        </div>
        <div class="item-btn">
          <p>使用说明</p>
          <VantButton class="btn" round @click.stop="() => Toast('敬请期待')">转售</VantButton>
        </div>
      </div>
    </div>
    <VantPagination v-model="page" :page-count="total" mode="simple" @change="onLoad" />
  </div>
  <VantEmpty v-else class="empty" :image="Images.empty" :description="`暂无优惠卷`" />
</template>

<style lang="less" scoped>
.list {
  padding-top: 50px;
  .item {
    display: block;
    background-color: #fff;
    display: flex;
    flex-flow: row nowrap;
    margin: 10px;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    border-radius: 10px;
    position: relative;
    .item-logo {
      display: block;
      width: 90px;
      height: 90px;
      border: 1px solid #00cccc;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      img {
        display: block;
        width: 80px;
        height: 80px;
      }
    }
    .item-info {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item-title {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 90px;
        .title {
          font-size: 16px;
          font-weight: 500;
          color: #00cccc;
        }
        .price {
          font-size: 22px;
          font-weight: bold;
          font-style: normal;
        }
      }
      .item-btn {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        min-height: 90px;
        .btn {
          background-color: #00cccc;
          font-size: 14px;
          color: #fff;
          width: 80px;
          height: 24px;
        }
      }
    }
  }
}
</style>
