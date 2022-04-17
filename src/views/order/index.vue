<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { 
    NavBar as VantNavBar,
    Image as VantImage,
    Icon as VantIcon,
    Button as VantButton,
    Popup,
    Picker,
    Field
  } from 'vant';
  import { SvgIcon } from '@/components/SvgIcon';

  const router = useRouter();
  const result = ref('A账户余额支付');
  const showPicker = ref(false);
  const columns = ['A账户余额支付', '支付宝支付'];

  const onClickLeft = () => {
    router.go(-1);
  }; 

  const payment = () => {
    router.push('/order')
  }

  const onConfirm = (value) => {
    result.value = value;
    showPicker.value = false;
  };
</script>

<template>
  <VantNavBar
    class="nav-bar"
    title="订单详情"
    left-arrow
    @click-left="onClickLeft"
    safe-area-inset-top
  />

  <div class="image-box">
    <VantImage width="100%" height="auto" src="https://source.theone.art/watermarkResize/37a3adf0c780332f729e80cb16afe7e2/ccb7c9c4c5052c8299734c957c176ac6-16466350452770.25.jpg" />
  </div>
  
  <div class="content-product">
    <div class="content-product-list">
      <div class="content-product-image">
        <div class="content-title-list">
            <div class="content-title-number">	
              <text class="content-title">火锅 白菜</text>
              <uni-number-box :disabled="true" />
            </div>
            <div class="content-price">产品编号#662 / 1000</div>
            <div class="content-price">
              <div >￥150</div>
            </div>
            <div class="undefined-line">
            </div>
            <div class="content-button">
              <div>1件商品，总商品金额：</div>
              <div>
                <span>￥310.00</span>
              </div>
            </div>
            <div class="content-button">
              <div>可用余额</div>
              <div>
                <div>￥0.00</div>
              </div>
            </div>
            <div class="content-button">
              <div>支付方式</div>
              <div class="picker-select">
                <Field
                    v-model="result"
                    is-link
                    readonly
                    name="picker"
                    @click="showPicker = true"
                />
              </div>
              <Popup v-model:show="showPicker" position="bottom">
                  <Picker
                    :columns="columns"
                    @confirm="onConfirm"
                    @cancel="showPicker = false"
                  />
              </Popup>
            </div>
            <div class="content-button">
              <div></div>
              <div class="payment-no">
                <div>余额不足</div>
              </div>
            </div>
        </div>
        </div>
    </div>
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
    & > h2 {
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
    & > h2 {
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
  .content-product{
      .content-product-list{
          padding: 10px;
          .content-product-image{
            background-color: #FFFFFF;
	        	padding: 10px;
            .content-title-list{
                .content-title-number{
                      display: flex;
		                  margin-top: 10px;
                      .content-title{
                            flex: 1;
                            font-size: 16px;
                            color: #000000;
                            font-weight: 600;
                            margin-bottom: 5px;
                      }
                }
                .undefined-line{
                    width: 98%;
                    border-bottom: 1px solid #ddd;
                    margin: 15px auto;
                }
                .content-button{
                    margin-top: 10px;
                    width: 100%;
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    & > div:first-child{
                        font-weight: 400;
		                    color: rgba(0,0,0,.4);
                        display: flex;
                        align-items: center;
                    }
                    & > div:last-child{
                        color: #333;
                    }
                    .picker-select{
                        position: relative;
                        left: 20px;
                    }
                }
            }
          }
      }
      .settlementPay{
          width: 90%;
          display: flex;
          margin: 20px auto;
          .content-product-button:first-child{
              flex: 1;
              color: #666;
              background: #e5e5e5!important;
              border-color: #e5e5e5!important;
              border-radius: 20px;
              margin-right: 10px;
          }
          .content-product-button:last-child{
              flex: 1;
              color: white;
              background: rgb(1, 194, 195)!important;
              border-color: rgb(1, 194, 195)!important;
              border-radius: 20px;
          }
      }
  }
</style>