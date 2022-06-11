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
import { setSend } from '@/api/blind';
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
  Dialog.confirm({
    title: '提示',
    message: '持有创世华釜客户交易手续费3%，版权费4%。正常客户交易手续费5%，版权费4%。',
  })
  .then(async() => {
    const [_, res] = await to(setSend({
      id: id,
      blind_price: formData.price
    }));
    if(res) {
      Toast.success('盲盒发布成功')
      onClickLeft()
    }
    disabled.value = false;
  })
  .catch(() => {
    disabled.value = false;
  });
}
</script>
<template>
  <div class="setup">
    <VantNavBar class="nav-bar" title="设置盲盒金额" left-arrow @click-left="onClickLeft" />
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

