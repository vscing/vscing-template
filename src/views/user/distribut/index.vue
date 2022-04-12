<script setup lang="ts">
  import { 
    Cell as VantCell, 
    CellGroup as VantCellGroup
  } from 'vant';
  // import { useRouter } from 'vue-router';

  // const router = useRouter();
  // const onTearm = () => {
  //     router.push('/myTearm')  
  // }
  // const onOrder = () => {
  //     router.push('/order')  
  // }
  // const onWechat = () => {
  //     router.push('/wechat')  
  // }
  // const onStatis = () => {
  //     router.push('/statics')  
  // }
</script>
<template>
  <div class="distribut-moneny">
    <p>累计佣金</p>
    <h1>¥ 0.00</h1>
  </div>

  <VantCellGroup class="distribut-list">
    <VantCell title="我的团队" is-link />
    <VantCell title="分销订单" is-link />
    <VantCell title="邀请码" is-link />
    <!-- <VantCell title="业绩统计" is-link /> -->
  </VantCellGroup>
</template>

<style lang="less" scoped>
  .distribut-moneny {
    background-color: #ffffff;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    p {
      font-size: 12px;
      font-weight: 400;
      color: #5a5f6d;
    }
    h1 {
      font-size: 24px;
      font-weight: bold;
      color: #01c2c3;
    }
  }
</style>
