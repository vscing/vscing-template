<script setup lang="ts" name="Goods">
import { reactive, ref } from 'vue';
import {
  DropdownMenu,
  DropdownItem,
  Popup as VantPopup,
  Image as VantImage,
  // Pagination as VantPagination,
  Empty as VantEmpty,
  Icon as VantIcon,
  Search as VantSearch,
  Dialog,
  // Toast
} from 'vant';
import { TabList } from '@/components/TabList';
import { useRouter } from 'vue-router';
import { getGoodsList, getGoodsCategory } from '@/api/goods';
// import { to } from '@/utils';
import { List } from '@/components/List';
import { Images } from '@/assets/images';
import { useUserStore } from '@/store/modules/user';
import { to } from '@/utils';

const title = ref<string>('');
const show = ref(false);
const categoryList = ref<any>([]);
const categoryId = ref(0);
const isFlavour = ref(false);
// const timeVal = ref<number>(0);
// const priceVal = ref<number>(0);
// const page = ref<number>(1);
// const total = ref<number>(0);
// const list = ref<any[]>([]);

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

const params = reactive<{
  timeSort: number
  priceSort: number
  title: string
  categoryId: number 
  goodsCategoryId: number
}>({
  timeSort: 0,
  priceSort: 0,
  title: '',
  categoryId: 0,
  goodsCategoryId: 1
});

const onDetail = (id: number) => {
  router.push(`/goods/detail?id=${id}`)
}

const init = async () => {
  if(!userInfo?.is_name){
    Dialog.confirm({
      title: '提示',
      message:'市场功能需要进行实名认证，是否前往实名认证？',
    })
    .then(() => {
      router.push('/realName')
    })
    .catch(() => {
      router.push('/user')
    });
    return
  }
  const [_, res] = await to(getGoodsCategory({}))
  console.log('%c [ res ]-76', 'font-size:13px; background:pink; color:#bf2c9f;', res)
  if (res) {
    categoryList.value = res.list || []
  }
}

init()

// const onLoad = async () => {
//   const [_, res] = await to(getGoodsList({
//     page: page.value,
//     timeSort: timeVal.value,
//     priceSort: priceVal.value,
//     title: title.value
//   }))
//   if (res) {
//     list.value = res.list || []
//     total.value = Math.ceil(res.total / 10) || 0
//   }
// }

// onLoad();

// const onChange = () => {
//   page.value = 1;
//   list.value = [];
//   total.value = 0;
//   onLoad();
// }

const onCategory = (id) => {
  if(id == categoryId) {
    categoryId.value = 0;
  } else {
    categoryId.value = id;
  }
}

const onSearchCategory = () => {
  params.categoryId = categoryId.value;
  show.value = false;
}

const onSearch = () => {
  params.title = title.value;
}

const onSwitch = () => {
  let flavour = !isFlavour.value;
  params.goodsCategoryId = flavour ? 2:1;
  isFlavour.value = flavour;
}

</script>

