<script setup lang="ts">
import {
  NavBar as VantNavBar,
  Form as VantForm,
  Field as VantField,
  Button as VantButton,
  Toast
} from 'vant';
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import { getPaasWord, setPaasWord } from '@/api/user';
import { to } from '@/utils';

const formData = reactive({
  password: '',
  confirmPassword: '',
  idCard: '',
});
const router = useRouter();
const onClickLeft = () => router.go(-1);
const isBol = ref<boolean>(false);

const onSubmit = async() => {
  const [_, res] = await to(setPaasWord(formData));
  if(res) {
    Toast.success('设置成功');
    onClickLeft();
  }
}

const init = async() => {
  const [_, res] = await to(getPaasWord());
  if(res) {
    isBol.value = res.isBol
  }
}

init()

</script>
<template>
  <div class="setup">
    <VantNavBar class="nav-bar" title="设置支付密码" left-arrow @click-left="onClickLeft" />
    <div class="modal-show">
      <VantForm @submit="onSubmit">
        <VantField
          v-model="formData.password"
          clearable
          name="password"
          label="密码"
          placeholder="请填写密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <VantField
          v-model="formData.confirmPassword"
          clearable
          name="confirmPassword"
          label="确认密码"
          placeholder="请填写确认密码"
          :rules="[{ required: true, message: '请填写确认密码' }]"
        />
        <VantField
          v-model="formData.idCard"
          clearable
          name="idCard"
          label="身份证号"
          placeholder="请填写身份证号"
          :rules="[{ required: true, message: '请填写身份证号' }]"
        />
        <div class="saveData">
          <VantButton round block native-type="submit">
            {{isBol ? '修改密码':'保存密码'}}
          </VantButton>
        </div>
      </VantForm>
    </div>
  </div>
</template>

