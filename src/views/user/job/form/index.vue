<script setup lang="ts">
import { ref } from 'vue';
import { 
  Toast, 
  Form as VantForm, 
  Field as VantField, 
  Button as VantButton, 
  CellGroup as VantCellGroup,
  Popup as VantPopup,
  Picker as VantPicker
} from 'vant';

const productId = ref('');
const showPicker = ref(false);
const columns = ['产品01', '产品02', '产品03', '产品04', '产品05'];
const onConfirm = (value) => {
  productId.value = value;
  showPicker.value = false;
};
const price = ref('');
const remark = ref('');

const onSubmit = (values) => {
  Toast.loading('验证中...');
  console.log('submit', values);
};

</script>

<template>
  <VantForm class="job-form" @submit="onSubmit">
    <VantCellGroup inset>
      <VantField
        v-model="productId"
        is-link
        readonly
        name="picker"
        label="选择产品"
        placeholder="点击选择产品"
        @click="showPicker = true"
        :rules="[{ required: true, message: '请选择产品' }]"
      />
      <VantPopup v-model:show="showPicker" position="bottom">
        <VantPicker
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </VantPopup>

      <VantField
        v-model="price"
        disabled
        label="预付金额"
        placeholder="预付金额"
        :rules="[{ required: true, message: '请填写预付金额' }]"
      />

      <VantField
        v-model="remark"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="50"
        placeholder="请输入备注"
        show-word-limit
      />
    </VantCellGroup>
    <div style="margin: 16px;">
      <VantButton round block color="#01c2c3" native-type="submit">
        提交
      </VantButton>
    </div>
  </VantForm>
</template>

<style lang="less" scoped>
.job-form {
  margin-top: 20px;
}
</style>
