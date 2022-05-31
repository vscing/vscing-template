
<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
  NavBar as VantNavBar,
  Form as VantForm,
  Field as VantField,
  CellGroup as VantCellGroup,
  Radio as VantRadio,
  RadioGroup as VantRadioGroup,
  Button as VantButton,
  Toast
} from 'vant';
import { to } from '@/utils';
import { enterRestaurant } from '@/api/index';
import { useRouter } from 'vue-router';

const router = useRouter();

const onClickLeft = () => {
  router.go(-1);
};

const formData = reactive({
  restaurant_name: '',
  address: '',
  phone: '',
  is_chain: '',
  num: '',
  average_money: '',
});
const disable = ref(false)

const onSubmit = async() => {
  disable.value = true
  const [_, res] = await to(enterRestaurant({
    ...formData
  }));
  if(res) {
    Toast.success('提交成功，后续会有客服联系您')
    onClickLeft();
  }
  disable.value = false
};

</script>

<template>
  <VantNavBar class="nav-bar" title="餐饮合作" left-arrow @click-left="onClickLeft" safe-area-inset-top />
  <div>
    <VantForm @submit="onSubmit" class="biaodan">
      <VantCellGroup inset>
        <VantField
          v-model="formData.restaurant_name"
          name="餐厅名称"
          label="餐厅名称"
          placeholder="餐厅名称"
          :rules="[{ required: true, message: '请输入餐厅名称' }]"
          class="family"
        />
      </VantCellGroup>
      <VantCellGroup inset>
        <VantField
          v-model="formData.address"
          name="地址"
          label="地址"
          placeholder="地址"
          :rules="[{ required: true, message: '请输入地址' }]"
          class="address"
        />
      </VantCellGroup>
      <VantCellGroup inset>
        <VantField
          v-model="formData.phone"
          name="电话号码"
          label="电话号码"
          placeholder="电话号码"
          :rules="[{ required: true, message: '电话号码' }]"
          class="telephoneNumber"
        />
      </VantCellGroup>
       <VantCellGroup inset>
      <VantField name="radio" label="是否连锁店" class="multipleShop">
        <template #input>
          <VantRadioGroup v-model="formData.is_chain" direction="horizontal">
            <VantRadio name="1">是</VantRadio>
            <VantRadio name="2">否</VantRadio>
          </VantRadioGroup>
        </template>
      </VantField>
       </VantCellGroup>
      <VantCellGroup inset>
        <VantField
          v-model="formData.num"
          name="几家店面"
          label="几家店面"
          placeholder="几家店面"
          :rules="[{ required: true, message: '几家店面' }]"
          class="storeFront"
        />
      </VantCellGroup>
      <VantCellGroup inset>
        <VantField
          v-model="formData.average_money"
          name="人均消费"
          label="人均消费"
          placeholder="人均消费"
          :rules="[{ required: true, message: '人均消费' }]"
          class="consumption"
        />
      </VantCellGroup>
      <div style="margin: 16px">
        <VantButton round block type="primary" native-type="submit" class="certain"> 提交 </VantButton>
      </div>
    </VantForm>
  </div>
</template>
<style scoped>
.van-cell-group {
  border-radius: 5px;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #eaeaea;
}
.van-cell-group {
  margin-top: 10px;
}
:deep(.van-field__label){
  color: #2196f3;
}
:deep(.van-radio__label){
  color: #2196f3;
}
.biaodan{
  height: 100vh;
  padding-top: 20px;
}
</style>
