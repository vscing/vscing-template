<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  NavBar as VantNavBar,
  Image as VantImage,
  Button as VantButton,
  Toast
} from 'vant';
import { to } from '@/utils';
import { useUserStore } from '@/store/modules/user';
import { onBeforeUnmount, ref, reactive } from 'vue';
import { Images } from '@/assets/images';
import { getSpecialBlindInfo } from '@/api/blindMarket';

const userStore = useUserStore();
const userInfo = userStore.getUserInfo;
const router = useRouter();
const data = ref<any>({});

const onClickLeft = () => {
  router.go(-1);
};

let timer: NodeJS.Timer;

const timeVal = reactive<any>({
  i1: 0,
  i2: 0,
  s1: 0,
  s2: 0
})

const init = async () => {
  const [_, res] = await to(getSpecialBlindInfo());
  if(res){
    data.value = res.data;
    console.log('%c [ data.value ]-38', 'font-size:13px; background:pink; color:#bf2c9f;', data.value)
  }

  timer = setInterval(() => {
    let i = 60-(new Date()).getMinutes();
    if(i < 10) {
      timeVal.i1 = 0;
      timeVal.i2 = i;
    } else {
      timeVal.i1 = String(i).slice(0,1);
      timeVal.i2 = String(i).slice(1,2);
    };
    let s = 60-(new Date()).getSeconds();
    if(s < 10) {
      timeVal.s1 = 0;
      timeVal.s2 = s;
    } else {
      timeVal.s1 = String(s).slice(0,1);
      timeVal.s2 = String(s).slice(1,2);
    };
  },1000)
}

init()

const goOrder = () => {
  if (data.value.status != 1) {
    return false;
  }
  if (userInfo) {
    router.push(`/one/agree`)
  } else {
    Toast.fail('请登录')
  }
}

onBeforeUnmount(() => {
  timer && clearInterval(timer)
})

</script>

<template>
  <VantNavBar class="nav-bar" title="商品详情" left-arrow @click-left="onClickLeft" safe-area-inset-top />

  <div class="image-box">
    <VantImage width="100%" height="auto" :src="data.gif2" />
  </div>

  <div class="qianggou">
    <div class="qianggou-times">
      <img :src="Images.xsqg" width="100%" />
      <div class="time">
        <p>倒计时</p>
        <span class="num">0</span>
        <span class="num">0</span>
        <span class="dot">:</span>
        <span class="num">{{timeVal.i1}}</span>
        <span class="num">{{timeVal.i2}}</span>
        <span class="dot">:</span>
        <span class="num">{{timeVal.s1}}</span>
        <span class="num">{{timeVal.s2}}</span>
      </div>
    </div>
    <div class="mian-floo">
      <span>1元盲盒</span>
      <div class="limit">
        <p class="limit-label">剩余</p>
        <p class="limit-value">{{data.hourCount}}份</p>
      </div>
    </div>
    <div class="jiage">
      <span>¥{{data.blind_price}}</span>
      <img :src="Images.icon" alt="">
    </div>
  </div>

  <!-- <div class="mingxi">
    <div class="mingxi01"><span>发售数量</span><span>2000份</span></div>
    <div class="mingxi02"><span>每小时发售</span><span>200份</span></div>
  </div> -->
  <div class="miaoshu">
    <h3>商品描述</h3>
    <div>
      <p>新老用户邀请3人实名注册并绑定银行卡可购买1元限定盲盒，每人限购一份。</p>
      <p>盲盒内容：</p>
      <p>“川·冒菜·曹操”5份</p>
      <p>商铺碎片995份</p>
      <p>新品盲盒空投卡500份</p>
      <p>新品盲盒空投碎片3500份</p>
      <p>合成品“川·宫保鸡丁·关兴”2份</p>
      <p>合成品静图“宫保鸡丁·关兴”20个ssr级</p>
      <p>sr级240个（鸡肉 姜维）</p>
      <p>s级462个（葱 魏延）</p>
      <p>r级个638（花生 许褚）</p>
      <p>r级638个（黄瓜 关平）</p>
    </div>
  </div>
  <div class="btn-list">
    <VantButton type="primary" round block color="#01c2c3" :color="data.status != 1 ? '#999999':'#01c2c3'" :disabled="data.status != 1" @click="goOrder">
      立即抢购
    </VantButton>
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

.qianggou{
  margin: 0 10px;
  background: #FFFFFF;
  border-radius: 4px;
  .qianggou-times {
    border-radius: 4px;
    background-color: rgba(142,225,221);
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 10px 0;
    .time {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #000000;
      line-height: 24px;
      background-color: rgba(142,225,221,.3);
      border-radius: 15px;
      padding: 2px 10px;
      .num {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        background-color: #00cccc;
        color: #ffffff;
        padding: 0 5px;
        margin-left: 3px;
        border-radius:4px;
      }
      .dot {
        margin-left: 3px;
      }
    }
    img {
      height: 24px;
      width: auto;
    }
  }
}

.mian-floo{
  padding: 10px;
  margin-top: 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  .limit {
    display: inline-flex;
    align-items: center;
    background-color: rgba(117, 255, 226, 0.14);
    border: 1px solid #8EE1DD;
    color: #8EE1DD;
    border-radius: 10px;
    height: 20px;
    font-size: 12px;
    .limit-label {
      background-color: #8EE1DD;
      color: #ffffff;
      border-radius: 10px;
      padding: 0 8px;
    }
    .limit-value {
      padding: 0 5px;
    }
  }
}
.jiage{
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  span{
    color: red;
    font-weight: 600;
    font-size: 28px;
  }
  img{
    width: 20px;
    height: 20px;
  }
}

.mingxi{
  margin: 10px;
  padding: 10px;
  background: #FFFFFF;
  border-radius: 2px;
}

.mingxi01,.mingxi02{
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 600;
  line-height: 36px;
  padding: 10px;
}
.mingxi01{
  margin-bottom: 0;
  border-bottom:1px solid #999;
}
.mingxi02 {
  margin-top: 0;
}
.miaoshu{
  background-color: #FFFFFF;
  border-radius: 4px;
  margin: 10px;
  margin-bottom: 60px;
  padding: 10px;
}
.miaoshu h3{
  display: block;
  font-size: 18px;
  font-weight: 600;
}
.miaoshu span{
  display: block;
  font-size: 14px;
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
// .btn {
//   margin-top: 20px;
//   width: 100%;
//   height: 45px;
//   border: 0;
//   background-color:#00cccc;
//   color: #ffffff;
// }
</style>
