<script setup lang="ts">
import {
  NavBar as VantNavBar,
  Form as VantForm,
  Field as VantField,
  Button as VantButton,
  Toast,
  Dialog
} from 'vant';
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import { setSend, onNetwork } from '@/api/goods';
import { to } from '@/utils';

const disabled = ref(false);
const formData = reactive({
  price: ''
});
const router = useRouter();
const onClickLeft = () => router.go(-3);

const route = useRoute();
const { id } = route.query || {}

const onSubmit = async() => {
  if(Number(formData.price) > 100000) {
    Toast.fail('产品最高金额10万')
    return 
  }
  disabled.value = true;
  const [_, data] = await to(onNetwork());
  if(data) {
    Dialog.confirm({
      title: '提示',
      message: '手续费6%，4%版权交易费直接扣除',
    })
    .then(async() => {
      const [_, res] = await to(setSend({
        id: id,
        goods_price: formData.price
      }));
      if(res) {
        Toast.success('产品发布成功')
        onClickLeft()
      }
    })
    .catch(() => {
      // on cancel
    });
    disabled.value = false;
  } else {
    disabled.value = false;
    Toast.fail('入网失败，联系客服')
  }
}
</script>
<template>
  <div class="setup">
    <VantNavBar class="nav-bar" title="设置产品金额" left-arrow @click-left="onClickLeft" />
    <div class="modal-show">
      <VantForm @submit="onSubmit">
        <VantField
          v-model="formData.price"
          clearable
          type="number"
          name="price"
          maxlength="6"
          label="产品金额"
          placeholder="请填写产品金额"
          :rules="[{ required: true, message: '请填写产品金额' }]"
        />
        <div class="saveData">
          <VantButton round block :disabled="disabled" native-type="submit">
            发布
          </VantButton>
        </div>
      </VantForm>
    </div>
  </div>
</template>