<template>
  <form action="/">
    <VantSearch
      class="search-box"
      v-model="title"
      show-action
      placeholder="请输入商品名称关键词"
      @search="onSearch"
    />
  </form>
  
  <div class="screen-box">
    <DropdownMenu class="screen-drop" :z-index="9999" active-color="#01c2c3">
      <DropdownItem v-model="params.timeSort" :options="option1" />
      <DropdownItem v-model="params.priceSort" :options="option2" />
    </DropdownMenu>
    <div @click="onSwitch" :class="{'actived': isFlavour}">调料市场</div>
    <VantIcon name="bars" class="screen-icon" @click="show = !show"/>
  </div>
  
  <List
    :apiFunc="getGoodsList"
    :params="params"
    :offset="30"
  >
    <template #default="defaultProps">
      <ul class="product-list">
        <li class="product-item" v-for="item in defaultProps.list" :key="item.id" @click="onDetail(item.id)">
          <!-- <span class="payment" v-if="item.status == 30">支付中</span> -->
          <img class="payment" v-if="item.status == 30" :src="Images.paying"/>
          <VantImage class="product-item-img" :src="item.img" :show-loading="false" :show-error="false" width="100%"
            fit="cover" lazy-load :radius="4" />
          <div class="product-item-info">
            <h2>{{ item.title }}</h2>
            <!-- #{{item.goods_number}}  -->
            <p class="product-item-price">￥{{ item.goods_price }}</p>
            <p class="product-item-desc">
              <!-- {{ item.user_name }} -->
              <span>艺术家 食艺术</span>
              <span class="product-item-like">
                <VantIcon name="like-o" />
              </span>
            </p>
          </div>
        </li>
      </ul>
    </template>
    <template #empty>
      <VantEmpty
        class="empty"
        :image="Images.empty"
        :description="`尽请期待`"
      />
    </template>
  </List>

  <VantPopup
    safe-area-inset-top
    safe-area-inset-bottom
    v-model:show="show"
    position="right"
    :overlay-style="{zIndex: 99999}"
    :style="{ width: '80vw', height: '100vh', zIndex: 100000 }" 
    closeable
    close-icon="close"
  >
    <div class="category-box">
      <div class="category-title">
        <VantIcon name="send-gift-o" />
        <span>分类标签</span>
      </div>
      <ul class="category-list">
        <li :class="{'category-item': true, 'active': item.id == categoryId}" v-for="item in categoryList" :key="item.id" @click="onCategory(item.id)"> {{item.title}} </li>
      </ul>
    </div>
    <div class="btnList">
      <div class="btnCancel" @click="categoryId = 0">重置</div>
      <div @click="onSearchCategory">确定筛选</div>
    </div>
  </VantPopup>

  <!-- <div v-if="list.length > 0">
    <ul class="product-list">
      <li class="product-item" v-for="item in list" :key="item.id" @click="onDetail(item.id)">
        <VantImage class="product-item-img" :src="item.img" :show-loading="false" :show-error="false" width="100%"
          fit="cover" lazy-load :radius="4" />
        <div class="product-item-info">
          <h2>#{{item.goods_number}} {{ item.title }}</h2>
          <p class="product-item-price">￥{{ item.goods_price }}</p>
          <p class="product-item-desc">
            {{ item.user_name }}
            <span>艺术家 食艺术</span>
            <span class="product-item-like">
              <VantIcon name="like-o" />
            </span>
          </p>
        </div>
      </li>
    </ul>
    <VantPagination v-model="page" :page-count="total" mode="simple" @change="onLoad" />
  </div>
  <VantEmpty v-else class="empty" :image="Images.empty" :description="`暂无商品`" /> -->
  <TabList />
</template>

<style lang="less" scoped>
.search-box {
  position: fixed;
  top: env(safe-area-inset-top);
  top: constant(safe-area-inset-top);
  left: 0;
  width: 100%;
  z-index: 9999;
}
.screen-box {
  position: fixed;
  top: calc(env(safe-area-inset-top) + 50px);
  top: calc(constant(safe-area-inset-top) + 50px);
  left: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  .screen-drop {
    flex: 1;
    max-width: 180px;
    :deep(.van-dropdown-menu__bar) {
      box-shadow: none;
      width: 180px;
    }
  }
  .actived {
    color: #01c2c3;
  }
  .screen-icon {
    font-size: 24px;
    margin-right: 12px;
  }
}
.category-box {
  padding: 60px 10px 0;
  .category-title {
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-bottom: 20px;
    :deep(.van-icon) {
      font-size: 24px;
      margin-right: 10px;
    }
  }
}
.category-list {
  display: grid;
  grid-template-columns: repeat(2, 48%);
  grid-column-gap: 4%;
  grid-row-gap: 10px;
  height: calc(100vh - 160px);
  overflow: scroll;
  .category-item {
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: rgba(0,0,0,.7);
    background: #f9f9f9;
    border-radius: 4px;
  }
  .active {
    color: #01c2c3;
    background-color: rgba(9, 195, 195, .2);
  }
}
.btnList {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  background: #fff;
  box-sizing: border-box;
  width: 100%;
  &>div{
    flex: 3;
    height: 40px;
    line-height: 40px;
    background: linear-gradient(90deg,#35d3d5,#01c2c3);
    text-align: center;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }
  .btnCancel {
    flex: 2;
    background: #e5e5e5;
    color: rgba(0,0,0,.7);
  }
}
.product-list {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-bottom: 10px;
  padding: 100px 10px 0;

  .product-item {
    position: relative;
    padding: 10px;
    margin-top: 10px;
    width: calc(50% - 5px);
    border-radius: 4px;
    background-color: #ffffff;
    box-shadow: rgba(182, 182, 182, 0.16) 0px 2px 10px 0px;
    // .payment {
    //   position: absolute;
    //   top: 5px;
    //   left: 5px;
    //   color: #ff0000;
    //   font-weight: 700;
    //   z-index: 99;
    // }
    .payment {
      position: absolute;
      top: 0;
      left: 0;
      font-weight: 700;
      z-index: 99;
      width: 80px;
      height: auto;
    }

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
