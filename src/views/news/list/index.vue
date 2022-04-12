<script setup lang="ts">
  import { ref } from 'vue';
  import { Tabs as VantTabs, Tab as VantTab, List as VantList, Image as VantImage, Icon as VantIcon } from 'vant';
  import { useRouter } from 'vue-router';

  const loading = ref<boolean>(false);
  const finished = ref<boolean>(true);
  const active = ref<number>(0);
  const actives = ref<number>(0);

  const router = useRouter();

  const onDetail = () => {
    router.push('/news/detail')
  }

  const onLoad = () => {}

</script>

<template>
  <VantTabs class="tabs-box" v-model:active="active">
    <VantTab title="最新活动">
        <VantList
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
            <ul class="product-list">
                <li class="product-data" v-for="(item, index) in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]" :key="index">
                    <div class="product-img"><img class="swiper-img" src="https://theoneart-common.oss-cn-qingdao.aliyuncs.com/author/2535e32ac8848c5b591b8f5a3cd1d6ad1649767552807.jpg" width="174.22" height="104.53"/></div>
                    <div class="product-desc">「萌芽熊冬雪季系列数字藏品」快照时间说明</div>
                    <div class="product-time">2022/04/12 20:45:12</div>
                </li>
            </ul>
        </VantList>
    </VantTab>
    <VantTab title="合成策略">
        <div class="explain">
              <VantList
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                  <VantTabs v-model:active="actives" type="card">
                    <VantTab title="玩法一">内容 1</VantTab>
                    <VantTab title="玩法二">内容 2</VantTab>
                    <VantTab title="玩法三">内容 3</VantTab>
                    <VantTab title="玩法四">内容 3</VantTab>
                  </VantTabs>
              </VantList>
        </div>
    </VantTab>
    <VantTab title="客服帮助"></VantTab>
  </VantTabs>
</template>

<style lang="less" scoped>
  .tabs-box {
    :deep(.van-tabs__line) {
      background-color: #01c2c3;
    }
  }
  .explain{
        background: #CBB895;
        height: 1000px;
        :deep(.van-tab--card.van-tab--active){
          background-color: #ffffff;
          height:80px;
          border-radius: 10px;
        }
        :deep(.van-tab--card.van-tab--active){
          color: #0E0B20;
        }
        :deep(.van-tabs__nav--card){
          height:50px;
          border: none;
        }
        :deep(.van-tabs--card>.van-tabs__wrap){
          height:50px;
        }
  }
  .product-list {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    margin-top: 20px;
    margin-bottom: 10px;
    padding: 0 10px;
    .product-data{
      width: 50%;
      display: flex;
      flex-flow: column wrap;
      .product-img{
          display: flex;
          justify-content: center;
          .swiper-img{
             border-radius: 4px;
          }
      }
      .product-desc{
          width: 150px;
          padding-top: 25px;
          margin: 0 auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
      }
      .product-time{
          display: flex;
          justify-content: center;
          padding: 20px 0;
          font-size: 12px;
          font-weight: 400;
          color: rgba(0,0,0,.4);
      }
    }
  }
</style>
