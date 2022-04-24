<script setup lang="ts">
import {
  NavBar as VantNavBar,
  Button as VantButton,
  Toast
} from 'vant';
import { ref } from 'vue';
import { getConfig } from '@/api/config';
import { to } from '@/utils';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();
const userInfo = userStore.getUserInfo;
const info = ref<string>('');
const disabled = ref<boolean>(true);
const num = ref<number>(2);

const router = useRouter();
const route = useRoute();
const { id } = route.query || {}

// const handleScroll = () => {
//   let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//   let clientHeight = document.documentElement.clientHeight;
//   let scrollHeight = document.documentElement.scrollHeight;
//   if (scrollTop + clientHeight >= scrollHeight - 80) {
//     console.log("滚动到底部了")
//     disabled.value = false;
//   }
// }

// onMounted(()=>{
//   window.addEventListener("scroll", handleScroll);
// });

// onUnmounted(()=>{
//   window.removeEventListener("scroll", handleScroll);
// })

const timer = setInterval(()=> {
  num.value = num.value - 1;
}, 1000)

setTimeout(()=>{
  disabled.value = false;
  clearInterval(timer);
}, 2000)

const init = async () => {
  const [_, res] = await to(getConfig({type: 2}));
  if(res) {
    info.value = res.data || ''
  }
}

init();

const goOrder = () => {
  if(userInfo){
    router.push(`/sell/order?id=${id}`)
  } else {
    Toast.fail('请登录')
  }
}
</script>

<template>
  <VantNavBar safe-area-inset-top fixed title="购买协议" />
  <div class="info" v-html="info"></div>
  <div class="agree-btn">
    <VantButton type="primary" :disabled="disabled" round block color="#01c2c3" @click="goOrder">
      同意协议 <span v-if="num > 0">({{num}})</span>
    </VantButton>
  </div>
</template>

<style lang="less" scoped>
.info {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 400;
  color: #666;
  line-height: 28px;
  padding-top: 60px;
  padding-bottom: 80px;
}
.agree-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 10px 20px;
  background-color: #ffffff;
}
</style>
