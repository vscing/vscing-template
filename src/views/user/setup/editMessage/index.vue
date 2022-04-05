<script setup lang="ts">
  import { 
    NavBar as VantNavBar,
    Cell as VantCell, 
    CellGroup as VantCellGroup,
    Popup,
    Picker,
    Field
  } from 'vant';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  
  const router = useRouter();
  const userStore = useUserStore();
  let userInfo = userStore.getUserInfo || {}
  console.log('%c [ userInfo ]-17', 'font-size:13px; background:pink; color:#bf2c9f;', userInfo)
  const onClickLeft = () => router.go(-1);

  const nickname = ref(userInfo.nickname);
  const result = ref('未设置');
  const showPicker = ref(false);
  const columns = ['男', '女'];

  const onConfirm = (value) => {
      result.value = value;
      showPicker.value = false;
  };
  

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

  <div class="logout" tyle="margin: 20px;">
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
  font-size: .28rem;
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
