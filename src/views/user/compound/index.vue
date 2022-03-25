<script setup lang="ts">
import { ref } from "vue";
import {
  NavBar as VantNavBar,
  List as VantList,
  Image as VantImage,
  Icon as VantIcon,
  Tabs as VantTabs,
  Tab as VantTab,
  Button
} from "vant";
import { useRouter } from "vue-router";

const loading = ref<boolean>(false);
const finished = ref<boolean>(false);
const number = ref(["一", "二", "三", "四"]);
const active = ref(0);

const router = useRouter();

const onDetail = () => {
  router.push("/goods/detail");
};

const onLoad = () => {};
</script>

<template>
  <div class="compound">
    <VantNavBar title="产品合成" />
    <VantList
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <VantTabs v-model:active="active" animated>
        <VantTab v-for="index in number" :key="index" :title="'操作 ' + index">
          <template #title>
            <VantIcon name="send-gift-o" size="20" />&nbsp;玩法{{ index }}
          </template>
          <div class="compound-background">
            <div class="compound-condition">
              <h3>合成条件</h3>
              <div>
                一张合成图【烤肉】+一张合成图【游泳】+一张合成图【浇花】可消耗合成一张动态大图【鲁道夫和朋友们】
              </div>
            </div>
            <ul class="product-list">
              <li
                class="product-item"
                v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]"
                :key="item"
                @click="onDetail"
              >
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
                  <p><span>需要*2</span></p>
                  <p class="product-item-price">
                    <span class="product-item-like">
                      当前拥有*0
                    </span>
                  </p>
                </div>
              </li>
            </ul>
            <!-- 合成后的产品 -->
            <div>
                <VantImage />
                <Button>去合成</Button>
            </div>
          </div>
        </VantTab>
      </VantTabs>
    </VantList>
    <div class="compound-action">
        <div class="compound-action-title">活动须知</div>
        <div class="compound-action-desc">
            <p>活动须知： </p>
            <p>
              为更好服务唯一艺术平台的各位用户，唯一艺术特此公告数字藏
              品的二次交易细则。鉴于不同属性的数字艺术的二次交易细则各
              有不同，请各位用户务必审慎阅读并同意相关规则后进行相应操
              作，以免造成不必要损失。
            </p>
            <p>
                1、依据我国法律要求，特定条件下的数字藏品的二次交易不支持
                任何形式的变相炒作，我们坚决反对数字藏品炒作、场外交易、
                欺诈，或以任何其他非法、侵权方式使用的违法违规行为，请大
                家注意甄别上述涉嫌网络欺诈的行为及其相关风险。
            </p>
            <p>
                2、数字藏品为虚拟数字商品，购买以及寄售前请先完成实名认证。
            </p>
            <p>3、本商品一经合成不支持退换。</p>
            <p>4、本次合成通道限时开启时间：3月12日（本周六）18:00至3月14日（下周一）18:00。</p>
        </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.compound {
  background: #ffedc3;
  :deep(.van-tabs__line) {
    background: none;
  }
  :deep(.van-tabs__nav--line) {
    background: #ffedc3;
  }
  :deep(.van-tab__text) {
    display: flex;
    align-items: center;
  }
  :deep(.van-tab) {
    display: flex;
    align-items: center;
    border: 1px solid hsla(0,0%,59.2%,.3);
    background: #fff2d5;
    border-radius: 5px;
  }
  :deep(.van-tabs) {
    margin: 30px 20px;
  }
  :deep(.van-tab--active) {
    border: none!important;
    background-color: #fff!important;
  }
  .compound-background{
      background: url(https://theoneart-common.oss-cn-qingdao.aliyuncs.com/author/97c874b….png) no-repeat center;
      background-size: cover;
      margin-top:35px;
      .compound-condition {
          text-align: center;
          margin-bottom: 40px;
          & > h3 {
            font-size: 20px;
            font-weight: bolder;
          }
          & > div {
            font-size: 13px;
            padding: 18px 26px;
          }
      }
  }
  .compound-action{
        .compound-action-title{
            text-align:center;
            font-size: 18px;
        }
        .compound-action-desc{
          & > p {
                padding: 10px 15px;
                line-height: 30px;
          }
        }
  }
}
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
