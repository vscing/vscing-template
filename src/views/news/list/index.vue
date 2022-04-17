<script setup lang="ts">
<<<<<<< HEAD
  import { reactive, ref, watch } from 'vue';
  import { 
    Tabs as VantTabs, 
    Tab as VantTab, 
    Pagination as VantPagination, 
    Image as VantImage,
    Collapse as VantCollapse,
    CollapseItem as VantCollapseItem 
  } from 'vant';
  import { useRouter } from 'vue-router';
  import { getArticleList } from '@/api/article';
=======
import { reactive, ref, watch } from 'vue';
import {
  Tabs as VantTabs,
  Tab as VantTab,
  Pagination as VantPagination,
  Image as VantImage,
  Empty as VantEmpty
} from 'vant';
import { useRouter, useRoute } from 'vue-router';
import { getArticleList } from '@/api/article';
>>>>>>> 1fa1f3e7f1460fd8f854207383c7ba9042b2e2aa
import { to } from '@/utils';
import { Images } from '@/assets/images';
import { columnToDateTime } from '@/utils/dateUtil';

const route = useRoute();
const type = Number(route.query.type) || 0

const tabTitle = reactive(['最新活动', '合成策略', '客服帮助']);
<<<<<<< HEAD
  const page = ref<number>(1);
  const total = ref<number>(0);
  const active = ref<number>(0);
  const actives = ref<number>(0);
  const list = ref<any[]>([]);
  const activeNames = ref(['1']);
=======
const page = ref<number>(1);
const total = ref<number>(0);
const active = ref<number>(type);
const list = ref<any[]>([]);
>>>>>>> 1fa1f3e7f1460fd8f854207383c7ba9042b2e2aa

const router = useRouter();

const onDetail = (id: number) => {
  router.push(`/news/detail?id=${id}`)
}

watch(active, (val: any, old: any) => {
  if (val !== old) {
    onLoad();
  }
})

const onLoad = async () => {
  const [_, res] = await to(getArticleList({
    page: page.value,
    type: active.value + 1
  }))

  if (res) {
    list.value = res.list || []
    total.value = Math.ceil(res.total / 10) || 0
  }
}
onLoad();
</script>

