<script setup lang="ts">
  import { Icon as VantIcon, NavBar as VanNavBar } from 'vant';
  import { useRouter } from 'vue-router';
  
  const onClickLeft = () => history.back();
  const router = useRouter();
  const onTearm = () => {
      router.push('/myTearm')  
  }
  const onOrder = () => {
      router.push('/order')  
  }
  const onWechat = () => {
      router.push('/wechat')  
  }
  const onStatis = () => {
      router.push('/statics')  
  }
</script>
<template>
    <div class="distribut-containner">
        <div>
            <VanNavBar 
                title="设置"
                left-arrow
                @click-left="onClickLeft"
            />
        </div>
        <div class="distribut-list">
            <div class="distribut-list-desc" @click="onTearm">
                <span>账号安全</span>
                <VantIcon name="arrow" size="16" color="#ddddddb8" />
            </div>
            <div class="distribut-list-desc" @click="onOrder">
                <span>支付设置</span>
                <VantIcon name="arrow" size="16" color="#ddddddb8" />
            </div>
            <div class="distribut-list-desc" @click="onWechat">
                <span>身份认证</span>
                <VantIcon name="arrow" size="16" color="#ddddddb8" />
            </div>
            <div class="distribut-list-desc" @click="onStatis">
                <span>地址管理</span>
                <VantIcon name="arrow" size="16" color="#ddddddb8" />
            </div>
        </div>
        <div class="distribut-list">
            <div class="distribut-list-desc" @click="onTearm">
                <span>账号安全</span>
                <VantIcon name="arrow" size="16" color="#ddddddb8" />
            </div>
            <div class="distribut-list-desc" @click="onOrder">
                <span>支付设置</span>
                <VantIcon name="arrow" size="16" color="#ddddddb8" />
            </div>
            <div class="distribut-list-desc" @click="onWechat">
                <span>身份认证</span>
                <VantIcon name="arrow" size="16" color="#ddddddb8" />
            </div>
            <div class="distribut-list-desc" @click="onStatis">
                <span>地址管理</span>
                <VantIcon name="arrow" size="16" color="#ddddddb8" />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.distribut-containner{
    width: 100vw;
    height: 100vh;
    background-color: #e5e7eb2b;
    ::v-deep .van-nav-bar .van-icon {
        color: #333!important;
        font-size: 20px;
    }
    .distribut-list{
        display: flex;
        flex-direction: column;
        background-color: #ffffffb3;
        margin-top: 15px;
        .distribut-list-desc{
            display: flex;
            width: 90%;
            border-bottom: 1px solid #dddddd70;
            margin: 0 auto;
            .van-icon{
                margin: 15px 0;
                padding-right: 15px;
            }
            & > span {
                flex: 1;
                font-size: 16px;
                margin: 15px 0;
            }
        }
        .distribut-list-desc:nth-of-type(4){
            border: none;
        }
    }
}
</style>