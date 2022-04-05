<script setup lang="ts">
  import { 
    NavBar as VantNavBar,
    Cell as VantCell, 
    CellGroup as VantCellGroup,
    Toast
  } from 'vant';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';

  const router = useRouter();
  const userStore = useUserStore();
  const onClickLeft = () => router.go(-1);

  const onLogout = async() => {
    Toast.success('退出成功');
    userStore.logout(true);
  }
</script>
<template>
  <div class="setup">
      <VantNavBar
        class="nav-bar"
        title="设置"
        left-arrow
        @click-left="onClickLeft"
      />

      <VantCellGroup title="基本信息">
        <VantCell title="个人信息" value="编辑资料" is-link to="/editMessage" />
      </VantCellGroup>
      <VantCellGroup title="安全设置">
        <VantCell title="实名认证" value="认证" is-link  to="/realName"/>
        <VantCell title="设置支付密码" value="设置" is-link to="/setPayPassword"/>
        <!-- <VantCell title="手机号" value="设置" is-link to="/phoneNumber"/> -->
      </VantCellGroup>

      <div class="logout" @click="onLogout">
        退出登录
      </div>
  </div>
</template>

<style lang="less" scoped>
.setup{
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
.logout {
  width: 342px;
  line-height: 36px;
  height: 36px;
  text-align: center;
  color: #5a5f6d;
  font-size: 12px;
  color: #fff;
  background-color:#01c2c3;
  border-radius: 23px;
  margin: 50px auto;
}
</style>
