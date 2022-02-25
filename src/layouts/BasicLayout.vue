<template>
    <el-container>
        <el-aside class="sidebar" :style="{width:(isCollapse ? '64px':'200px')}">
            <!--        <el-aside :style="{width:(isCollapse ? '64px':'200px')}">-->
            <!--            <div class="ant-pro-sider-menu-logo" id="logo">-->
            <!--                <router-link to="/system">-->
            <!--                    <img src="@/assets/logo.svg" alt="logo">-->
            <!--                    <h1>寻雾科技</h1>-->
            <!--                </router-link>-->
            <!--            </div> https://rdap.verisign.com/com/v1/domain/zqlm.com
            https://whois.aliyun.com/rdap/domain/17350.com
            http://tool.sufeinet.com/Master/Whois.aspx?domain=zqlm.com
            -->
            <div class="logo">
                <router-link to="/system">
                    <img src="@/assets/logo.svg" alt="寻雾科技" class="logo-img">
                    <h1 v-if="!isCollapse" class="logo-title">寻雾科技</h1>
                </router-link>
            </div>
            <el-scrollbar>
                <el-menu
                    :default-active="currentRoutes"
                    @open="handleOpen"
                    @close="handleClose"
                    unique-opened
                    router
                    :collapse-transition="false"
                    :collapse="isCollapse"
                >
                    <template v-for="value in list">
                            <el-menu-item
                                v-if="typeof value.children === 'undefined'"
                                :index="value.name"
                                :route="value.path"
                            >
                                <i :class="value.meta.icon"></i>
                                <span slot="title">{{ value.meta.title }}</span>
                            </el-menu-item>
                            <el-submenu
                                v-if="typeof value.children !== 'undefined'"
                                :index="value.name"
                            >
                                <template slot="title">
                                    <i :class="value.meta.icon"></i>
                                    <span slot="title">{{ value.meta.title }}</span>
                                </template>
                                <template v-for="item in value.children">
                                    <el-menu-item
                                        :index="item.name"
                                        :route="item.path"
                                    >
                                        {{ item.meta.title }}
                                    </el-menu-item>
                                </template>
                            </el-submenu>
                        </template>
                </el-menu>
            </el-scrollbar>
        </el-aside>
        <el-container>
            <el-header>
                <div class="header">
                    <span class="header-trigger" @click="collapse(!isCollapse)">
                        <i class="el-icon-s-fold" v-if="!isCollapse"></i>
                        <i class="el-icon-s-unfold" v-if="isCollapse"></i>
                    </span>
                    <div style="flex: 1 1 0%;"></div>
                    <div class="header-right">
                        <el-dropdown size="medium">
                            <span class="header-dropdown el-dropdown-link">
                                <span class="avatar">
                                    <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="avatar">
                                </span>
                                <span class="username">Serati Ma</span>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <i class="el-icon-user"></i>
                                    个人中心
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <i class="el-icon-setting"></i>
                                    个人设置
                                </el-dropdown-item>
                                <el-dropdown-item divided>
                                    <div @click="logout">
                                        <i class="el-icon-switch-button"></i>
                                        退出登录
                                    </div>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-header>
            <el-main>
                <router-view></router-view>
                <el-footer>寻雾科技提供技术支持</el-footer>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    //import LeftMenu from "@/components/LeftMenu"
    import LogoSvg from '@/assets/logo.svg?inline'
    import storage from "store";
    import { asyncRouterMap } from '@/config/router.config'

    export default {
        name: "BasicLayout",
        components: {
            //LeftMenu
        },
        data() {
            return {
                isCollapse: false,
                list: [],
                ages: [
                    {
                        name: '123',
                        age: 123
                    },
                    {
                        name: '456',
                        age: 456
                    }
                ]
            };
        },
        computed: {
            // 获取当前路由的子路由
            routes: function() {
                const routerList = this.$router.options.routes
                const childrenList = routerList.filter( item => item.children && item.children.length > 0 )
                return []
            },
            //default-active的值来匹配index的值，执行高亮
            currentRoutes: function() {
                const { meta, path, name } = this.$route || {}
                const { menu } = meta || {}
                if(menu){
                    return menu
                }
                //return path
                return name
            }
        },
        watch: {
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            collapse(val){
                console.log(val)
                this.isCollapse = val
            },
            logout(){
                storage.remove('userToken')
                this.$router.replace({ path: '/login' })
            },
            setList(){

                this.list = this.$router.options.routes[2].children
                console.log(this.list)
            }
        },
        created(){
            console.log(1)
        },
        mounted() {
            console.log(2)
            this.setList()
        },
        updated(){
            console.log(3)
        }
    };
</script>

<style lang="less" scoped>
    @import "./BasicLayout.less";
</style>
