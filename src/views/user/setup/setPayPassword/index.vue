<script setup lang="ts">
  import { 
    NavBar as VantNavBar,
    CellGroup as VantCellGroup,
    Form as VantForm,
    Field as VantField
  } from 'vant';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const password = ref();
  const router = useRouter();
  const onClickLeft = () => router.go(-1);

</script>
<template>
  <div class="setup">
      <VantNavBar
        class="nav-bar"
        title="设置支付密码"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="modal-show">
            <VantForm>
                <VantCellGroup>
                    <VantField
                        v-model="password"
                        clearable
                        name="原密码"
                        label="原密码"
                    />
                    <VantField
                        v-model="password"
                        clearable
                        name="现在密码"
                        label="现在密码"
                        placeholder="请设置现在密码"
                    />
                </VantCellGroup>
            </VantForm>
            <div class="saveData" style="margin: 20px;">保存</div>
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
.saveData{
  width: 342px;
  line-height: 36px;
  height: 36px;
  font-size: .28rem;
  text-align: center;
  color: #fff;
  background-color:#01c2c3;
  border-radius: 23px;
  position: absolute;
  top: 170px;
}
</style>
