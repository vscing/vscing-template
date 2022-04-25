<script setup lang="ts">
import {
  NavBar as VantNavBar,
  Form as VantForm,
  Field as VantField,
  Button as VantButton
} from 'vant';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { aliPay } from '@/api/user';
import { to } from '@/utils';

const router = useRouter();
const onClickLeft = () => router.go(-1);

const userStore = useUserStore();
let userInfo = userStore.getUserInfo

const formData = reactive<any>({
  alipay_account: userInfo['alipay_account'] ?? ''
});

const onSubmit = async() => {
  const [_, res] = await to(aliPay(formData));
  if(res) {
    userInfo['alipay_account'] = formData.alipay_account;
    userStore.setUserInfo(userInfo);
  }
};

console.log('%c [ userInfo ]-28', 'font-size:13px; background:pink; color:#bf2c9f;', userInfo)
</script>
<template>
  <div class="setup">
    <VantNavBar class="nav-bar" title="第三方支付" left-arrow @click-left="onClickLeft" />
    <div class="modal-show">
      <VantForm @submit="onSubmit">
        <!-- :readonly="userInfo.alipay_account ? true:false" -->
        <VantField
          v-model="formData.alipay_account"
          clearable
          name="支付宝账号"
          label="支付宝账号"
          placeholder="请输入支付宝账号"
        />
        <!--  v-if="!userInfo.alipay_account" -->
        <div class="saveData">
          <VantButton round block native-type="submit">保存</VantButton>
        </div>
      </VantForm>
    </div>
  </div>
</template>

<style lang="less" scoped>
.setup {
  .nav-bar {
    width: 100%;
    :deep(.van-icon) {
      color: #000000;
    }
    :deep(.van-nav-bar__title) {
      color: #000000;
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
