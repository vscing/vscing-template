<script setup lang="ts">
  import { 
    NavBar as VantNavBar,
    CellGroup as VantCellGroup,
    Form as VantForm,
    Field as VantField
  } from 'vant';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const username = ref('');
  const idcard = ref();
  const router = useRouter();
  const onClickLeft = () => router.go(-1);

</script>
<template>
  <div class="setup">
      <VantNavBar
        class="nav-bar"
        title="实名认证"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="modal-show">
            <VantForm>
                <VantCellGroup>
                    <VantField
                        v-model="username"
                        clearable
                        name="姓名"
                        label="姓名"
                        placeholder="请填写您的真实姓名"
                    />
                    <VantField
                        v-model="idcard"
                        clearable
                        name="身份证号  "
                        label="身份证号"
                        placeholder="请填写您的身份证号"
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
