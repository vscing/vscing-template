<template>
    <div class="main">
        <div class="page-header-box">
            <div class="page-header-heading">
                <span class="page-header-heading-title">网站概况</span>
            </div>
            <div class="page-header-wrapper">
                <div class="page-header-content">
                    <div class="avatar">
                        <el-avatar :size="70" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"/>
                    </div>
                    <div class="content">
                        <div class="content-title">
                            下午好，天野远子<span class="welcome-text">，我猜你可能累了</span>
                        </div>
                        <div>前端工程师 | 蚂蚁金服 - 某某某事业群 - VUE平台</div>
                    </div>
                </div>
                <div class="extra-content">
                    <div class="stat-item">
                        <statistic title="内容总数" :value="56" />
                    </div>
                    <div class="stat-item">
                        <statistic title="产品总数" :value="8" suffix="/ 24" />
                    </div>
                    <div class="stat-item">
                        <statistic title="页面总数" :value="2223" />
                    </div>
                    <div class="stat-item">
                        <statistic title="客户总数" :value="2223" />
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <el-card shadow="never">
                <div slot="header">
                    <span>业务中心</span>
                </div>
                <el-row type="flex" justify="space-between">
                    <el-col :span="12">
                        <div class="site-info">
                            <p><span>站点 </span>demo.mayibang.co</p>
                            <p><span>服务周期： </span>2018.10.11 - 2021.10.11 <span class="site-day">(剩余376天)</span></p>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="site-operate">
                            <el-button type="primary" plain>更换域名</el-button>
                            <el-button type="danger" plain>续费</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
            <el-row class="mt10" type="flex" justify="space-between">
                <el-col :span="6">
                    <el-card shadow="never">
                        <div slot="header">
                            <span>SEO收录/设置</span>
                        </div>
                        <ul>
                            <li>
                                <i></i>
                                百度
                                <span>150</span>
                            </li>
                            <li>
                                <i></i>
                                搜狗
                                <span>150</span>
                            </li>
                            <li>
                                <i></i>
                                360
                                <span>150</span>
                            </li>
                        </ul>
                        <div>
                            <router-link to="/system">
                                网站关键词优化
                            </router-link>
                            <router-link to="/system">
                                网站地图更新
                            </router-link>
                            <router-link to="/system">
                                网址提交
                            </router-link>
                            <router-link to="/system">
                                搜索引擎设置
                            </router-link>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="12" class="mlf20">
                    <el-card shadow="never">
                        <div slot="header">
                            <span>流量数据</span>
                        </div>
                        <el-row type="flex" justify="space-between">
                            <basic-line-chart
                                :id="'timeLine'"
                                :loading="timeLoading"
                                :optRenderer="'canvas'"
                                :option="timeLineOption"
                                width="100%"
                                height="205px"
                            >
                            </basic-line-chart>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="never">
                        <div slot="header">
                            <span>数据使用</span>
                        </div>
                        <ul class="data-list">
                            <li>
                                <p>
                                    网页空间
                                    <span>/无限容量</span>
                                    <el-progress class="mt10" :percentage="90" :show-text="false" :color="setColor"></el-progress>
                                </p>
                            </li>
                            <li>
                                <p>
                                    视频库
                                    <span>0GB</span>
                                    <el-progress class="mt10" :percentage="0" :show-text="false" :color="setColor"></el-progress>
                                </p>
                            </li>
                            <li>
                                <p>
                                    图片库
                                    <span>0GB</span>
                                    <el-progress class="mt10" :percentage="0" :show-text="false" :color="setColor"></el-progress>
                                </p>
                            </li>
                            <li>
                                <p>
                                    文件库
                                    <span>0GB</span>
                                    <el-progress class="mt10" :percentage="0" :show-text="false" :color="setColor"></el-progress>
                                </p>
                            </li>
                            <li>
                                <p>
                                    短信
                                    <span>0条</span>
                                    <el-progress class="mt10" :percentage="0" :show-text="false" :color="setColor"></el-progress>
                                </p>
                            </li>
                        </ul>
                    </el-card>
                </el-col>
            </el-row>
            <el-row class="mt10" type="flex" justify="space-between">
                <el-col :span="8">
                    <el-card shadow="never">
                        <div slot="header">
                            <span>SEO收录/设置</span>
                        </div>
                        <ul>
                            <li>
                                <i></i>
                                百度
                                <span>150</span>
                            </li>
                            <li>
                                <i></i>
                                搜狗
                                <span>150</span>
                            </li>
                            <li>
                                <i></i>
                                360
                                <span>150</span>
                            </li>
                        </ul>
                        <div>
                            <router-link to="/system">
                                网站关键词优化
                            </router-link>
                            <router-link to="/system">
                                网站地图更新
                            </router-link>
                            <router-link to="/system">
                                网址提交
                            </router-link>
                            <router-link to="/system">
                                搜索引擎设置
                            </router-link>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8" class="mlf20">
                    <el-card shadow="never">
                        <div slot="header">
                            <span>流量数据</span>
                        </div>
                        <el-row type="flex" justify="space-between">
                            <basic-line-chart
                                    :id="'timeLine'"
                                    :loading="timeLoading"
                                    :optRenderer="'canvas'"
                                    :option="timeLineOption"
                                    width="100%"
                                    height="205px"
                            >
                            </basic-line-chart>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="never">
                        <div slot="header">
                            <span>数据使用</span>
                        </div>
                        <ul class="data-list">
                            <li>
                                <p>
                                    网页空间
                                    <span>/无限容量</span>
                                    <el-progress class="mt10" :percentage="90" :show-text="false" :color="setColor"></el-progress>
                                </p>
                            </li>
                            <li>
                                <p>
                                    视频库
                                    <span>0GB</span>
                                    <el-progress class="mt10" :percentage="0" :show-text="false" :color="setColor"></el-progress>
                                </p>
                            </li>
                            <li>
                                <p>
                                    图片库
                                    <span>0GB</span>
                                    <el-progress class="mt10" :percentage="0" :show-text="false" :color="setColor"></el-progress>
                                </p>
                            </li>
                            <li>
                                <p>
                                    文件库
                                    <span>0GB</span>
                                    <el-progress class="mt10" :percentage="0" :show-text="false" :color="setColor"></el-progress>
                                </p>
                            </li>
                            <li>
                                <p>
                                    短信
                                    <span>0条</span>
                                    <el-progress class="mt10" :percentage="0" :show-text="false" :color="setColor"></el-progress>
                                </p>
                            </li>
                        </ul>
                    </el-card>
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>
    import Statistic from '@/components/Statistic';
    import BasicLineChart from '@/components/BasicLineChart';

    export default {
        components: {
            Statistic,
            BasicLineChart
        },
        data() {
            return {
                timeLineOption: {},
                timeLoading: false,
            };
        },
        watch: {

        },
        methods: {
            setColor(percentage) {
                if (percentage > 80) {
                    return '#dd2f00';
                } else if (percentage > 60) {
                    return '#ff9900';
                } else {
                    return '#20a53a';
                }
            },
            getData() {
                this.loading = true
                this.$store.dispatch('patent/chart').then(res => {
                    if(res.code === 0){
                        this.lineData = res.data
                        this.drawChart()
                    }
                    this.loading = false
                })
            },
            setLineOption() {
                this.timeLineOption = {
                    title: {
                        text: '折线图堆叠'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        orient: 'horizontal',
                        x: 'center',      //可设定图例在左、右、居中
                        y: 'bottom',     //可设定图例在上、下、居中
                        padding: [0,50,0,0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                        data: ['PV', 'UV']
                    },
                    grid: {
                        top: '3%',
                        left: '3%',
                        right: '4%',
                        bottom: '10%',
                        containLabel: true,
                        borderColor: '#ccc'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false, //x轴是否不从0开始
                        data: ['10/01', '10/02', '10/03', '10/04', '10/05', '10/06', '10/07'],
                        axisTick: { //取消坐标刻度
                            show: true
                        },
                        //设置轴线的属性
                        axisLine:{
                            lineStyle:{
                                color:'#dfdfdf',
                                width: 1,//这里是为了突出显示加上的
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',
                        axisTick: { //取消坐标刻度
                            show: false
                        },
                        axisLine: { //取消坐标轴
                            show: false
                        },
                        //网格样式
                        splitLine: {
                            show: true,
                            lineStyle:{
                                color: ['#e9e9e9'],
                                width: 1,
                                type: 'dashed'
                            }
                        },
                    },
                    series: [
                        {
                            name: 'UV',
                            data: [9, 27, 13, 12, 10, 2, 0],
                            type: 'line',
                            smooth: 0.5,
                            //symbol: 'circle', //折线点设置为实心点
                            //symbolSize: 6, //折线点的大小
                            areaStyle: {
                                opacity: 0.1
                            },
                            itemStyle: {
                                normal: {
                                    color: "#3edbbb", //折线点的颜色
                                    lineStyle: {
                                        color: "#3edbbb" //折线的颜色
                                    }
                                }
                            },
                        },
                        {
                            name: 'PV',
                            data: [10, 27, 13, 12, 10, 2, 0],
                            type: 'line',
                            smooth: 0.5,
                            //symbol: 'circle', //折线点设置为实心点
                            //symbolSize: 6, //折线点的大小
                            areaStyle: {
                                opacity: 0.1
                            },
                            itemStyle: {
                                normal: {
                                    color: "#7bc0f2", //折线点的颜色
                                    lineStyle: {
                                        color: "#7bc0f2" //折线的颜色
                                    }
                                }
                            },
                        },
                    ],
                    textStyle: {
                        color: 'rgba(0, 0, 0, 0.65)'
                    },

                }
            },
        },
        created(){
            //this.getData()
        },
        mounted() {
            const e = document.createEvent('Event')
            e.initEvent('resize', true, true)
            window.dispatchEvent(e)
            this.setLineOption()
        },
        updated(){
        }
    };
</script>

<style lang='less' scope>
    .page-header-box{
        background-color: #fff;
        overflow: hidden;
        padding: 12px 24px;
        .page-header-heading{
            margin-top: 8px;
            width: 100%;
            overflow: hidden;
            .page-header-heading-title {
                display: block;
                float: left;
                margin-bottom: 0;
                padding-right: 12px;
                color: rgba(0,0,0,.85);
                font-weight: 600;
                font-size: 20px;
                line-height: 32px;
            }
        }
        .page-header-wrapper{
            padding-top: 12px;
            display: flex;
            width: 100%;
            box-sizing: border-box;
            align-items: center;
            .page-header-content{
                flex: auto;
                display: flex;
                align-items: center;
                .avatar{
                    flex: 0 1 72px;
                }
                .content{
                    margin-left: 24px;
                    color: rgba(0,0,0,.45);
                    line-height: 22px;
                    box-sizing: border-box;
                    .content-title{
                        margin-bottom: 12px;
                        color: rgba(0,0,0,.85);
                        font-weight: 500;
                        font-size: 20px;
                        line-height: 28px;
                    }
                }
            }
            .extra-content{
                flex: none;
                .stat-item{
                    position: relative;
                    display: inline-block;
                    padding: 0 32px;
                    &:last-child{
                        padding-right: 0;
                    }
                    &:not(:last-child){
                        &::after{
                            position: absolute;
                            top: 8px;
                            right: 0;
                            width: 1px;
                            height: 40px;
                            background-color: #e8e8e8;
                            content: "";
                        }
                    }
                }
            }
        }
    }
    .content{
        padding: 20px;
        .site-info{
            font-size: 14px;
            p{
                span{
                    color: #999;
                }
               .site-day{
                   color: #f60;
               }
            }
        }
        .site-operate{
            text-align: right;
        }
    }
    .data-list{
        li{
            p{
                font-size: 12px;
                &:first-child{
                    margin-top: 0;
                }
                span{
                    float: right;
                    font-weight: 700;
                }
            }
        }
    }
</style>
