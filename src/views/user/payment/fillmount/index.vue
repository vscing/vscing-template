<script setup lang="ts">
import {
  NavBar as VantNavBar,
  Tab as VantTab,
  Tabs as VantTabs,
  Empty as VantEmpty
} from 'vant';
import { useRouter } from 'vue-router';
import { reactive, ref, watch } from 'vue';
import { getPayList } from '@/api/pay';
import { List } from '@/components/List';
import { Images } from '@/assets/images';

const router = useRouter();
const tabTitle = reactive(['余额变动', '充值', '提现', '收益']);
const active = ref(0);

const onClickLeft = () => router.go(-1);

const params = reactive({
  type: 0
});

watch(active, (val: any, old: any) => {
  if(val !== old) {
    params.type = val;
  }
})

const onClickTab = ({ title }) => console.log(title, active.value);

</script>
<template>
  <div class="setup">
    <VantNavBar class="nav-bar" title="账单" left-arrow @click-left="onClickLeft" />
    <div class="modal-show">
      <VantTabs v-model:active="active" @click-tab="onClickTab">
        <VantTab v-for="item in tabTitle" :title="item"></VantTab>
      </VantTabs>
       <List
          :apiFunc="getPayList"
          :params="params"
        >
          <template #default="defaultProps">
            <div v-for="item in defaultProps.list" class="item">
              {{JSON.stringify(item)}}
            </div>
          </template>
          <template #empty>
            <VantEmpty
              class="custom-image"
              :image="Images.empty"
              :description="`暂无${tabTitle[active]}`"
            />
          </template>
        </List>
    </div>
  </div>
</template>

<style lang="less" scoped>
.setup {
  .modal-show {
    .modal-show-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      top: 100px;
      left: calc(50% - 80px);
      & > span {
        text-align: center;
        color: rgba(0, 0, 0, 0.4);
        margin-top: 30px;
      }
    }
  }
}
.item {
  height: 100px;
  background-color: #ff0000;
}
</style>
