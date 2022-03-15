<script setup lang="ts">
  import { ref } from 'vue';
  import { DropdownMenu, DropdownItem, List as VantList, Image as VantImage, Icon as VantIcon } from 'vant';
  import { TabList } from '@/components/TabList';
  import { useRouter } from 'vue-router';

  const timeVal = ref<number>(0);
  const priceVal = ref<number>(0);
  const loading = ref<boolean>(false);
  const finished = ref<boolean>(false);

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

  const onDetail = () => {
    router.push('/goods/detail')
  }

  const onLoad = () => {}

</script>

<template>
  <DropdownMenu
    class="screen-box"
    :z-index="9999"
    active-color="#01c2c3"
  >
    <DropdownItem v-model="timeVal" :options="option1" />
    <DropdownItem v-model="priceVal" :options="option2" />
  </DropdownMenu>

  <VantList
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <ul class="product-list">
      <li class="product-item" v-for="item in [1,2,3,4,5,6,7,8,9,0]" :key="item" @click="onDetail">
        <VantImage 
          class="product-item-img"
          :src="`https://source.theone.art/watermarkResize/37a3adf0c780332f729e80cb16afe7e2/ccb7c9c4c5052c8299734c957c176ac6-16466350452770.25.jpg?v=${item}`"
          :show-loading="false"
          :show-error="false"
          width="100%"
          fit="cover"
          lazy-load
          :radius="4"
        />
        <div class="product-item-info">
          <h2>唐 门神</h2>
          <p>******</p>
          <p class="product-item-price">
            <span>￥150</span>
            <span class="product-item-like">
              <VantIcon name="like-o" />
              120000
            </span>
          </p>
        </div>
      </li>
    </ul>
  </VantList>

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
          font-weight: 500;
        }
        & > h2 {
          color: #000000;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        & > p {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .product-item-like {
            display: flex;
            align-items: center;
            & > i {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
</style>
