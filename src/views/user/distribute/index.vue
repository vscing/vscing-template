<script setup lang="ts">
import {
  Cell as VantCell,
  CellGroup as VantCellGroup
} from 'vant';
import { ref } from 'vue';
import { getNum } from '@/api/distribute';
import { getPayInfo } from '@/api/pay';
import { to } from '@/utils';

const payInfo = ref<any>({});

const init = async () => {
  const [_, res] = await to(getPayInfo())
  if (res) {
    payInfo.value = res.payInfo || {}
  }
}
init();

const num = ref(0);

const init2 = async () => {
  const [_, res] = await to(getNum());
  if (res) {
    num.value = res.data
  }
}

init2();


</script>
<template>
  <div class="distribute-moneny">
    <!-- <div class="distribute-moneny-item">
      <p>累计佣金</p>
      <h1>¥ {{ payInfo.distributTotalMoney }}</h1>
    </div> -->
    <div class="distribute-moneny-item">
      <p>邀请人数</p>
      <h1>{{ num }}</h1>
    </div>
  </div>

  <VantCellGroup class="distribute-list">
    <!-- <VantCell title="分销订单" is-link to="/distribute/order" /> -->
    <VantCell title="邀请码" is-link to="/distribute/wechat" />
  </VantCellGroup>
</template>

<style lang="less" scoped>
.distribute-moneny {
  background-color: #ffffff;
  height: 130px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20px;
  .distribute-moneny-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
}
</style>
