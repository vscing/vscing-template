<script setup lang="ts">
import {
  CellGroup as VantCellGroup,
  Form as VantForm,
  Field as VantField,
  Button as VantButton,
  Checkbox as VantCheckbox,
  Toast
} from 'vant';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Images } from '@/assets/images';
import { useUserStore } from '@/store/modules/user';
import { getCode, login } from '@/api/user';
import { to } from '@/utils';
import storage from 'store';

const formRef = ref<any>(null);
const phone = ref('');
const code = ref('');
const sendSms = ref(true);
const times = ref(120);
const checked = ref(false);
const router = useRouter();
const userStore = useUserStore();

let timer: NodeJS.Timer;

const url = storage.get('authUrl') || '/';

const sendCode = async() => {
  try {
    await formRef.value?.validate('phone');
  } catch(e) {
    return false;
  }

  if(sendSms.value && times.value === 120) {
    const [_, res] = await to(getCode({
      phone: phone.value
    }));
    if(res) {
      Toast.success('发送成功');
      sendSms.value = false;
      timer = setInterval(()=>{
        times.value--;
        if(times.value === 0){
          sendSms.value = true;
          times.value = 120;
          clearInterval(timer);
        }
      },1000)
    }
  }
}


const onSubmit = async () => {
  const [_, res] = await to(login({
    phone: phone.value,
    code: code.value
  }));
  if (res) {
    Toast.success('登录成功');
    userStore.setToken(res?.token);
    userStore.setUserInfo(res?.userInfo);
    router.replace(url);
  }
}

const onAgree = (type = 0) => {
  router.push('/agree?type='+type)
}

const validatePhone = (val: string) => /^1(3|4|5|6|7|8|9)\d{9}$/.test(val)
</script>

<template>
  <div class="login">
    <div class="loginImage">
      <img :src="Images.logo"/>
    </div>
    
    <VantForm ref="formRef" @submit="onSubmit">
      <VantCellGroup>
        <VantField
          name="phone"
          v-model="phone"
          clearable
          placeholder="请输入手机号"
          :rules="[{ validator: validatePhone, message: '请输入正确手机号' }]"
        />
        <VantField
          name="code"
          v-model="code"
          clearable
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请输入验证码' }]"
        >
          <template #button>
            <span v-show="sendSms" class="smsCode" @click="sendCode">发送验证码</span>
            <span v-show="!sendSms" class="smsCode" disabled>{{times}}s后重新发送</span>
          </template>
        </VantField>
      </VantCellGroup>
      <div class="saveData">
        <VantButton round block native-type="submit" :disabled="!checked" :class="{'disableBtn': !checked}">保存</VantButton>
      </div>
    </VantForm>
    <div class="agreement">
      <VantCheckbox v-model="checked" checked-color="#01c2c3" icon-size="16px"/>
      <div>我已阅读并同意 <span class="blue" @click="onAgree(0)">《用户协议》</span> 和 <span class="blue" @click="onAgree(1)">《隐私政策》</span></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  height: 100vh;
  background-color: #ffffff;
  .loginImage {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
    img {
      height: 80px;
      width: auto;
    }
  }
  :deep(.van-form) {
    .smsCode {
      color: #397fe7;
    }
    .saveData {
      margin-top: 100px;
      padding: 0 20px;
      & > button {
        font-size: 12px;
        color: #fff;
        background-color: #01c2c3;
        border: 0;
      }
      .disableBtn {
        background: rgba(0,0,0,.2);
        color: #fff;
        opacity: 1;
      }
    }
  }
  .agreement {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    :deep(.van-checkbox) {
      margin-right: 5px;
    }
    .blue {
      color: #397fe7;
    }
  }
}
</style>
