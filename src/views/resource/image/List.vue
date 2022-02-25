<template>
    <div class="main">
        <content-title title="图片库" :onHelp="handleDelete">
            <template #rightView>
<!--                <div style="text-align: right">123</div>-->
            </template>
        </content-title>
        <screen-form title="图片名称" :screenForm="screenForm" :submitForm="submitForm"></screen-form>
        <el-row>
            <el-button type="primary" size="small" icon="el-icon-upload2" @click="()=>{
                this.$refs.resourceUpload.visible = true
            }">
                本地上传
            </el-button>
            <el-button size="small" icon="el-icon-setting">
                分类管理
            </el-button>
        </el-row>
        <resource-upload
                ref='resourceUpload'
                name="图片"
                @fileCallback="fileCallback"
                :fileType="1"
                :size="2"
                :extRule="['png', 'jpg', 'jpeg', 'gif']"
        >
            <template #text>
                将图片拖到此处，或<em>点击上传</em>
            </template>
            <template #tips>
                只能上传jpg/png/jpeg/gif文件，且不超过2mb
            </template>
        </resource-upload>
        <el-table
                class="mt20"
                v-loading="loading"
                tooltip-effect="light"
                :data="list"
                style="width: 100%"
        >
            <!--                @selection-change=""-->
<!--            <el-table-column-->
<!--                    type="selection"-->
<!--                    width="55">-->
<!--            </el-table-column>-->
            <el-table-column
                    label="缩略图">
                <template slot-scope="scope">
                    <div class="img-box">
                        <el-image
                            :src="uploadHost+scope.row.file_url"
                        >
                        </el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="图片名称">
            </el-table-column>
            <el-table-column
                    label="所属分类">
                <template slot-scope="scope">
                    {{scope.row.category_id ? scope.row.category_name : '无分类'}}
                </template>
            </el-table-column>
            <el-table-column
                    label="尺寸">
                <template slot-scope="scope">
                    {{scope.row.file_width}} * {{scope.row.file_height}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="display_size"
                    label="文件大小">
            </el-table-column>
            <el-table-column
                    prop="created_at"
                    label="上传时间">
            </el-table-column>
            <el-table-column
                    label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status === 1" class="great">已使用</span>
                    <span v-if="scope.row.status === 2">未使用</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-dropdown>
                        <el-button type="text" class="el-dropdown-link">
                            编辑 <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-button type="text" class="el-dropdown-link" @click="handleDelete(scope.row)">
                                    <i class="el-icon-circle-close"></i> 删除
                                </el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="text" class="el-dropdown-link">
                                    <i class="el-icon-view"></i> 预览
                                </el-button>
                            </el-dropdown-item>
<!--                            <el-dropdown-item>-->
<!--                                <el-button type="text" class="el-dropdown-link" @click="handleDownload(scope.row)">-->
<!--                                    <i class="el-icon-download"></i> 下载-->
<!--                                </el-button>-->
<!--                            </el-dropdown-item>-->
                            <el-dropdown-item>
                                <el-button type="text" class="el-dropdown-link">
                                    <shift></shift> 转移
                                </el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 15, 20, 25, 30]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
    import { env } from '@/config';
    import Shift from '@/assets/shift.svg?inline';
    import ContentTitle from '@/components/ContentTitle';
    import ScreenForm from '@/components/Resource/ScreenForm';
    import ResourceUpload from '@/components/Resource/Upload';

    export default {
        components: {
            Shift,
            ContentTitle,
            ScreenForm,
            ResourceUpload
        },
        data() {
            return {
                screenForm: {
                    category_id: '',
                    keyword: '',
                    status: '',
                    created_at: '',
                },
                page: 1,
                limit: 10,
                total: 0,
                list: [ ],
                uploadHost: env.uploadHost,
                loading: false,
            }
        },
        watch: {

        },
        methods: {
            //获取列表
            getList() {
                this.loading = true
                this.$store.dispatch('files/list', {
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
            //删除图片
            handleDelete(row){
                this.$confirm('确定删除'+row.name+'这张图片吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row.id)
                    this.$store.dispatch('files/del', {
                        id: row.id,
                        name: row.name
                    }).then(res => {
                        if(res.code === 0){
                            this.$message.success(res.msg ? res.msg : "删除成功");
                            this.page = 1
                            this.getList()
                        }else{
                            this.$message.error(res.msg ? res.msg : '删除失败');
                        }
                    })
                });
            },
            //下载图片
            handleDownload(row) {
                const image = new Image();
                // 解决跨域 Canvas 污染问题
                image.setAttribute("crossOrigin", "anonymous");
                image.onload = function() {
                    const canvas = document.createElement("canvas");
                    canvas.width = image.width;
                    canvas.height = image.height;
                    var context = canvas.getContext("2d");
                    context.drawImage(image, 0, 0, image.width, image.height);
                    var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

                    var a = document.createElement("a"); // 生成一个a元素
                    var event = new MouseEvent("click"); // 创建一个单击事件
                    a.target = "_bank";
                    a.download = row.name || "photo"; // 设置图片名称
                    a.href = url; // 将生成的URL设置为a.href属性
                    a.dispatchEvent(event); // 触发a的单击事件
                }
                image.src = env.uploadHost+row.file_url;
            },

            handleEdit(key, row) {
                this.$router.push({
                    path: '/system/patent/edit/'+row.id
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
            // 查询表单提交
            submitForm() {
                this.page = 1
                this.getList()
            },
            // 上传结束回调
            fileCallback() {
                this.page = 1
                this.getList()
            }
        },
        created(){
            this.getList()
        },
        mounted() {

        },
        updated(){
        }
    };
</script>

<style lang="less" scoped>
    @import "~@/styles/resource/index.less";
</style>
