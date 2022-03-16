<script setup lang="ts">
  import { 
    NavBar as VantNavBar,
    Cell as VantCell, 
    CellGroup as VantCellGroup
  } from 'vant';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const onClickLeft = () => router.go(-1);
  

</script>
<template>
  <VantNavBar
    class="nav-bar"
    title="设置"
    left-arrow
    @click-left="onClickLeft"
  />

  <VantCellGroup title="基本信息">
    <VantCell title="个人信息" value="编辑资料" is-link/>
  </VantCellGroup>
  <VantCellGroup title="安全设置">
    <VantCell title="实名认证" value="认证" is-link/>
    <VantCell title="设置支付密码" value="设置" is-link/>
    <VantCell title="手机号" value="设置" is-link/>
    <VantCell title="邮箱" value="设置" is-link/>
  </VantCellGroup>

  <div class="logout" tyle="margin: 20px;">
    退出登录
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
    margin-top: 20px;
    text-align: center;
    color: #5a5f6d;
    font-size: 12px;
  }
</style>
