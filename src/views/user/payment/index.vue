<script setup lang="ts">
  import {
    NavBar as VantNavBar,
    Icon as VantIcon,
    Button as VantButton,
    Cell as VantCell, 
    CellGroup as VantCellGroup
  } from 'vant';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const onPay = (path: string) => {
      router.push(path)
  }
  const onClickLeft = () => router.go(-1);
</script>

<template>
  <VantNavBar 
      class="nav-bar"
      title="支付管理" 
      left-arrow
      @click-left="onClickLeft"
  />

  <div class="payment-box">
    <div class="payment-panel">
      <div class="payment-main">
        <div class="payment-panel-top">
          <div class="panel-top-left">
            <div>
              <p>总金额（元）</p>
              <h1>¥ 0.00</h1>
            </div>
            <VantIcon name="eye-o" size="20"/> 
            <!-- <van-icon name="closed-eye" /> -->
          </div>
          <div class="panel-top-bill" @click="onPay('/fillmount')">账单</div>
        </div>
        <div class="payment-panel-bottom">
          <div>
            <p>可用金额（元）</p>
            <h1>¥ 0.00</h1>
          </div>
          <div>
            <p>冻结金额（元）</p>
            <h1>¥ 0.00</h1>
          </div>
        </div>
      </div>
      <div class="payment-info">
        <div class="info-list">
          <div>
            <p>累计佣金（元）</p>
            <h1>¥ 0.00</h1>
          </div>
          <div>
            <p>累积提现（元）</p>
            <h1>¥ 0.00</h1>
          </div>
        </div>
      </div>
    </div>
  </div>

  <VantCellGroup class="payment-way">
    <!-- <VantCell title="第三方支付" is-link /> -->
    <VantCell title="银行卡绑定" is-link  @click="onPay('/bankCard')"/>
  </VantCellGroup>

  <div class="btn-list">
    <VantButton round block color="#01c2c3" native-type="submit">
      可用金额充值
    </VantButton>
    <VantButton round block color="#01c2c3" native-type="submit">
      可用金额提现
    </VantButton>
  </div>
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
        z-index: 99;
        .payment-panel-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          .panel-top-left {
            display: flex;
            h1 {
              font-size: 18px;
            }
            p {
              font-size: 12px;
            }
            :deep(.van-icon) {
              color: hsla(0,0%,100%,.4);
            }
          }
        }
        .payment-panel-bottom {
          display: flex;
          padding-top: 20px;
          border-top: 1px solid hsla(0,0%,100%,.1);
          &>div{
            width: 33.3333%;
            &>p{
              color: hsla(0,0%,100%,.4);
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
            color: rgba(0,0,0,.4);
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
</style>