<template>
  <VantTabs class="tabs-box" v-model:active="active">
    <VantTab title="最新活动">
        <VantList
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
            <ul class="product-list">
                <li class="product-data" v-for="(item, index) in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]" :key="index">
                    <div class="product-img"><img class="swiper-img" src="https://theoneart-common.oss-cn-qingdao.aliyuncs.com/author/2535e32ac8848c5b591b8f5a3cd1d6ad1649767552807.jpg" width="174.22" height="104.53"/></div>
                    <div class="product-desc">「萌芽熊冬雪季系列数字藏品」快照时间说明</div>
                    <div class="product-time">2022/04/12 20:45:12</div>
                </li>
            </ul>
        </VantList>
    </VantTab>
    <VantTab title="合成策略">
        <div class="explain">
              <VantList
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                  <VantTabs v-model:active="actives" type="card">
                    <VantTab title="玩法一">
                          <div class="play-game">
                                <div class="content-title">
                                    <span>合成条件</span>
                                    <p> 一张合成图【烤肉】+一张合成图【游泳】+一张合成图【浇花】可消耗合成一张动态大图【鲁道夫和朋友们】 </p>
                                  </div>
                                  <div class="product-image">
                                    <div class="product-image-list" v-for="item in [0,1]" :key="item">
                                      <img src="https://source.theone.art/watermarkResize/37a3adf0c780332f729e80cb16afe7e2/ccb7c9c4c5052c8299734c957c176ac6-16466350452770.25.jpg?v=1" />
                                      <div class="product-desc">
                                        <div class="product-desc-title">唐 门神</div>
                                        <div class="product-desc-price">需要*2</div>
                                        <div class="product-desc-icon">
                                          <div>当前拥有*0</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="content-button">
                                      <div>去购买</div>
                                      <div>去合成</div>
                                  </div>
                          </div>
                          <div class="content-explain">
                            <div class="content-title">活动须知</div>
                            <div class="content-desc">
                              <p>活动须知： </p>
                              <p>
                                为更好服务唯一艺术平台的各位用户，唯一艺术特此公告数字藏
                                品的二次交易细则。鉴于不同属性的数字艺术的二次交易细则各
                                有不同，请各位用户务必审慎阅读并同意相关规则后进行相应操
                                作，以免造成不必要损失。
                              </p>
                              <p>
                                1、依据我国法律要求，特定条件下的数字藏品的二次交易不支持
                                任何形式的变相炒作，我们坚决反对数字藏品炒作、场外交易、
                                欺诈，或以任何其他非法、侵权方式使用的违法违规行为，请大
                                家注意甄别上述涉嫌网络欺诈的行为及其相关风险。
                              </p>
                              <p>
                                2、数字藏品为虚拟数字商品，购买以及寄售前请先完成实名认证。
                              </p>
                              <p>3、本商品一经合成不支持退换。</p>
                              <p>4、本次合成通道限时开启时间：3月12日（本周六）18:00至3月14日（下周一）18:00。</p>
                            </div>
                          </div>
                    </VantTab>
                    <VantTab title="玩法二">
                          <div class="play-game">
                                <div class="content-title">
                                    <span>合成条件</span>
                                    <p> 一张合成图【烤肉】+一张合成图【游泳】+一张合成图【浇花】可消耗合成一张动态大图【鲁道夫和朋友们】 </p>
                                  </div>
                                  <div class="product-image">
                                    <div class="product-image-list" v-for="item in [0,1]" :key="item">
                                      <img src="https://source.theone.art/watermarkResize/37a3adf0c780332f729e80cb16afe7e2/ccb7c9c4c5052c8299734c957c176ac6-16466350452770.25.jpg?v=1" />
                                      <div class="product-desc">
                                        <div class="product-desc-title">唐 门神</div>
                                        <div class="product-desc-price">需要*2</div>
                                        <div class="product-desc-icon">
                                          <div>当前拥有*0</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="content-button">
                                      <div>去购买</div>
                                      <div>去合成</div>
                                  </div>
                          </div>
                          <div class="content-explain">
                            <div class="content-title">活动须知</div>
                            <div class="content-desc">
                              <p>活动须知： </p>
                              <p>
                                为更好服务唯一艺术平台的各位用户，唯一艺术特此公告数字藏
                                品的二次交易细则。鉴于不同属性的数字艺术的二次交易细则各
                                有不同，请各位用户务必审慎阅读并同意相关规则后进行相应操
                                作，以免造成不必要损失。
                              </p>
                              <p>
                                1、依据我国法律要求，特定条件下的数字藏品的二次交易不支持
                                任何形式的变相炒作，我们坚决反对数字藏品炒作、场外交易、
                                欺诈，或以任何其他非法、侵权方式使用的违法违规行为，请大
                                家注意甄别上述涉嫌网络欺诈的行为及其相关风险。
                              </p>
                              <p>
                                2、数字藏品为虚拟数字商品，购买以及寄售前请先完成实名认证。
                              </p>
                              <p>3、本商品一经合成不支持退换。</p>
                              <p>4、本次合成通道限时开启时间：3月12日（本周六）18:00至3月14日（下周一）18:00。</p>
                            </div>
                          </div>
                    </VantTab>
                    <VantTab title="玩法三">
                          <div class="play-game">
                                <div class="content-title">
                                    <span>合成条件</span>
                                    <p> 一张合成图【烤肉】+一张合成图【游泳】+一张合成图【浇花】可消耗合成一张动态大图【鲁道夫和朋友们】 </p>
                                  </div>
                                  <div class="product-image">
                                    <div class="product-image-list" v-for="item in [0,1]" :key="item">
                                      <img src="https://source.theone.art/watermarkResize/37a3adf0c780332f729e80cb16afe7e2/ccb7c9c4c5052c8299734c957c176ac6-16466350452770.25.jpg?v=1" />
                                      <div class="product-desc">
                                        <div class="product-desc-title">唐 门神</div>
                                        <div class="product-desc-price">需要*2</div>
                                        <div class="product-desc-icon">
                                          <div>当前拥有*0</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="content-button">
                                      <div>去购买</div>
                                      <div>去合成</div>
                                  </div>
                          </div>
                          <div class="content-explain">
                            <div class="content-title">活动须知</div>
                            <div class="content-desc">
                              <p>活动须知： </p>
                              <p>
                                为更好服务唯一艺术平台的各位用户，唯一艺术特此公告数字藏
                                品的二次交易细则。鉴于不同属性的数字艺术的二次交易细则各
                                有不同，请各位用户务必审慎阅读并同意相关规则后进行相应操
                                作，以免造成不必要损失。
                              </p>
                              <p>
                                1、依据我国法律要求，特定条件下的数字藏品的二次交易不支持
                                任何形式的变相炒作，我们坚决反对数字藏品炒作、场外交易、
                                欺诈，或以任何其他非法、侵权方式使用的违法违规行为，请大
                                家注意甄别上述涉嫌网络欺诈的行为及其相关风险。
                              </p>
                              <p>
                                2、数字藏品为虚拟数字商品，购买以及寄售前请先完成实名认证。
                              </p>
                              <p>3、本商品一经合成不支持退换。</p>
                              <p>4、本次合成通道限时开启时间：3月12日（本周六）18:00至3月14日（下周一）18:00。</p>
                            </div>
                          </div>
                    </VantTab>
                    <VantTab title="玩法四">
                          <div class="play-game">
                                <div class="content-title">
                                    <span>合成条件</span>
                                    <p> 一张合成图【烤肉】+一张合成图【游泳】+一张合成图【浇花】可消耗合成一张动态大图【鲁道夫和朋友们】 </p>
                                  </div>
                                  <div class="product-image">
                                    <div class="product-image-list" v-for="item in [0,1]" :key="item">
                                      <img src="https://source.theone.art/watermarkResize/37a3adf0c780332f729e80cb16afe7e2/ccb7c9c4c5052c8299734c957c176ac6-16466350452770.25.jpg?v=1" />
                                      <div class="product-desc">
                                        <div class="product-desc-title">唐 门神</div>
                                        <div class="product-desc-price">需要*2</div>
                                        <div class="product-desc-icon">
                                          <div>当前拥有*0</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="content-button">
                                      <div>去购买</div>
                                      <div>去合成</div>
                                  </div>
                          </div>
                          <div class="content-explain">
                            <div class="content-title">活动须知</div>
                            <div class="content-desc">
                              <p>活动须知： </p>
                              <p>
                                为更好服务唯一艺术平台的各位用户，唯一艺术特此公告数字藏
                                品的二次交易细则。鉴于不同属性的数字艺术的二次交易细则各
                                有不同，请各位用户务必审慎阅读并同意相关规则后进行相应操
                                作，以免造成不必要损失。
                              </p>
                              <p>
                                1、依据我国法律要求，特定条件下的数字藏品的二次交易不支持
                                任何形式的变相炒作，我们坚决反对数字藏品炒作、场外交易、
                                欺诈，或以任何其他非法、侵权方式使用的违法违规行为，请大
                                家注意甄别上述涉嫌网络欺诈的行为及其相关风险。
                              </p>
                              <p>
                                2、数字藏品为虚拟数字商品，购买以及寄售前请先完成实名认证。
                              </p>
                              <p>3、本商品一经合成不支持退换。</p>
                              <p>4、本次合成通道限时开启时间：3月12日（本周六）18:00至3月14日（下周一）18:00。</p>
                            </div>
                          </div>
                    </VantTab>
                  </VantTabs>
              </VantList>
        </div>
    </VantTab>
    <VantTab title="客服帮助">
          <VantCollapse v-model="activeNames">
              <VantCollapseItem title="食艺术 | 结算账户B开户及提现教程" name="1">
                    <div class="course">
                        <img src="/src/assets/images/jiesuan.png" />
                        <p>移动端快速加入食艺术</p>
                        <p>移动端进入食艺术官网，点击 “我的” 界面，输入手机号、接收验证码、同意相关条例后，即表示注册/登录成功。</p>
                        <p>请点击链接/扫描下方二维码，查看详细内容：</p>
                        <img class="wechat" src="/src/assets/images/jiesuan.png" />
                    </div>
              </VantCollapseItem>
              <VantCollapseItem title="食艺术 | 手机端官网新用户注册教程" name="2">
                    <div class="course">
                        <img src="/src/assets/images/registry.png" />
                        <p>移动端快速加入食艺术</p>
                        <p>移动端进入食艺术官网，点击 “我的” 界面，输入手机号、接收验证码、同意相关条例后，即表示注册/登录成功。</p>
                        <p>请点击链接/扫描下方二维码，查看详细内容：</p>
                        <img class="wechat" src="/src/assets/images/registry.png" />
                    </div>
              </VantCollapseItem>
              <VantCollapseItem title="食艺术 | 盲盒抽签活动参与教程" name="3">
                    <div class="course">
                        <img src="/src/assets/images/choujiang.png" />
                        <p class="lottery">一起参与盲盒抽签</p>
                        <p>在食艺术官网，进入首页抽签页面，点击相关活动，进行登录、实名认证后，即可参与抽签。提示 “已报名” 即表示已经参与成功。</p>
                        <p>请点击链接/扫描下方二维码，查看详细内容：</p>
                        <img class="wechat" src="/src/assets/images/choujiang.png" />
                    </div>
              </VantCollapseItem>
          </VantCollapse>
    </VantTab>
  </VantTabs>
  <VantTab v-for="item in tabTitle" :title="item"></VantTab>
  <div v-if="list.length > 0">
    <div class="product-list">
      <div v-for="item in list" class="product-data" :key="item.id" @click="onDetail(item.id)">
        <div class="product-img">
          <VantImage :src="item.img" fit="cover" lazy-load width="100%" :radius="4" :show-loading="false" />
        </div>
        <div class="product-title">{{ item.title }}</div>
        <div class="product-desc">{{ item.desc }}</div>
        <div class="product-time">{{ columnToDateTime(item.created_at) }}</div>
      </div>
    </div>
    <VantPagination v-model="page" :page-count="total" mode="simple" @change="onLoad"/>
  </div>
  <VantEmpty v-else :image="Images.empty" :description="`暂无${tabTitle[active]}`"
  />
