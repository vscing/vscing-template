<script setup lang="ts">
import {
  CellGroup as VantCellGroup,
  Form as VantForm,
  Field as VantField,
  Button as VantButton,
  Checkbox as VantCheckbox,
  Overlay as VantOverlay,
  Toast
} from 'vant';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { Images } from '@/assets/images';
import { useUserStore } from '@/store/modules/user';
import { getCode, login, getCodeImage, checkCodeImage } from '@/api/user';
import { to } from '@/utils';
import Captcha from '@/components/captcha';
import storage from 'store';
import '@/components/captcha/src/style'

const formRef = ref<any>(null);
const phone = ref('');
const code = ref('');
const sendSms = ref(true);
const captcha = ref(null);
const show = ref(false);
const verifyParams = ref({
  key: '',
  id: ''
});

const img = ref('');
const key = ref('');
const captchaCode = ref(0);
const times = ref(120);
const checked = ref(false);
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

let timer: NodeJS.Timer;

const url = storage.get('authUrl') || '/';
console.log(url)

const sendCode = async() => {
  try {
    await formRef.value?.validate('phone');
  } catch(e) {
    return false;
  }

  if(sendSms.value && times.value === 120) {
    const [_, res] = await to(getCode({
      phone: phone.value,
      captchaCode: captchaCode.value,
      key: key.value
      // key: verifyParams.value?.key || ''
    }));
    if(res) {
      Toast.success('发送成功');
      show.value = false
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

const user_id = route.query?.user_id || 0;
console.log('%c [ user_id ]-60', 'font-size:13px; background:pink; color:#bf2c9f;', user_id)

const onSubmit = async () => {
  const [_, res] = await to(login({
    phone: phone.value,
    code: code.value,
    user_id: user_id
  }));
  if (res) {
    Toast.success('登录成功');
    userStore.setToken(res?.token);
    // userStore.setUserInfo(res?.userInfo);
    // router.replace(url);
    router.replace('/user');
  }
}

const onAgree = (type = 0) => {
  router.push('/agree?type='+type)
}

const validatePhone = (val: string) => /^1(3|4|5|6|7|8|9)\d{9}$/.test(val)

const init = async(val = false) => {
  const [_, res] = await to(getCodeImage());
  if(res){
    console.log('%c [ res ]-96', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    img.value = res.data.img
    key.value = res.data.key
  }
  show.value = val
}
init()

const onCheck = () => {
  if(!key.value || !captchaCode.value) {
    Toast.fail('请输入校验值');
    return 
  }
  sendCode()
}

// const onCaptchaInit = (val) => {
//   verifyParams.value = val
// }

// const onCaptchaSuccess = (val) => {
//   captcha.value?.reset();
//   show.value = false;
//   sendCode();
// }
</script>

<template>
  <div class="login">
    <div class="loginImage">
      <img :src="Images.logo"/>
    </div>
    <!-- <VantOverlay :show="show" @click="show = false">
      <div class="captcha" @click.stop>
        <Captcha
          ref="captcha"
          init-action="https://api.ysxqbjz.com/api/user/captchaInit"
          check-action="https://api.ysxqbjz.com/api/user/captchaCheck" 
          verify-action="https://api.ysxqbjz.com/api/user/captchaVerify"
          :verifyParams="verifyParams"
          @init="onCaptchaInit"
          @success="onCaptchaSuccess"
        />
      </div>
    </VantOverlay> -->
    <VantOverlay :show="show" @click="show = false">
      <div class="captcha-box" @click.stop>
        <VantField v-model="captchaCode" type="number">
          <template #button>
            <img :src="img" style="height: auto; width: 100px;" @click="init(true)"/>
          </template>
        </VantField>
        <VantButton type="primary" style="margin-top: 60px;" @click="onCheck">发送短信</VantButton>
      </div>
      
    </VantOverlay>

    
    

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
            <!-- <span v-show="sendSms" class="smsCode" @click="sendCode">发送验证码</span> -->
            <span v-show="sendSms" class="smsCode" @click="init(true)">发送验证码</span>
            <span v-show="!sendSms" class="smsCode" disabled>{{times}}s后重新发送</span>
          </template>
        </VantField>
      </VantCellGroup>
      <div class="saveData">
        <VantButton round block native-type="submit" :disabled="!checked" :class="{'disableBtn': !checked}">登录</VantButton>
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
.captcha {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 48vh;
}
:deep(.mi-captcha-content) {
  width: 100% !important;
}
.captcha-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 35vh;
}
</style>
