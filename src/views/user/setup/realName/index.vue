<script setup lang="ts">
import {
  NavBar as VantNavBar,
  CellGroup as VantCellGroup,
  Form as VantForm,
  Field as VantField,
  Button as VantButton,
  Empty as VantEmpty,
  Toast,
  Dialog
} from 'vant';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { addIdCard } from '@/api/user';
import { setAuth, checkAuth } from '@/api/pay';
import { Images } from '@/assets/images';
import { to } from '@/utils';

const userStore = useUserStore();
let userInfo = userStore.getUserInfo || {}

const username = ref('');
const idcard = ref('');
const router = useRouter();
const onClickLeft = () => router.go(-1);

const onSubmit = async () => {
  const [_, res] = await to(addIdCard({
    'id_number': idcard.value,
    'real_name': username.value
  }));
  if (res) {
    Toast.success(res.message);
    userInfo['is_name'] = true;
    userStore.setUserInfo(userInfo);
  }
}

const init = async () => {
  const [_, res] = await to(setAuth({
    type: 1
  }))
  // const div = document.createElement('div')
  // /* 此处form就是后台返回接收到的数据 */
  // div.innerHTML = res.form
  // document.body.appendChild(div)
  // document.forms['alipay_submit'].submit()
  let divForm = document.getElementsByTagName('divform')
  if (divForm.length) {
    document.body.removeChild(divForm[0])
  }
  const div: any = document.createElement('divform')
  div.innerHTML = res.form
  document.body.appendChild(div)
  document.getElementById('alipay_submit')?.submit();
}

const initCheckAuth = async() => {
  const [_, res] = await to(checkAuth({
    type: 1
  }));
  if(res) {
    init()
  }
}

if(!userInfo['is_name']) {
  Dialog.confirm({
    title: '提示',
    message:'实名认证需要缴纳1元，是否确认跳转支付宝支付？',
  })
  .then(() => {
    initCheckAuth();
  })
  .catch(() => {
    onClickLeft();
  });
}

</script>
<template>
  <div class="setup">
    <VantNavBar class="nav-bar" title="实名认证" left-arrow @click-left="onClickLeft" />
    <div class="modal-show">
      <VantEmpty v-if="userInfo['is_name']" :image="Images.auth" description="已实名认证" />
      <VantForm v-else @submit="onSubmit">
        <VantCellGroup>
          <VantField
            v-model="username"
            clearable
            name="姓名"
            label="姓名"
            placeholder="请填写您的真实姓名"
            :rules="[{ required: true, message: '请填写您的真实姓名' }]"
          />
          <VantField
            v-model="idcard"
            clearable
            name="身份证号  "
            label="身份证号"
            placeholder="请填写您的身份证号"
            :rules="[{ required: true, message: '请填写您的身份证号' }]"
          />
        </VantCellGroup>
        <div class="tips"> 应国家法律法规要求，购买前请完成实名认证。实名认证完成后，您的提现账户将与此实名信息进行绑定，请知晓！ </div>
        <div class="tips" style="color: #ff0000;"> 实名认证一经审核通过，非平台认可的法定事由不得修改 </div>
        <div class="saveData">
          <VantButton round block native-type="submit">
            保存
          </VantButton>
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
.tips {
  font-size: 12px;
  font-weight: 400;
  color: rgba(0,0,0,.4);
  padding: 20px 20px 0;
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
