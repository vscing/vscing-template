<script setup lang="ts">
  import { 
    NavBar as VantNavBar,
    Cell as VantCell, 
    CellGroup as VantCellGroup,
    Popup,
    Picker,
    Field,
Toast
  } from 'vant';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  import { editUserInfo } from '@/api/user';
import { to } from '@/utils';
  
  const router = useRouter();
  const userStore = useUserStore();
  let userInfo = userStore.getUserInfo || {}
  const onClickLeft = () => router.go(-1);

  const nickname = ref(userInfo.nickname ?? '');
  const result = ref('未设置');
  const showPicker = ref(false);
  const columns = ['男', '女'];

  const init = () => {
    if(userInfo.sex == 1) {
      result.value = '男'
    } else if(userInfo.sex == 2) {
      result.value = '女'
    }
  }

  init();
  
  const onConfirm = (value) => {
    result.value = value;
    showPicker.value = false;
  };

  const onSave = async() => {
    const [_, res] = await to(editUserInfo({
      nickname: nickname.value,
      sex: result.value === '男' ? 1 : (result.value === '女' ? 2:0),
      desc: userInfo.desc ?? ''
    }));
    if(res) {
      userInfo.nickname = nickname.value;
      userInfo.sex = result.value === '男' ? 1 : (result.value === '女' ? 2:0);
      userStore.setUserInfo(userInfo);
      Toast.success('更新成功');
    }
  }
</script>
<template>
  <VantNavBar
    class="nav-bar"
    title="编辑资料"
    left-arrow
    @click-left="onClickLeft"
  />
  <VantCellGroup style="margin-top: 0.8rem;">
    <Field label="我的昵称" clearable v-model="nickname" is-link/>
    <Field
        v-model="result"
        is-link
        readonly
        name="picker"
        label="性别"
        @click="showPicker = true"
    />
    <VantCell title="简介" :value="userInfo.desc" to="/editBrief" is-link/>
  </VantCellGroup>

  <Popup v-model:show="showPicker" position="bottom">
    <Picker
      :columns="columns"
      @confirm="onConfirm"
      @cancel="showPicker = false"
    />
  </Popup>

  <div class="logout" tyle="margin: 20px;" @click="onSave()">
    保存
  </div>
  
</template>

<style lang="less" scoped>
.nav-bar {  
  width: 100%;
  :deep(.van-icon) {
    color: #000000;
  }
  :deep(.van-nav-bar__title) {
    color: #000000;
  }
}
.logout {
  width: 342px;
  line-height: 36px;
  height: 36px;
  font-size: 14px;
  text-align: center;
  color: #fff;
  // background: linear-gradient(90deg,#8be9e9,#01c2c3);
  background-color:#01c2c3;
  border-radius: 23px;
  cursor: pointer;
  position: absolute;
  bottom: 150px;
  left: calc(50% - 171px);
}
</style>
