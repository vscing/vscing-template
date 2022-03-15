<script lang="ts" setup>
  import { ref } from 'vue';
  import { List as VantList, Search as VantSearch, Icon as VantIcon } from 'vant';

  const loading = ref<boolean>(false);
  const finished = ref<boolean>(false);

  const onLoad = () => {}
</script>

<template>
  <div>
    <VantSearch/>
    <VantIcon name="add-o" />
  </div>

  <VantList
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div class="job-list">
      <div class="job-box">
        <h2>任务编号0001</h2>
        <div class="job-price-state">
          <p>
            <span>预付金额：</span>
            <span class="job-price">￥5000</span>
          </p>
          <p>
            <span>任务状态：</span>
            <span class="job-state">完成</span>
          </p>
        </div>
        <p class="job-date">执行日期：2020-06-21 14:05:00</p>
        <p class="job-remak">任务备注：测试任务完成度啊测试任务完成度啊测试任务完成度啊测试任务完成度啊</p>
      </div>

      <div class="job-box">
        <h2>任务编号0002</h2>
        <div class="job-price-state">
          <p>
            <span>预付金额：</span>
            <span class="job-price">￥3000</span>
          </p>
          <p>
            <span>任务状态：</span>
            <span class="job-state job-state_err">失败</span>
          </p>
        </div>
        <p class="job-date">执行日期：2020-06-21 14:05:00</p>
        <p class="job-remak">任务备注：测试任务完成度啊测试任务完成度啊测试任务完成度啊测试任务完成度啊</p>
      </div>
    </div>
  </VantList>  
</template>

<style lang="less" scoped>
  .job-list {
    padding: 10px;
    .job-box {
      padding: 10px;
      border-radius: 4px;
      background-color: #ffffff;
      box-shadow: rgba(182, 182, 182, 0.16) 0px 2px 10px 0px;
      font-size: 14px;
      font-weight: 300;
      margin-bottom: 10px;
      & > h2 {
        font-size: 16px;
        font-weight: 600;
      }
      & > p {
        margin-top: 5px;
      }
      .job-price-state {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .job-price {
          font-weight: 600;
        }
        .job-state {
          font-weight: 600;
          color: #07c160;
        }
        .job-state_err {
          color: #ee0a24;
        }
      }
    }
  }
  
</style>
