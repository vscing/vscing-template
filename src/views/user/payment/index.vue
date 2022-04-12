<script setup lang="ts">
import {
  NavBar as VantNavBar,
  Icon as VantIcon,
  Button as VantButton,
  Cell as VantCell,
  CellGroup as VantCellGroup,
  Field as VantField,
  Form as VantForm,
  Overlay as VantOverlay,
  Radio as VantRadio,
  RadioGroup as VantRadioGroup,
  Stepper as VantStepper,
  Toast,
} from 'vant';
import { useRouter } from 'vue-router';
import { getPayInfo, setRecharge, setWithdraw } from '@/api/pay';
import { to } from '@/utils';
import { ref, reactive } from 'vue';

const router = useRouter();
const onPay = (path: string) => {
  router.push(path)
}
const onClickLeft = () => router.replace('/user');

const show = ref(false);
const recharge = ref(false);
const withdraw = ref(false);
const payInfo = ref<any>({});

const init = async () => {
  const [_, res] = await to(getPayInfo())
  if (res) {
    payInfo.value = res.payInfo || {}
  }
}
init();

const rechargeForm = reactive<any>({
  price: 1,
  model: 'alipay'
})
const onRecharge = async() => {
  const [_, res] = await to(setRecharge(rechargeForm))
  recharge.value = false
  const div = document.createElement('div')
  /* 此处form就是后台返回接收到的数据 */
  div.innerHTML = res.form
  document.body.appendChild(div)
  document.forms['alipay_submit'].submit()
}

const withdrawForm = reactive<any>({
  price: 1,
  model: '2'
})
const onWithdraw = async() => {
  const [_, res] = await to(setWithdraw(withdrawForm))
  if(res) {
    Toast.success('提现申请成功');
  }
  withdraw.value = false
  init();
}
</script>

