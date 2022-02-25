<template>
    <el-dialog
            :title="'选择'+this.name"
            :visible.sync="visible"
            top="13vh"
            width="65%"
    >
        <screen-form :title="this.name+'名称'" :screenForm="screenForm" :submitForm="submitForm"></screen-form>
        <el-checkbox-group v-model="checkFiles">
            <template v-for="item in list">
                <el-checkbox :label="item.id">
                    <el-image
                       :src="uploadHost+item.file_url"
                    >
                    </el-image>
                    <div class="text-overflow title">{{item.name}}</div>
                </el-checkbox>
            </template>
        </el-checkbox-group>
        <el-pagination
                class="pagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[15, 20, 25, 30]"
                :page-size="limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
        >
        </el-pagination>
        <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">关闭</el-button>
            <el-button type="primary" @click="selected">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import { env } from '@/config';
    import ScreenForm from '@/components/Resource/ScreenForm';

    export default {
        name: "Selector",
        components: {
            ScreenForm,
        },
        props: {
            name: {
                type: String,
                required: false
            },
            fileType: {
                type: String | Number,
                required: true,
                default: 1
            },
        },
        data(){
            return {
                screenForm: {
                    category_id: '',
                    keyword: '',
                    status: '',
                    created_at: '',
                },
                page: 1,
                limit: 15,
                total: 0,
                list: [ ],
                checkFiles: [],
                uploadHost: env.uploadHost,
                visible: false,
                loading: false,
            }
        },
        methods: {
            // 选中图片
            selected(){

            },
            //获取列表
            getList() {
                this.loading = true
                this.$store.dispatch('files/list', {
                    file_type: this.fileType,
                    page: this.page,
                    limit: this.limit,
                    ...this.screenForm
                }).then(res => {
                    if(res.code === 0){
                        const { list, total } = res.data || {}
                        this.list = list
                        this.total = total
                    }
                    this.loading = false
                })
            },
            //跳转页面
            handleSizeChange(val) {
                this.limit = val
                this.page = 1
                this.getList()
            },
            //下一页
            handleCurrentChange(val) {
                this.page = val
                this.getList()
            },
            submitForm(){
                this.page = 1
                this.getList()
            },

        },
        mounted() {
            this.getList()
        }
    };
</script>

<style scoped lang="less">
    /deep/ .el-checkbox-group{
        height: 435px;
        overflow: auto;
        .el-checkbox{
            position: relative;
            width: calc(calc(100% - 50px) / 5);
            margin: 0 10px 10px 0 !important;
            height: 135px;
            &:nth-child(5n){
                margin-right: 0 !important;
            }
            .el-checkbox__input{
                position: absolute;
                left: 10px;
                top: 10px;
                z-index: 1;
                opacity: 0;
            }
            .el-checkbox__label{
                padding: 0;
                width: 100%;
                .el-image{
                    border: 1px solid #eee;
                    border-radius: 4px;
                    height: 110px;
                    width: 100%;
                    img{
                        max-width: 100%;
                        max-height: 100%;
                        margin: auto;
                    }
                }
                .title{
                    width: 100%;
                }
            }

        }
        .el-checkbox:hover{
            .el-checkbox__input{
                opacity: 1;
            }
        }
        .is-checked{
            .el-checkbox__label{
                .el-image{
                    border: 1px solid #409EFF;
                }
            }
            .el-checkbox__input{
                opacity: 1;
            }
        }

    }
</style>
