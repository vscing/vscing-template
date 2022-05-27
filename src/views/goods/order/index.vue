<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import {
  NavBar as VantNavBar,
  Image as VantImage,
  Button as VantButton,
  Overlay as VantOverlay,
  Field as VantField,
  Popup,
  Picker,
  Toast,
} from 'vant';
import { getGoodsOrderInfo, createOrder, receiptpayment } from '@/api/goods';
import { to } from '@/utils';
import { ref, reactive } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { getPayInfo } from '@/api/pay';
import { getBankCard } from '@/api/bank';

const userStore = useUserStore();
const userInfo = userStore.getUserInfo;
console.log('%c [ userInfo ]-16', 'font-size:13px; background:pink; color:#bf2c9f;', userInfo)
const result = ref('B余额支付');
const showPicker = ref(false);
const show = ref(false);
const columns = ref(['B余额支付', 'A余额支付']); // , '支付宝支付' , 'A银行卡支付'
const router = useRouter();
const route = useRoute();
const data = ref<any>({});
const payInfo = ref<any>({});

// 银行卡id
const list = ref([]);
const showCard = ref(false);
const bankCardId = ref(0);
const showPicker2 = ref(false);
const result2 = ref('请选择');

// 短信确认
const payeaseObj = reactive({
  merchantId: '',
  requestId: '',
  paymentOrderId: '',
  kaptchaCode: ''
})
const { id } = route.query || {}

const init = async () => {
  const [_, res] = await to(getGoodsOrderInfo({ id }));
  if (res) {
    data.value = res.data || {}
  }
}
init();

const init2 = async () => {
  const [_, res] = await to(getPayInfo())
  if (res) {
    payInfo.value = res.payInfo || {}
    // if(Number(res.payInfo['useMoney']) === 0) {
    //   result.value = '支付宝支付';
    //   columns.value = ['支付宝支付']; 
    // }
  }
}
init2();

const init3 = async() => {
  const [_, res] = await to(getBankCard());
  if(res) {
    list.value = res.list || []
  }
}
init3()

const goBackDetail = () => {
  router.go(-2);
};

const onConfirm = (value) => {
  if(value === 'A银行卡支付') {
    showCard.value = true;
  } else {
    showCard.value = false;
  }
  result.value = value;
  showPicker.value = false;
};

const onConfirm2 = (value) => {
  result2.value = value.number
  bankCardId.value = value.id
  showPicker2.value = false;
}

