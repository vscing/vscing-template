<script setup lang="ts">
import { ref } from 'vue';
import { rankingList } from '@/api/market';
import { to } from '@/utils';
import { useRouter } from 'vue-router';
import {
  NavBar as VantNavBar
} from 'vant';
  
const router = useRouter();
const onClickLeft = () => router.go(-1);

const list = ref([]);

const init = async() => {
  const [_, res] = await to(rankingList());
  if(res) {
    list.value = res.list || [];
  }
}

init();
</script>

<template>
  <VantNavBar class="nav-bar" title="排行榜" left-arrow @click-left="onClickLeft" />
  <div class="ranking">
    <div class="ranking-headers">
      <div class="ranking-header-one">
        <span>排名</span>
        <span>用户ID</span>
        <span>数量</span>
      </div>
      <ul class="ranking-header">
        <li class="ranking-header-two" v-for="(item, index) in list" :key="index">
          <p>
            <span v-show="index < 3" :class="`itemli${index}`"></span>
            <span v-show="index > 2" class="item-ranking">{{ index + 1 }}</span>
          </p>
          <p>{{ item.nickname }}</p>
          <p>{{ item.num }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style  lang="less" scoped>
.ranking {
  min-height: 100vh;
  margin: 0;
  background-image: url('@/assets/images/ranking/ranking.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .ranking-headers{
    padding-top: 350px;
  }
  .ranking-header-one {
    color: #000;
    display: flex;
    justify-content: space-around;
    margin: 0 24px;
    height: 60px;
    font-size: 18px;
    margin: 0px;
    span {
      width: 109px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .ranking-header{
    display: block;
    height: 330px;
    overflow-x: hidden;
    overflow-y: scroll;
    .ranking-header-two {
      font-size: 16px;
      margin: 0 24px;
      height: 50px;
      display: flex;
      flex-flow: wrap nowrap;
      text-decoration: none;
      text-align: center;
      p {
        list-style: none;
        width: 108px;
        height: 50px;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          width: 108px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      &:nth-child(2n + 1) {
        // background-color: rgb(165, 158, 158);
        background-color: rgba(151, 144, 144, 0.2);
      }
    }
  }
}
.itemli0 {
  background-image: url('@/assets/images/ranking/icon_one.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 45px 30px;
  display: block;
}
.itemli1 {
  background-image: url('@/assets/images/ranking/icon_two.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 45px 30px;
  display: block;
}
.itemli2 {
  background-image: url('@/assets/images/ranking/icon_three.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 45px 30px;
  display: block;
}
.item-ranking {
  opacity: 0.5;
  font-weight:900;
}
.ranking-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  color: #f5f5f5;
}
</style>
