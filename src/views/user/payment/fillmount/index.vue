<script setup lang="ts">
  import { 
    NavBar as VantNavBar,
    Tab as VantTab,
    Tabs as VantTabs,
    Image as VantImage
  } from 'vant';
  import { useRouter } from 'vue-router';
  import { reactive } from 'vue';

  const router = useRouter();
  const tabTitle = reactive(['余额变动', '收益', '体现', '宝户通体现']);
  const onClickLeft = () => router.go(-1);

</script>
<template>
  <div class="setup">
      <VantNavBar
        class="nav-bar"
        title="账单"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="modal-show">
            <VantTabs>
                <VantTab v-for="item in tabTitle" :title="item">
                    <div class="modal-show-content">
                        <VantImage round width="160" height="116" src="https://theoneart-public.oss-cn-qingdao.aliyuncs.com/pc/images/pic-home/empty%402x.png" />
                        <span>暂无内容</span>
                    </div> 
                </VantTab>
            </VantTabs>
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
        .modal-show-content{
            display:flex;
            flex-direction: column;
            justify-content:center;
            position:absolute;
            top: 100px;
            left: calc(50% - 80px);
            & > span {
                text-align:center;
                color:rgba(0,0,0,.4);
                margin-top: 30px;
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
