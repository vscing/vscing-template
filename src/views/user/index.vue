<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, reactive } from 'vue';
import { TabList } from '@/components/TabList';
import { Image, Icon } from 'vant';
    const username = ref('');
    const password = ref(0);
    //登陆页面
    const onSubmit = () => {
    }

    //注册页面
    const toRegister = () => {

    }

</script>

<template>
  <div class="containner-user">
    <div class="views-icon">
      <div class="views-icon-first">
          <Icon name="scan" size="25" />
      </div>
      <div class="views-icon-last">
          <Icon name="setting-o" size="25" />
      </div> 
    </div>
    <div class="views-user">
      <Image width="70" height="70" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
      <span>无涯手套7T9D1</span>
    </div>
    <div class="order-status">
        <div class="order-desc">
            <Icon name="service-o" size="20" />
            <span>客服电话</span>
        </div>
        <div class="order-desc">
            <Icon name="chat-o" size="20" />
            <span>客服微信</span>
        </div>
        <div class="order-desc">
            <Icon name="friends-o" size="20" />
            <span>需求合作</span>
        </div>
        <div class="order-desc">
            <Icon name="shop-collect-o" size="20" />
            <span>个人藏品</span>
        </div>
    </div>
    <div class="views-moneny">
        <div class="views-moneny-sum">
            <div class="views-moneny-amount">
              <Icon name="star-o" size="20" color="#333"/>
              <span>收藏</span>
            </div>
            <div class="views-moneny-button">
              <span>0</span>
              <Icon name="arrow" size="10" />
            </div>
        </div>
        <div class="views-moneny-sum">
            <div class="views-moneny-amount">
              <Icon name="balance-o" size="18" color="#333" />
              <span>个人余额</span>
            </div>
            <div class="views-moneny-button">
              <span>0</span>
              <Icon name="arrow" size="10" />
            </div>
        </div>
        <div class="views-moneny-sum">
            <div class="views-moneny-amount">
              <Icon name="paid" size="18" color="#333" />
              <span>产品合成</span>
            </div>
            <div class="views-moneny-button">
              <span>0</span>
              <Icon name="arrow" size="10" />
            </div>
        </div>
        <div class="views-moneny-sum">
            <div class="views-moneny-amount">
              <Icon name="goods-collect-o" size="18" color="#333" />
              <span>锁藏品</span>
            </div>
            <div class="views-moneny-button">
              <span>0</span>
              <Icon name="arrow" size="10" />
            </div>
        </div>
    </div>
    <div class="views-order">
        <div class="views-order-amount">
          <span>我的订单</span>
        </div>
        <div class="views-order-button">
          <span>0</span>
          <Icon name="arrow" size="10" />
        </div>
    </div>
    <div class="order-status">
        <div class="order-desc">
            <Icon name="credit-pay" size="20" />
            <span>待付款</span>
        </div>
        <div class="order-desc">
            <Icon name="peer-pay" size="20" />
            <span>待发货</span>
        </div>
        <div class="order-desc">
            <Icon name="logistics" size="20" />
            <span>待收货</span>
        </div>
        <div class="order-desc">
            <Icon name="cash-back-record" size="20" />
            <span>退款售后</span>
        </div>
    </div>
    <div class="views-distribution">
        <div class="views-distribution-sum">
            <div class="views-distribution-amount">
              <div class="views-distribution-desc">
                    <Icon name="cluster-o" size="20" color="#333"/>
                    <span>分销</span>
              </div>
              <div class="views-distribution-title">
                    <span>邀请好友领奖励</span>
              </div>
            </div>
            <div class="views-distribution-button">
              <Icon name="arrow" size="10" />
            </div>
        </div>
        <div class="views-distribution-sum">
            <div class="views-distribution-amount">
                <div class="views-distribution-desc">
                    <Icon name="shop-o" size="18" color="#333" />
                    <span>商品出售</span>
                </div>
                <div class="views-distribution-title">
                    <span>商品售卖价格</span>
                </div>
            </div>
            <div class="views-distribution-button">
              <Icon name="arrow" size="10" />
            </div>
        </div>
    </div>>
  </div>
  <TabList />
</template>

<style lang="less">
@import url('./index.less');
</style>