const getProductBuy = async() => {
  const data = {
    id,
    type: 1
  }
  if(result.value === 'A银行卡支付') {
    if(!bankCardId.value) {
      Toast.fail('请选择支付银行卡');
      return;
    }
    data.type = 3;
  }
  if(result.value === 'A余额支付') {
    data.type = 2;
  }
  const [_, res] = await to(createOrder(data));

  if(res) {
    console.log('%c [ res ]-111', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    if(data.type == 1 || data.type == 2) {
      router.push(`/goods/pay?order_id=${res.order_id}&goods_price=${res.goods_price}&type=${data.type}`);
    }
    if(data.type == 3) {
      router.push(`/goods/pay?order_id=${res.order_id}&goods_price=${res.goods_price}&type=${data.type}&bank_card_id=${bankCardId.value}`);
    }
    // if(data.type == 1) {
    //   router.push('/pay/success');
    // }
    // if(data.type == 3) {
    //   console.log('%c [ res ]-77', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    //   if(res.needKaptcha) {
    //     show.value = true;
    //     payeaseObj.merchantId = res.merchantId;
    //     payeaseObj.requestId = res.requestId;
    //     payeaseObj.paymentOrderId = res.paymentOrderId;
    //     payeaseObj.kaptchaCode = '';
    //   }
    // }
    
    // if(type == 2) {
    //   let divForm = document.getElementsByTagName('divform')
    //   if (divForm.length) {
    //     document.body.removeChild(divForm[0])
    //   }
    //   const div: any = document.createElement('divform')
    //   div.innerHTML = res.form // res.data就是sb支付宝返回给你的form
    //   document.body.appendChild(div)
    //   document.getElementById('alipay_submit')?.submit();
    // }
  }
}

const onCheck = async() => {
  if(!payeaseObj.kaptchaCode) {
    Toast.fail('短信验证码错误');
    return;
  }
  const [_, res] = await to(receiptpayment(payeaseObj));
  if(res) {
    router.push('/pay/success');
  }
}
</script>

<template>
  <VantNavBar class="nav-bar" title="订单详情" left-arrow @click-left="goBackDetail" safe-area-inset-top />

  <div class="image-box">
    <VantImage width="100%" height="auto" :src="data.img" />
  </div>

  <VantOverlay :show="show" @click="show = false">
    <div class="captcha-box" @click.stop>
      <VantField v-model="payeaseObj.kaptchaCode" type="number" />
      <VantButton type="primary" style="margin-top: 60px;" @click="onCheck">提交短信验证码</VantButton>
    </div>
  </VantOverlay>

  <div class="content-product">
    <div class="content-product-list">
      <div class="content-product-image">
        <div class="content-title-list">
          <div class="content-title-number">
            <span class="content-title">#{{data.goods_number}}{{ data.title }}</span>
          </div>
          <div class="undefined-line">
          </div>
          <div class="content-button">
            <div>1件商品，总商品金额：</div>
            <div>
              <span>￥{{ data.goods_price }}</span>
            </div>
          </div>
          <div class="content-button">
            <div>A账户可用余额</div>
            <div>
              <div>￥{{ payInfo['aUseMoney'] }}</div>
            </div>
          </div>
          <div class="content-button">
            <div>B账户可用余额</div>
            <div>
              <div>￥{{ payInfo['useMoney'] }}</div>
            </div>
          </div>
          <div class="content-button">
            <div>支付方式（可选）</div>
            <div @click="showPicker = true" style="color: #1e80ff">
              {{result}}
            </div>
            <Popup v-model:show="showPicker" position="bottom">
              <Picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
            </Popup>
          </div>
          <div class="content-button" v-if="showCard">
            <div>付款银行卡（可选）</div>
            <div @click="showPicker2 = true" style="color: #1e80ff">
              {{result2}}
            </div>
            <Popup v-model:show="showPicker2" position="bottom">
              <Picker :columns="list" :columns-field-names="{text: 'number'}" @confirm="onConfirm2" @cancel="showPicker2 = false" />
            </Popup>
          </div>
        </div>
      </div>
    </div>

    <p class="setup">农业银行，招商银行，兴业银行不支持银行卡支付</p>
    <p class="setup">超过3次待支付当天之内不能购买</p>

    <div class="settlementPay">
      <VantButton class="content-product-button" type="primary" @click="goBackDetail">返回详情</VantButton>
      <VantButton class="content-product-button" type="primary" @click="getProductBuy">立即支付</VantButton>
    </div>
  </div>
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

.image-box {
  margin-top: var(--van-nav-bar-height);
}

.config-box {
  padding: 10px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: rgba(182, 182, 182, 0.16) 0px 2px 10px 0px;
  margin: 0 10px 10px;
  color: #5a5f6d;
  font-size: 14px;
  font-weight: 300;

  &>h2 {
    font-size: 16px;
    color: #000000;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .price-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;

    .price-like-box {
      display: flex;
      align-items: center;

      span {
        padding-left: 5px;
      }
    }
  }

  .config-list {
    .config-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;

      &>p {
        display: flex;
        align-items: center;

        &>span {
          padding-right: 5px;
        }
      }
    }
  }
}

.info-box {
  background-color: #ffffff;
  padding: 10px 20px;
  margin-bottom: 60px;
  color: #5a5f6d;
  font-size: 14px;
  font-weight: 300;

  &>h2 {
    font-size: 16px;
    color: #000000;
    font-weight: 600;
    margin-bottom: 5px;
  }
}

.btn-list {
  position: fixed;
  height: 50px;
  bottom: env(safe-area-inset-bottom);
  bottom: constant(safe-area-inset-bottom);
  left: 0;
  width: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: rgba(182, 182, 182, 0.16) 0px 2px 10px 0px;
  // :deep(.van-button) {
  //   width: 48%;
  // }
}

.content-product {
  .content-product-list {
    padding: 10px;

    .content-product-image {
      background-color: #FFFFFF;
      padding: 10px;

      .content-title-list {
        .content-title-number {
          display: flex;
          margin-top: 10px;

          .content-title {
            flex: 1;
            font-size: 16px;
            color: #000000;
            font-weight: 600;
            margin-bottom: 5px;
          }
        }

        .undefined-line {
          width: 98%;
          border-bottom: 1px solid #ddd;
          margin: 15px auto;
        }

        .content-button {
          margin-top: 10px;
          width: 100%;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;

          &>div:first-child {
            font-weight: 400;
            color: rgba(0, 0, 0, .4);
            display: flex;
            align-items: center;
          }

          &>div:last-child {
            color: #333;
          }

          .picker-select {
            position: relative;
            left: 20px;
          }
        }
      }
    }
  }

  .settlementPay {
    width: 90%;
    display: flex;
    margin: 20px auto;

    .content-product-button:first-child {
      flex: 1;
      color: #666;
      background: #e5e5e5 !important;
      border-color: #e5e5e5 !important;
      border-radius: 20px;
      margin-right: 10px;
    }

    .content-product-button:last-child {
      flex: 1;
      color: white;
      background: rgb(1, 194, 195) !important;
      border-color: rgb(1, 194, 195) !important;
      border-radius: 20px;
    }
  }
}

.captcha-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 35vh;
}

.setup {
  padding: 15px 15px 0;
  color: #ff0000;
}
</style>
