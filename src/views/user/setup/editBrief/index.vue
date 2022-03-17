<script setup lang="ts">
  import { 
    NavBar as VantNavBar,
    CellGroup as VantCellGroup,
    Field as VantField
  } from 'vant';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const message = ref('');
  const router = useRouter();
  const onClickLeft = () => router.go(-1);
  const onCancel = () => router.go(-1);//取消
  const onOK = () => router.go(-1);//保存
</script>
<template>
  <div class="editBrief">
      <VantNavBar
        class="nav-bar"
        title="编辑简介"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="editBrief-button">
        <div @click="onCancel">取消</div>
        <div @click="onOK">保存</div>
      </div>
      <div class="editBrief-textarea">
          <VantCellGroup>
              <VantField
                name="textarea"
                v-model="message"
                clearable
                rows="7"
                type="textarea"
                maxlength="200"
                placeholder="介绍自己，如：编辑一些个性签名..."
                show-word-limit
              />
          </VantCellGroup>
      </div>
  </div>
</template>

<style lang="less" scoped>
.editBrief {
    .nav-bar {  
        width: 100%;
          :deep(.van-icon) {
            color: #000000;
        }
        :deep(.van-nav-bar__title) {
            color: #000000;
        }
    }
    .editBrief-button{
      display:flex;
      flex-wrap:nowrap;
      justify-content: space-around;
      padding: 5px 15px;
      & > div:first-child{
        flex: 1;
      }
      & > div:last-child{
        color: #f00;
      }
    }
}
</style>
