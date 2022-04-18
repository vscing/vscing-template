<script setup lang="ts">
import { ref } from "vue";
import {
  NavBar as VantNavBar,
  Image as VantImage,
  Icon as VantIcon,
  Tabs as VantTabs,
  Tab as VantTab,
  Button as VantButton,
  Toast
} from "vant";
import { getList, setCompound } from '@/api/play';
import { to } from "@/utils";

const capital = ref<string[]>(['一', '二', '三', '四', '五', '六', '七', '八', '九'])
const playList = ref<any[]>([]);
const goodsList = ref<any>({});
const disabled = ref<boolean>(true);

const active = ref(0);

const goCompound = async (id: number) => {
  const [_, res] = await to(setCompound({id}));
  if(res) {
    Toast.success('合成成功,请前往藏品管理查看')
    init();
  }
}

const init = async () => {
  const [_, res] = await to(getList());
  if(res){
    playList.value = res.playList || []
    goodsList.value = res.goodsList || {}

    let isBol = res.playList.every((item) => {
      return item.count === (res.goodsList[item.goods_id] ?? 0)
    })
    disabled.value = !isBol;
  }
  console.log('%c [ res ]-28', 'font-size:13px; background:pink; color:#bf2c9f;', res)
};

init()
</script>

<template>
  <div class="compound">
    <VantNavBar title="产品合成" />
    <VantTabs v-model:active="active" animated>
        <VantTab v-for="(item, key) in playList" :key="item.id" :title="'操作 ' + key">
          <template #title>
            <VantIcon name="send-gift-o" size="20" />&nbsp;玩法{{ capital[key] }}
          </template>
          <div class="compound-background">
            <div class="compound-condition">
              <h3>合成条件</h3>
              <div>
                {{item.desc}}
              </div>
            </div>
            <ul class="product-list">
              <li class="product-item" v-for="son in item.children" :key="son.id">
                <VantImage
                  class="product-item-img"
                  :src="son.goods_img"
                  :show-loading="false" 
                  :show-error="false" 
                  width="100%" 
                  fit="cover" 
                  lazy-load 
                  :radius="4" 
                />
                <div class="product-item-info">
                  <h2>{{son.goods_title}}</h2>
                  <p><span>需要*{{son.count}}</span></p>
                  <p class="product-item-price">
                    <span class="product-item-like">
                      当前拥有*{{goodsList[son.goods_id] ?? 0}}
                    </span>
                  </p>
                </div>
              </li>
            </ul>
            <!-- 合成后的产品 -->
            <div class="compound-box">
              <VantImage :src="item.goods_img" />
              <h1 class="title">{{item.goods_title}}</h1>
              <VantButton type="primary" :disabled="disabled" round block :color="disabled ? '#999999':'#01c2c3'" @click="goCompound(item.id)">去合成</VantButton>
            </div>
          </div>
        </VantTab>
      </VantTabs>
    <div class="compound-action">
      <div class="compound-action-title">活动须知</div>
      <div class="compound-action-desc">
        <p>活动须知： </p>
        <p>
          为更好服务食艺术平台的各位用户，食艺术特此公告数字藏
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
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.compound {
  background: #01c2c335;

  :deep(.van-tabs__line) {
    background: none;
  }

  :deep(.van-tabs__nav--line) {
    background: #01c2c3;
  }

  :deep(.van-tab__text) {
    display: flex;
    align-items: center;
  }

  :deep(.van-tab) {
    display: flex;
    align-items: center;
    border: 1px solid hsla(0, 0%, 59.2%, .3);
    background: #01c2c3;
    color: #fff;
  }

  :deep(.van-tabs) {
    margin: 30px 20px;
  }

  :deep(.van-tab--active) {
    border: none !important;
    background-color: #fff !important;
    color: #323232;
  }

  .compound-background {
    margin-top: 30px;

    .compound-condition {
      text-align: center;
      margin-bottom: 10px;

      &>h3 {
        font-size: 20px;
        font-weight: bolder;
      }

      &>div {
        font-size: 14px;
        padding: 10px 20px;
      }
    }
  }

  .compound-action {
    .compound-action-title {
      text-align: center;
      font-size: 18px;
    }

    .compound-action-desc {
      &>p {
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

      &>h2 {
        color: #000000;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 10px;
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
.compound-box {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .van-image {
    border-radius: 5px;
    overflow: hidden;
  }
  .title {
    margin-top: 10px;
    font-size: 16px;
  }
  :deep(.van-button) {
    margin-top: 20px;
  }
}
</style>
