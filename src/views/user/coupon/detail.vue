<script setup lang="ts">
import {
  NavBar as VantNavBar,
  Toast
} from "vant";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { getInfo } from '@/api/coupon';
import { to } from "@/utils";
import useClipboard from 'vue-clipboard3';

const router = useRouter();
const data = ref<any>({});

const onClickLeft = () => {
  router.go(-1);
};

const route = useRoute();
const { id=0 } = route.query || {}

const init = async () => {
  const [_, res] = await to(getInfo({id}));
  if (res) {
    data.value = res.data || {}
  }
}

init();

const { toClipboard } = useClipboard()

const copy = async (value: string) => {
  try {
    await toClipboard(value)
    Toast.success('复制成功')
  } catch (e) {
    console.error(e)
    Toast.fail('复制失败')
  }
}

</script>

<template>
  <VantNavBar class="nav-bar" title="优惠劵详情" left-arrow @click-left="onClickLeft" safe-area-inset-top />

  <div class="af">
    <div class="ff">
      <span>{{data.desc}}</span>
    </div>
    <div class="ff-f">
      <a :href="data.link" target="_bank">{{data.link}}</a>
      <span @click="copy(data.link)">复制</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.af {
  display: flex;
  margin: 20px;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.ff {
  display: block;
  margin: 10px 0;
}
.ff-f {
  display: block;
  width: 330px;
  height: 100px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  background-color: #fff;
}
.ff-f a {
  display: block;
  color: blue;
  width: 260px;
  margin: 10px;
}
.ff-f span {
  width: 60px;
  display: block;
  text-align: center;
  border-left: 1px solid #999;
  color: #00cccc;
}
</style>
