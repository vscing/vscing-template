<script setup lang="ts">
  import { 
    NavBar as VantNavBar,
    Form as VantForm,
    Field as VantField,
    CellGroup as VantCellGroup,
    Button as VantButton,
    Popup as VantPopup,
    Picker as VantPicker
  } from 'vant';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const name = ref('');
  const idcard = ref('');
  const bank = ref('');
  const showPicker = ref(false);
  const bankNo = ref('');
  const mobile = ref('');

  const columns = ['北京银行', '招商银行', '工商银行', '建设银行', '邮政银行','农业银行', '中国银行','交通银行'];
  const router = useRouter();
  const onClickLeft = () => router.go(-1);
  const onConfirm = (value) => {
    bank.value = value;
    showPicker.value = false;
  };
</script>
<template>
  <div class="setup">
      <VantNavBar
        class="nav-bar"
        title="银行卡绑定"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="modal-show">
            <VantForm>
                <VantCellGroup>
                    <VantField
                        v-model="name"
                        clearable
                        name="持卡人姓名"
                        label="持卡人姓名"
                        placeholder="请输入持卡人姓名"
                    />
                    <VantField
                        v-model="idcard"
                        clearable
                        name="身份证号"
                        label="身份证号"
                        placeholder="请输入身份证号"
                    />
                    <VantField
                        v-model="bank"
                        is-link
                        readonly
                        name="银行"
                        label="银行"
                        placeholder="请选择银行"
                        @click="showPicker = true"
                    />
                    <VantPopup v-model:show="showPicker" position="bottom">
                      <VantPicker
                        :columns="columns"
                        @confirm="onConfirm"
                        @cancel="showPicker = false"
                      />
                    </VantPopup>
                    <VantField
                        v-model="username"
                        clearable
                        name="开户行"
                        label="开户行"
                        placeholder="请选择开户行"
                    />
                    <VantField
                        v-model="bankNo"
                        clearable
                        name="银行卡号"
                        label="银行卡号"
                        placeholder="请输入银行卡号"
                    />
                    <VantField
                        v-model="mobile"
                        clearable
                        max-length
                        name="银行卡预留手机号"
                        label="银行卡预留手机号"
                        placeholder="请输入银行卡预留手机号"
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
    .modal-show{
        .modal-show-button{
            display:flex;
            :deep(.van-button){
                width:90%;
                height:36px;
                margin:50px auto;
            }
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
