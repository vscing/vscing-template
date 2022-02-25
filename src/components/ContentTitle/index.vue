<template>
    <el-row class="title-warp">
        <el-col :span="12">
            <div class="title-box">
                <el-button icon="el-icon-back" class="go-back" v-if="isBack" @click="goBack">返回</el-button>
                <span class="title">{{title}}</span>
                <el-button icon="el-icon-question" circle class="title-icon" @click="onHelp"></el-button>
            </div>
        </el-col>
        <el-col :span="12">
            <slot name="rightView"></slot>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "ContentTitle",
        props: {
            title: {
                type: String,
                required: true
            },
            onHelp: {
                type: Function,
                default: function(){
                    return () => {}
                }
            },
            isBack: {
                type: Boolean,
                default: false
            },
        },
        data(){
            return {

            }
        },
        methods: {
            goBack: function() {
                this.$router.go(-1)
            },
        }

    };
</script>

<style scoped lang="less">
    .title-warp {
        line-height: 24px;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        margin-bottom: 10px;
        .title-box{
            color: rgba(0, 0, 0, 0.85);
            .go-back{
                color: #409EFF;
                border: 0;
                padding-left: 0;
                background-color: #fff;
            }
            .title-icon{
                margin-left: 10px;
                color: #409EFF;
                border: 0;
                padding: 0;
                background-color: #ecf5ff;
            }
        }
    }
</style>
