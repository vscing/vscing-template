<script setup lang="ts">
import {
  NavBar as VantNavBar,
  Form as VantForm,
  Field as VantField,
  CellGroup as VantCellGroup,
  Button as VantButton,
  Popup as VantPopup,
  Picker as VantPicker,
  Toast,
  Dialog
} from 'vant';
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import { to } from '@/utils';
import { getBankList, addBank } from '@/api/bank';
import { useUserStore } from '@/store/modules/user';
import { setAuth, checkAuth } from '@/api/pay';

const userStore = useUserStore();
let userInfo = userStore.getUserInfo || {}

const router = useRouter();
const formData = reactive({
  bank_id: 0,
  open_bank_name: '',
  card_number: '',
  phone: ''
})
const bankName = ref<string>('');
const showPicker = ref(false);
const columns = ref([]);

const onConfirm = (value) => {
  bankName.value = value.bank_name;
  formData.bank_id = value.id;
  showPicker.value = false;
};

const init = async() => {
  const [_, res] = await to(getBankList());
  if(res){
    columns.value = res.list
  }

  const [err1, res1] = await to(checkAuth({
    type: 2
  }));
  if(res1) {
    const [err2, res2] = await to(setAuth({
      type: 2
    }))
    Dialog.confirm({
      title: '提示',
      message:'绑定银行卡需要缴纳1元，是否确认跳转支付宝支付？',
    })
    .then(() => {
      let divForm = document.getElementsByTagName('divform')
      if (divForm.length) {
        document.body.removeChild(divForm[0])
      }
      const div: any = document.createElement('divform')
      div.innerHTML = res2.form
      document.body.appendChild(div)
      document.getElementById('alipay_submit')?.submit();
    })
    .catch(() => {
      router.go(-1)
    });
  }
}

init();

const validatePhone = (val: string) => /^1(3|4|5|6|7|8|9)\d{9}$/.test(val);

const onClickLeft = () => router.go(-1);

const onSubmit = async() => {
  const [_, res] = await to(addBank(formData));
  if (res) {
    Toast.success('绑定成功');
    userInfo['is_bank'] = true;
    userStore.setUserInfo(userInfo);
    onClickLeft();
  }
}
</script>
<template>
  <div class="setup">
    <VantNavBar class="nav-bar" title="银行卡绑定" left-arrow @click-left="onClickLeft" />
    <div class="modal-show">
      <VantForm @submit="onSubmit">
        <VantCellGroup>
          <VantField
            v-model="bankName"
            is-link
            readonly
            name="银行"
            label="银行"
            placeholder="请选择银行"
            @click="showPicker = true"
            :rules="[{ required: true, message: '请选择银行' }]"
          />
          <VantPopup v-model:show="showPicker" position="bottom">
            <VantPicker :columns="columns" :columns-field-names="{text: 'bank_name'}" @confirm="onConfirm" @cancel="showPicker = false" />
          </VantPopup>
          <VantField
            v-model="formData.open_bank_name"
            clearable
            name="开户行"
            label="开户行"
            placeholder="请输入开户行"
            :rules="[{ required: true, message: '请输入开户行' }]"
          />
          <VantField
            v-model="formData.card_number"
            clearable
            name="银行卡号"
            label="银行卡号"
            placeholder="请输入银行卡号"
            :rules="[{ required: true, message: '请输入银行卡号' }]"
          />
          <VantField
            v-model="formData.phone"
            clearable
            max-length
            name="银行卡预留手机号"
            label="银行卡预留手机号"
            placeholder="请输入银行卡预留手机号"
            :rules="[{ validator: validatePhone, message: '请输入正确银行卡预留手机号' }]"
          />
        </VantCellGroup>
        <div class="modal-show-button">
          <VantButton round block color="#01c2c3" native-type="submit">确定</VantButton>
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
  .modal-show {
    .modal-show-button {
      padding: 0 20px;
      margin-top: 53px;
      & > button {
        font-size: 14px;
        color: #fff;
        background-color: #01c2c3;
        border: 0;
      }
    }
  }
}
</style>
