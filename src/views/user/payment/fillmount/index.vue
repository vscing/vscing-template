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
import { formatToDateTime } from '@/utils/dateUtil';

const router = useRouter();
const tabTitle = reactive(['余额变动', '充值', '提现', '收益']);
const active = ref<any>(0);

const onClickLeft = () => router.go(-1);

const params = reactive({
  type: 0
});

// const billType = (bill = 1) => {
//     let bill_type = '';
//       switch (bill) {
//               case 1:
//                 bill_type = '充值'
//                 break;

//               case 2:
//                 bill_type = '体现'
//                 break;

//               case 3:
//                 bill_type = '收益'
//                 break;

//               case 4:
//                 bill_type = '佣金'
//                 break;

//               default:
//                 break;
//       }
//       return bill_type;
// }

//支付方式
const payment = (type) => {
      let pay = '';
      switch (type) {
        case 1:
          pay = '银行卡'
          break;

        case 2:
          pay = '支付宝'
          break;

        case 3:
          pay = '微信'
          break;

        case 4:
          pay = '余额'
          break;

        default:
          break;
      }
      return pay;
}

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
            <div v-for="item in defaultProps.list" class="item" :key="item.id">
              <div class="bill">
                  <div class="bill_payment">
                      <div class="bill_name">{{payment(item.bill_type)}}</div>
                      <div class="bill_value">已完成</div>
                  </div>
                  <div class="bill_type">
                      <div class="bill_name">账单类型</div>
                      <div class="bill_value">{{item.bill_name}}</div>
                  </div>
                  <div class="bill_amount">
                      <div class="bill_name">支付金额</div>
                      <div class="bill_value">￥{{item.bill_money}}</div>
                  </div>
                  <div class="bill_desc">
                      <div class="bill_name">支付订单</div>
                      <div class="bill_value">{{item.order_number}}</div>
                  </div>
                  <div class="bill_time">
                      <div class="bill_name">支付时间</div>
                      <div class="bill_value">{{formatToDateTime(item.created_at)}}</div>
                  </div>
              </div>
              <!-- {{JSON.stringify(item)}} -->
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
  // height: 100px;
  margin-bottom: 15px;
  // background-color: #ff0000;
}
.bill{
  margin: 15px 10px;
  background-color: #ffffff;
  padding: 10px;
  .bill_payment{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 5px 0;
      .bill_name{
          color: #333;
          font-weight: 700;
          font-size: 16px;
      }
      .bill_value{
          color: #01c2c3;
          font-weight: 700;
          font-size: 14px;
      }
  }
  .bill_type{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 5px 0;
        .bill_name{
            color: #333;
            font-size: 14px;
        }
        .bill_value{
            font-weight: 700;
            color: rgba(0, 0, 0, 0.4);
            font-size: 14px;
        }
  }
  .bill_amount{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 5px 0;
        .bill_name{
            color: #333;
            font-size: 14px;
        }
        .bill_value{
            font-weight: 700;
            color: #f4a33a;
            font-size: 14px;
        }
  }
  .bill_desc{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 5px 0;
      .bill_name{
         color: #333;
      }
      .bill_value{
          font-weight: 700;
          color: rgba(0, 0, 0, 0.4);
          font-size: 14px;
      }
  }
  .bill_time{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 5px 0;
        .bill_name{
          color: #333;
        }
        .bill_value{
            font-weight: 700;
            color: rgba(0, 0, 0, 0.4);
            font-size: 14px;
        }
  }
}
:deep(.van-tabs__line){
    background: #01c2c3;
}
</style>