<template>
  <VantNavBar class="nav-bar" title="支付管理" left-arrow @click-left="onClickLeft" />

  <div class="payment-box">
    <div class="payment-panel">
      <div class="payment-main">
        <div class="payment-panel-top">
          <div class="panel-top-left">
            <p>
              总金额（元）
              <VantIcon name="eye-o" size="20" v-show="show" @click="show = false" />
              <VantIcon name="closed-eye" size="20" v-show="!show" @click="show = true" />
            </p>
            <h1>{{ show ? `¥ ${payInfo.totalMoney}` : ' *** ' }}</h1>
          </div>
          <div class="panel-top-bill" @click="onPay('/fillmount')">账单</div>
        </div>
        <div class="payment-panel-bottom">
          <div>
            <p>可用金额（元）</p>
            <h1>{{ show ? `¥ ${payInfo.useMoney}` : ' *** ' }}</h1>
          </div>
          <div>
            <p>冻结金额（元）</p>
            <h1>{{ show ? `¥ ${payInfo.freezeMoney}` : ' *** ' }}</h1>
          </div>
        </div>
      </div>
      <div class="payment-info">
        <div class="info-list">
          <div>
            <p>累计佣金（元）</p>
            <h1>{{ show ? `¥ ${payInfo.distributTotalMoney}` : ' *** ' }}</h1>
          </div>
          <div>
            <p>累积提现（元）</p>
            <h1>{{ show ? `¥ ${payInfo.withdrawalTotalMoney}` : ' *** ' }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>

  <VantCellGroup class="payment-way">
    <VantCell title="第三方支付" is-link @click="onPay('/alipay')" />
    <VantCell title="银行卡绑定" is-link @click="onPay('/bankCard')" />
  </VantCellGroup>

  <div class="btn-list">
    <VantButton round block color="#01c2c3" @click="recharge = true">可用金额充值</VantButton>
    <VantButton v-if="payInfo.useMoney > 0" round block color="#01c2c3" @click="withdraw = true">可用金额提现</VantButton>
  </div>

  <VantOverlay :show="recharge" @click="recharge = false">
    <div class="wrapper" @click.stop>
      <VantForm @submit="onRecharge">
        <VantField name="stepper" label="充值金额">
          <template #input>
            <VantStepper v-model="rechargeForm.price"  min="0.1" max="50000" />
          </template>
        </VantField>
        <VantField name="radio" label="充值渠道">
          <template #input>
            <VantRadioGroup v-model="rechargeForm.model" direction="horizontal">
              <VantRadio name="alipay">支付宝</VantRadio>
            </VantRadioGroup>
          </template>
        </VantField>
        <div class="btnList">
          <VantButton class="cancel" round block @click="recharge = false">
            取消
          </VantButton>
          <VantButton class="confirm" round block native-type="submit">
            充值
          </VantButton>
        </div>
      </VantForm>
    </div>
  </VantOverlay>

  <VantOverlay :show="withdraw" @click="withdraw = false">
    <div class="wrapper" @click.stop>
      <VantForm @submit="onWithdraw">
        <VantField name="stepper" label="提现金额">
          <template #input>
            <VantStepper v-model="withdrawForm.price"  min="0.1" max="10000" />
          </template>
        </VantField>
        <VantField name="radio" label="提现渠道">
          <template #input>
            <VantRadioGroup v-model="withdrawForm.model" direction="horizontal">
              <VantRadio name="2">支付宝</VantRadio>
            </VantRadioGroup>
          </template>
        </VantField>
        <div class="btnList">
          <VantButton class="cancel" round block @click="withdraw = false">
            取消
          </VantButton>
          <VantButton class="confirm" round block native-type="submit">
            提现
          </VantButton>
        </div>
      </VantForm>
    </div>
  </VantOverlay>
</template>

<style scoped lang="less">
.nav-bar {
  width: 100%;
  :deep(.van-icon) {
    color: #000000;
  }
  :deep(.van-nav-bar__title) {
    color: #000000;
  }
}
.payment-box {
  padding-top: 20px;
  .payment-panel {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    h1 {
      font-weight: 600;
      font-size: 16px;
    }
    .payment-main {
      color: #ffffff;
      margin: 0 15px 15px;
      width: auto;
      padding: 15px;
      // background: linear-gradient(204deg,#303a63,#0f1722);
      background: linear-gradient(204deg, #01c2c3, #1eacad);
      box-shadow: rgba(182, 182, 182, 0.16) 0px 2px 10px 0px;
      border-radius: 4px;
      z-index: 1;
      .payment-panel-top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .panel-top-left {
          display: flex;
          flex-direction: column;
          h1 {
            font-size: 18px;
          }
          p {
            font-size: 12px;
            display: flex;
            align-items: center;
          }
          :deep(.van-icon) {
            color: hsla(0, 0%, 100%, 0.4);
          }
        }
      }
      .payment-panel-bottom {
        display: flex;
        padding-top: 20px;
        border-top: 1px solid hsla(0, 0%, 100%, 0.1);
        & > div {
          width: 33.3333%;
          & > p {
            color: hsla(0, 0%, 100%, 0.4);
            font-size: 12px;
          }
        }
      }
    }
    .payment-info {
      flex: 1;
      .info-list {
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
        background-color: #ffffff;
        box-shadow: rgba(182, 182, 182, 0.16) 0px 2px 10px 0px;
        border-radius: 4px;
        margin-top: -80px;
        padding: 0 10px;
        padding-bottom: 20px;
        z-index: 9;
        height: 150px;
        p {
          font-size: 12px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.4);
        }
        h1 {
          font-size: 14px;
          color: #000000;
        }
      }
    }
  }
}
.btn-list {
  margin-top: 20px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  :deep(.van-button) {
    margin: 0 5px;
  }
}
.wrapper {
  background-color: #ffffff;
  width: 80vw;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  padding: 10px;
  .btnList {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    &>button {
      margin: 10px;
    }
    .cancel {
      background-color: #e5e5e5;
      border: 0;
    }
    .confirm {
      color: #fff;
      background-color: #01c2c3;
      border: 0;
    }
  }
}
</style>
