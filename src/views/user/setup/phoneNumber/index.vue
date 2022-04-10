<script setup lang="ts">
  import { 
    NavBar as VantNavBar,
    CellGroup as VantCellGroup,
    Form as VantForm,
    Field as VantField
  } from 'vant';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const phone = ref('');
  const time = ref('');
  const captcha = ref('');
  const sendAuthCode = ref(true);
  const btn_text  = ref('获取验证码');

  const router = useRouter();
  const onClickLeft = () => router.go(-1);
  const getCode = () => {};
</script>
<template>
  <div class="setup">
      <VantNavBar
        class="nav-bar"
        title="设置手机号"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="modal-show">
            <VantForm>
                <VantCellGroup>
                    <VantField
                        v-model="phone"
                        clearable
                        name="手机号"
                        label="手机号"
                        placeholder="请输入手机号"
                    />
                    <VantField
                        center
                        v-model="captcha"
                        clearable
                        name="验证码  "
                        label="验证码"
                        placeholder="请输入验证码"
                    >
                        <template #button>
                          <div class="get-code" @click="getCode" v-if="sendAuthCode"> {{ btn_text }}</div>
                          <div class="get-code" v-else>{{ time }}s后获取</div>
                        </template>
                    </VantField>
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
  font-size: 14px;
  text-align: center;
  color: #fff;
  background-color:#01c2c3;
  border-radius: 23px;
  position: absolute;
  top: 170px;
}
</style>
