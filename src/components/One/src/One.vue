<script setup lang="ts">
import { onBeforeUnmount, reactive } from 'vue';
// import { withDefaults, defineProps, watch } from 'vue';
import {
  Button as VantButton,
  Image as VantImage
} from 'vant';
import { useRouter } from 'vue-router';
import { Images } from '@/assets/images';

interface Props {
  num: number
}

const props = withDefaults(defineProps<Props>(), {
  num: 0
})

// const isDisable = computed(() => {
//   return timeVal.i1 === 0 && timeVal.i2 === 0 && timeVal.s1 === 0 && timeVal.s2 === 0;
// })

let timer: NodeJS.Timer;

const timeVal = reactive<any>({
  i1: 0,
  i2: 0,
  s1: 0,
  s2: 0
})

const init = () => {
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
      timeVal.s2 = i;
    } else {
      timeVal.s1 = String(s).slice(0,1);
      timeVal.s2 = String(s).slice(1,2);
    };
  },1000)
}

init()

const router = useRouter();

const goto = (url: string) => {
  if(!url) return;
  router.push(url);
}

onBeforeUnmount(() => {
  timer && clearInterval(timer)
})

</script>

<template>
  <div class="oneWarp">
    <div class="title">限时抢购</div>
    <div class="oneMain">
      <div class="one-img">
        <img class="xianshi" :src="Images.xianshi"/>
        <VantImage
          :src="Images.yiyuan"
          fit="cover"
          lazy-load
          width="100%"
          :radius="4"
          :show-loading="false"
          :show-error="false"
        />
      </div>
      <div class="one-name">
        <p class="name">1元盲盒限时抢购</p>
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
      <div class="limit">
        <p class="limit-label">限量</p>
        <p class="limit-value">{{props.num}}份</p>
      </div>
      <VantButton
        round
        class="btn"
        type="primary"
        @click="goto('/one')"
      >
        立即抢购
      </VantButton>
    </div>
  </div>
</template>

<style lang="less" scoped>
.oneWarp {
  padding: 10px;
  .title {
    font-size: 18px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 10px;
  }
  .oneMain {
    border-radius: 4px;
    background-color: #ffffff;
    padding: 10px;
    box-shadow: rgba(182, 182, 182, 0.16) 0px 2px 10px 0px;
    .one-img {
      position: relative;
      .xianshi {
        position: absolute;
        top: -12px;
        left: -12px;
        z-index: 1;
        width: 100px;
      }
    }
    .one-name {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        font-size: 16px;
        font-weight: 600;
      }
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
    }
    .limit {
      margin-top: 10px;
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
    .btn {
      margin-top: 20px;
      width: 100%;
      height: 45px;
      border: 0;
      background-color:#00cccc;
      color: #ffffff;
    }
  }
}
.mian-floo{
  width: 95%;
  height: 75%;
  display: block;
  background: #010008;
  border-radius: 7px;
  margin: 14px 9px 10px 10px;
  background-color: black;
}
.mian-floo-image{
  position: relative;
}
.mian-floo .mian-floo-image01{
    width: 79px;
    height: 31px;
    position: absolute;
    left: -68px;
    top: -47px;
    background-color: #FF3131;
    box-shadow: 0px 0px 8px 0px rgba(83, 82, 255, 0.32);
    border-radius: 5px;
}
.mian-floo img{
  width: 227px;
  height: 227px;
  display: inline;
  margin: 42px 40px 16px 65px;
  background-color: white;
}
.mian-floo-qianggou{
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: space-between;
  margin-top: 26px;
  margin-bottom: 14px;
}
.mian-floo-qianggou span{
  font-size: 14px;
  font-weight: 600;
  color: #000000;
  line-height: 22px;
  margin-left: 15px;
  opacity: 0.8;
}

.time 
.time 
.time 
.mian-floo-xianliang{
  background-image: url('./images/切图/限量icon.png');
  background-repeat: no-repeat;
  background-size:80px 20px;
  display: flex;
  flex-flow: row nowrap;
  margin-left: 15px;
}
.mian-floo-xianliang-p01{
  color: aliceblue;
  font-size: 12px;
  margin-left: 5px;
}
.mian-floo-xianliang-p02{
  color:#8EE1DD;
  font-size: 12px;
  margin-left: 10px;
}
.mian-button1{
  width: 96%;
  height: 45px;
  margin-top: 23px;
  margin-left: 10px;
  color: aliceblue;
  background-color:#8EE1DD;
  border: 0 solid ;
}
.mian-button2{
  width: 96%;
  height: 45px;
  margin-top: 23px;
  margin-left: 10px;
  background-color:#00cccc;
  color: aliceblue;
  border: 0 solid ;
}
</style>
