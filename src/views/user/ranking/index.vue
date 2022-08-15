<script setup lang="ts">
import { ref, watch } from 'vue';
import { rankingList } from '@/api/market';
import { to } from '@/utils';
import { Images } from '@/assets/images';
import {
  Image as VantImage,
} from 'vant';

const type = ref<number>(1);
const list = ref<any[]>([]);

const init = async() => {
  const [_, res] = await to(rankingList({
    type: type.value
  }));
  if(res) {
    list.value = res.list || [];
  }
}
init();

const onTab = (val:number) => {
  type.value = val;
}

watch(
  () => type.value,
  (news, olds) => {
    if(news != olds) {
      init()
    }
  }
)
</script>

<template>
  <!-- <VantNavBar class="nav-bar" title="排行榜" left-arrow @click-left="onClickLeft" /> -->
  <div class="ranking">
    <VantImage :src="Images.ranking2"/>
    <div class="ranking-tab">
      <span @click="onTab(1)" class="tab-item" :class="{ active: type == 1 }"
        >持有臧品排行榜</span
      >
      <span @click="onTab(2)" class="tab-item" :class="{ active: type == 2 }"
        >平台消费排行榜</span
      >
    </div>
    <div class="ranking-rule">
      <h2>排行榜规则</h2>
      <p v-show="type == 1">
        <ul>
          <li>本次持仓榜活动藏品为川·宫保鸡丁 关兴+川星球·毛血旺！</li>
          <li>活动时间：2022年8月9日14:00-8月16日14:00</li>
          <li>活动规则：只计算活动藏品的数量，其他藏品不计，以总持有量排名</li>
        </ul>
      </p>
      <p v-show="type == 2">
        <ul>
          <li>活动藏品：平台寄售市场所有藏品</li>
          <li>活动时间：2022年8月9日14:00-8月16日14:00</li>
          <li>活动规则：在活动时间内购买平台藏品，均可获得打榜积分，比例为1:1，如发现购买藏品价格虚标所获积分，直接不予算成绩</li>
          <li>榜单更新：每10分钟进行榜单更新</li>
        </ul>
      </p>
    </div>
    <div class="ranking-box">
      <div class="ranking-title">- 排行榜 -</div>
      <div class="ranking-headers">
        <div class="ranking-header-one">
          <span>排名</span>
          <span>用户ID</span>
          <span>{{type == 1 ? '数量':'积分'}}</span>
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
      <div class="ranking-footer">仅展示前10名</div>
    </div>
  </div>
</template>

<style  lang="less" scoped>
.ranking {
  min-height: 100vh;
  background-color: #0c053d;
  .ranking-headers{
    margin: 0 20px;
    background: #ffffff;
    border-radius: 5px;
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
      // margin: 0 24px;
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
.ranking-tab {
  display: flex;
  align-items: center;
  color: #ffffff;
  border-radius: 4px;
  margin: 10px;
  .tab-item {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    font-size: 16px;
    border: 1px solid #6702fe;
  }
  .active {
    background: #6702fe;
  }
}
.ranking-rule {
  background-color: #241d6d;
  border-radius: 8px;
  margin: 40px 10px 10px;
  padding: 10px;
  color: #ffffff;
  position: relative;
  h2 {
    display: block;
    width: 100px;
    padding: 8px 0;
    background-color: #241d6d;
    box-shadow: 0px 0px 3px 0px #0c053d;
    position: absolute;
    left: 50%;
    top: -20px;
    transform: translateX(-50%);
    text-align: center;
    box-shadow: 2px;
    border-radius: 0 0 10px 10px;
  }
  p {
    padding-top: 15px;
    line-height: 22px;
    font-size: 14px;
  }
}
.ranking-box {
  margin: 20px 10px 0;
  background-color: #241d6d;
  border-radius: 8px;
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
.ranking-title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  color: #f5f5f5;
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
