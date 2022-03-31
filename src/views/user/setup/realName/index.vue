<script setup lang="ts">
import {
  NavBar as VantNavBar,
  CellGroup as VantCellGroup,
  Form as VantForm,
  Field as VantField,
  Button as VantButton,
  Empty as VantEmpty,
  Toast
} from 'vant';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { addIdCard } from '@/api/user';
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
  if (res?.code == 0) {
    Toast.fail(res.message);
    userInfo['is_name'] = true;
    userStore.setUserInfo(userInfo);
  }
}
</script>
<template>
  <div class="setup">
    <VantNavBar class="nav-bar" title="实名认证" left-arrow @click-left="onClickLeft" />
    <div class="modal-show">
      <VantEmpty v-if="userInfo['is_name']" description="已认证" />
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
.saveData {
  padding: 0 20px;
  margin-top: 53px;
  & > button {
    font-size: 0.28rem;
    color: #fff;
    background-color: #01c2c3;
    border: 0;
  }
}
</style>
