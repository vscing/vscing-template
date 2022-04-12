<script setup lang="ts">
import {
  NavBar as VantNavBar,
  Form as VantForm,
  Field as VantField,
  Button as VantButton,
  Toast
} from 'vant';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { setPaasWord } from '@/api/user';
import { to } from '@/utils';

const formData = reactive({
  password: '',
  confirmPassword: ''
});
const router = useRouter();
const onClickLeft = () => router.go(-1);

const onSubmit = async() => {
  const [_, res] = await to(setPaasWord(formData));
  if(res) {
    Toast.success('设置成功');
    onClickLeft();
  }
}

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
          <div class="saveData">
            <VantButton round block native-type="submit">
              保存
            </VantButton>
          </div>
      </VantForm>
    </div>
  </div>
</template>