</template>

<style lang="less" scoped>
.tabs-box {
  :deep(.van-tabs__line) {
    background-color: #01c2c3;
  }
}

.product-list {

  .product-data {
    padding: 15px;
    margin-bottom: 10px;

    .product-img {
      display: flex;
      justify-content: center;
    }
    .product-title {
      font-size: 16px;
      color: #000000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-top: 10px;
    }

    .product-desc {
      padding-top: 10px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, .4);
    }

    .product-time {
      padding-top: 10px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, .4);
    }
    .course{
          & > p:nth-of-type(1){
              color: #999;
              line-height: 17px;
              font-size: 16px;
              font-weight: 700;
              padding-top: 40px;
          }
          & > p:nth-of-type(2){
              color: #999;
              padding-top: 15px;
          }
          & > p:nth-of-type(3){
              color: #999;
              padding-top: 15px;
          }
          .wechat{
            margin-top: 10px;
            width: 207px;
            height: 207px;
          }
          .lottery{
              color: rgb(0, 0, 0)!important;
              font-size: large;
          }
    }
  }
  .explain{
        background: #CBB895;
        height: 100%;
        :deep(.van-tab--card.van-tab--active){
          background-color: #ffffff!important;
          width:71.77px;
          height:42.72px;
          border-radius: 10px;
          & > span{
                background-image: url(/src/assets/images/hezi.png);
                background-size: 32% 52%;
                background-repeat: no-repeat;
                background-position-y: 12px;
                width: 100%;
                height: 50px;
                line-height: 50px;
                text-align: center;
                padding-left: 22px;
          }
        }
        :deep(.van-tab--card.van-tab--active){
          color: #0E0B20;
        }
        :deep(.van-tabs__nav--card){
          height:42.72px;
          border: 1px solid hsla(0,0%,59.2%,.3);
          border-radius: 10px;
        }
        :deep(.van-tab--card){
          color: #0E0B20;
          margin-right: 1px;
          background: hsla(0, 0%, 100%, 0.3)!important;
          border: 1px solid hsla(0,0%,59.2%,.3);
          border-radius: 10px;
          & > span{
                background-image: url(/src/assets/images/hezi.png);
                background-size: 32% 52%;
                background-repeat: no-repeat;
                background-position-y: 12px;
                width: 100%;
                height: 50px;
                line-height: 50px;
                text-align: center;
                padding-left: 22px;
          }
        }
        :deep(.van-tabs--card>.van-tabs__wrap){
          height:100px;
          padding-top: 25px;
        }
        :deep(.van-tabs__nav){
          background: #cbb895;
          border: none;
        }
        .play-game{
              background: url(/src/assets/images/background.png) no-repeat center;
              background-size: cover;
              height: 700px;
              border-radius: 10px;
              margin: 0 15px;
                .content-title{
                      & > span{
                          display: flex;
                          justify-content: center;
                          font-size: 22px;
                          font-weight: 600;
                          padding-top: 30px;
                      }
                      & > p{
                          text-align: center;
                          padding: 20px 42px;
                      }
                }
                .product-image{
                    padding: 0 5px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    width: 100%;
                    .product-image-list:nth-child(odd){
                        display: flex;
                        flex-direction: column;
                        margin: 10px 5px;
                        width: 53%;
                        background-image: url(/src/assets/images/right.png);
                        background-repeat: no-repeat;
                        background-size: 25% 15%;
                        background-position-x: 147px;
                        background-position-y: 60px;
                        & > img{
                            width: 75%;
                            height: 50%;
                            border-radius: 10px;
                        }
                        .product-desc{
                            margin-top: 20px;
                            .product-desc-title{
                                color: #0E0B20;
                                font-size: 14px;
                                font-weight: 600;
                            }
                            .product-desc-price{
                                font-size: 14px;
                                color: #0E0B20;
                                margin-top: 5px;
                            }
                            .product-desc-icon{
                                display: flex;
                                justify-content: space-between;
                                color: #0E0B20;
                                font-size: 14px;
                            }
                        }
                    }
                    .product-image-list:nth-child(even){
                        display: flex;
                        flex-direction: column;
                        margin: 10px 5px;
                        width: 41%;
                        & > img{
                            width: 100%;
                            height: 50%;
                            border-radius: 10px;
                            margin: 0 auto;
                        }
                        .product-desc{
                            margin-top: 20px;
                            .product-desc-title{
                                color: #0E0B20;
                                font-size: 14px;
                                font-weight: 600;
                            }
                            .product-desc-price{
                                font-size: 14px;
                                color: #0E0B20;
                                margin-top: 5px;
                            }
                            .product-desc-icon{
                                display: flex;
                                justify-content: space-between;
                                color: #0E0B20;
                                font-size: 14px;
                            }
                        }
                    }
                }
                .content-button{
                  & > div:first-child{
                        width: 142px;
                        height: 37px;
                        line-height: 37px;
                        text-align:center;
                        color: #0E0B20;
                        border-color: #0E0B20 !important;
                        border-radius: 20px;
                        border: 1px solid transparent;
                        margin-left: 15px;
                  }
                  & > div:last-child{
                        width: 272px;
                        height: 45px;
                        line-height: 45px;
                        text-align:center;
                        margin:0 auto;
                        background: #cccccc;
                        color: #666666;
                        border-radius: 20px;
                        margin-top: 25px;
                  }
                }
        }
        .content-explain{
              .content-title{
                  text-align: center;
                  font-size: 16px;
                  margin-top: 50px;
              }
              .content-desc{
                  & > p{
                      padding: 5px 10px;
                      line-height: 30px;
                  }
              }
        }
  }
<<<<<<< HEAD
  .product-list {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    margin-top: 20px;
    margin-bottom: 10px;
    padding: 0 10px;
    .product-data{
      width: 50%;
      display: flex;
      flex-flow: column wrap;
      .product-img{
          display: flex;
          justify-content: center;
          .swiper-img{
             border-radius: 4px;
          }
      }
      .product-desc{
          width: 150px;
          padding-top: 25px;
          margin: 0 auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
      }
      .product-time{
          display: flex;
          justify-content: center;
          padding: 20px 0;
          font-size: 12px;
          font-weight: 400;
          color: rgba(0,0,0,.4);
      }
    }
  }
=======
}
>>>>>>> 1fa1f3e7f1460fd8f854207383c7ba9042b2e2aa
</style>
