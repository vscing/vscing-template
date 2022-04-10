<script setup lang="ts">
  import { Image as VantImage, Icon as VantIcon } from 'vant';
  import { useRouter } from 'vue-router';

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
        <div class="distribut-card">
            <div class="distribut">
                <div class="distribut-content">
                    <VantImage round width="70" height="70" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                    <span>陈飞</span>
                </div>
                <div class="distribut-amount">
                    <div class="distribut-moneny">
                        <span>0.00</span>
                        <span>累计佣金</span>
                    </div>
                    <div class="distribut-moneny">
                        <span>0.00</span>
                        <span>可提现</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="distribut-list">
            <div class="distribut-list-desc" @click="onTearm">
                <span>我的团队</span>
                <VantIcon name="arrow" size="16" color="#ddddddb8" />
            </div>
            <div class="distribut-list-desc" @click="onOrder">
                <span>分销订单</span>
                <VantIcon name="arrow" size="16" color="#ddddddb8" />
            </div>
            <div class="distribut-list-desc" @click="onWechat">
                <span>邀请码</span>
                <VantIcon name="arrow" size="16" color="#ddddddb8" />
            </div>
            <div class="distribut-list-desc" @click="onStatis">
                <span>业绩统计</span>
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
    .distribut-card{
        width: 100%;
        height: 260px;
        background-color: #ffffffb3;
        .distribut{
            width: 95%;
            height: 180px;
            padding: 10px;
            border-radius: 10px;
            background-color: #48CFAE;
            margin:0 auto;
            position: relative;
            top: 60px;
            .distribut-content{
                display: flex;
                flex-direction: column;
                position: absolute;
                top: -35px;
                left: calc(50% - 35px);
                & > span {
                    display: flex;
                    justify-content: center;
                    margin-top: 10px;
                    color: #fff;
                    font-size: 20px;
                }
            }
            .distribut-amount{
                display: flex;
                .distribut-moneny{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    margin-top: 90px;
                    & > span:first-child {
                        color:#fff;
                        font-size: 200%;
                        display: flex;
                        justify-content: center;
                    }
                    & > span:last-child {
                        color:#fff;
                        font-size: 20%;
                        display: flex;
                        justify-content: center;
                    }
                }
            }
        }
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
