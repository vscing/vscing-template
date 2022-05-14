<script setup lang="ts">
import {
  NavBar as VantNavBar,
  Icon as VantIcon,
  Button as VantButton,
  Toast
} from 'vant';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getBankCard, defaultBankCard, deleteBankCard } from '@/api/bank';
import { to } from '@/utils';

const router = useRouter();
const list = ref<any[]>([]);

const onClickLeft = () => router.go(-1);

const init = async() => {
  const [_, res] = await to(getBankCard());
  if(res) {
    list.value = res.list || []
  }
}
init()

const onDefault = async(id: number) => {
  const [_, res] = await to(defaultBankCard({
    id
  }));
  if(res) {
    Toast.success('设置成功');
    init()
  }
}

const onDelete = async(id: number) => {
  const [_, res] = await to(deleteBankCard({
    id
  }));
  if(res) {
    Toast.success('解绑成功');
    init()
  }
}

const onAdd = () => router.push('/bankCard/add');
</script>

<template>
  <VantNavBar class="nav-bar" title="银行卡列表" left-arrow @click-left="onClickLeft" />
  <div class="cardTitle">
    <h1>全部</h1>
    <p>默认银行卡为支付和提现银行卡</p>
  </div>
  <ul class="cardList">
    <li class="cardItem" v-for="item in list" :key="item.id">
      <div class="content">
        <span>{{item.address}}</span>
        <span>{{item.number}}</span>
        <VantIcon name="success" size="30" v-if="item.isDefault === 1"/>
      </div>
      <div class="operate">
        <div class="btn" @click="onDefault(item.id)"> 设定默认 </div>
        <div class="btn" @click="onDelete(item.id)"> 解绑 </div>
      </div>
    </li>
  </ul>
  <div class="saveData" @click="onAdd">
    <VantButton round block>
      绑定新卡
    </VantButton>
  </div>
</template>

<style scoped lang="less">
.cardTitle {
  padding: 15px;
  display: flex;
  align-items: center;
  h1 {
    font-size: 16px;
  }
  p {
    margin-left: 20px;
    font-size: 14px;
    color: #ff0000;
  }
}
.cardItem {
  background-color: #ffffff;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  margin-bottom: 15px;
  font-size: 14px;
  .content {
    flex: 1;
    color: #000;
    display: flex;
    align-items: center;
    & > span {
      margin-right: 15px;
    }
    :deep(.van-icon){
      color: #01c2c3;
    }
  }
  .operate {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .btn {
      padding-top: 15px;
      margin-left: 30px;
      color: #397fe7;
    }
  }
}
.saveData {
  padding: 0 20px;
  margin-top: 53px;
  & > button {
    font-size: 14px;
    color: #fff;
    background-color: #01c2c3;
    border: 0;
  }
}
</style>

