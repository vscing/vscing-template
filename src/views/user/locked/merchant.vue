<script setup lang="ts">
import {
  NavBar as VantNavBar,
  Popup as VantPopup,
  Cell as VantCell,
  Button as VantButton,
  Area as VantArea,
  Toast
} from 'vant';
import { areaList } from '@vant/area-data';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { onNetwork } from '@/api/goods';
import { to } from '@/utils';

const show = ref(false); 
const disabled = ref(false);
const address = ref('');
const areaValue = ref('');
const router = useRouter();
const onClickLeft = () => router.go(-1);

// const init = async() => {
//   const [_, res] = await to(getMerchant());
//   console.log('%c [ res ]-27', 'font-size:13px; background:pink; color:#bf2c9f;', res)
// }
// init();

const onConfirm = async(val) => {
  console.log('%c [ val ]-30', 'font-size:13px; background:pink; color:#bf2c9f;', val)
  areaValue.value = val;
  let str = '';
  val.forEach((item) => {
    if(item) {
      str += item?.name+'/';
    }
  })
  address.value = str = str.substring(0, str.length - 1);
  show.value = false;
}

const onCancel = async() => {
  show.value = false;
}

const onSubmit = async() => {
  console.log('%c [ areaValue ]-46', 'font-size:13px; background:pink; color:#bf2c9f;', areaValue.value)
  let area = areaValue.value
  if(!area) {
    
    Toast.fail('请选择身份证省市区');
    return;
  }
  disabled.value = true;
  const [_, data] = await to(onNetwork({
    province_code: area[0]['code'],
    city_code: area[1]['code'],
    district_code: area[2]['code']
  }));
  if(data) {
    disabled.value = false;
    Toast.fail('入网失败，前往发布')
    router.go(-1)
  } else {
    disabled.value = false;
    Toast.fail('入网失败，联系客服')
  }
}
</script>
<template>
  <div class="setup">
    <VantNavBar class="nav-bar" title="入网设置" left-arrow @click-left="onClickLeft" />
    <div class="modal-show">
      <VantCell is-link @click="show = true">{{ address ? address:'请选择身份证省市区'}}</VantCell>
      <VantPopup
        v-model:show="show"
        position="bottom"
        :style="{height: '30%', overflow: 'hidden'}"
      >
        <VantArea title="" :area-list="areaList" :value="areaValue" @confirm="onConfirm" @cancel="onCancel"/>
      </VantPopup>
      <div class="saveData">
        <VantButton type="primary" round block :disabled="disabled" @click="onSubmit">
          入网
        </VantButton>
      </div>
    </div>
  </div>
</template>

