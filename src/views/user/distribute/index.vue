<script setup lang="ts">
import { getPayInfo } from '@/api/pay';
import { to } from '@/utils';
import {
  Cell as VantCell,
  CellGroup as VantCellGroup
} from 'vant';
import { ref } from 'vue';

const payInfo = ref<any>({});

const init = async () => {
  const [_, res] = await to(getPayInfo())
  if (res) {
    payInfo.value = res.payInfo || {}
  }
}
init();


</script>
<template>
  <div class="distribute-moneny">
    <p>累计佣金</p>
    <h1>¥ {{payInfo.distributTotalMoney}}</h1>
  </div>

  <VantCellGroup class="distribute-list">
    <VantCell title="分销订单" is-link to="/distribute/order" />
    <VantCell title="邀请码" is-link to="/distribute/wechat" />
    </VantCellGroup>
</template>

<style lang="less" scoped>
.distribute-moneny {
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
