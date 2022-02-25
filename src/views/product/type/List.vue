<template>
    <div class="main">
        <!--        <el-row>-->
        <!--            <el-breadcrumb separator="/">-->
        <!--                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
        <!--                <el-breadcrumb-item><a href="/">产品管理</a></el-breadcrumb-item>-->
        <!--                <el-breadcrumb-item>产品列表</el-breadcrumb-item>-->
        <!--            </el-breadcrumb>-->
        <!--            <div>-->
        <!--                <span>产品列表</span>-->
        <!--            </div>-->
        <!--        </el-row>-->
        <el-form :inline="true" class="demo-form-inline" size="small" :model="screenForm" ref="screenForm">
            <el-form-item label="标题" prop="keyword">
                <el-input v-model="screenForm.keyword" placeholder="请输入关键字"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="category_id">
                <el-select v-model="screenForm.category_id">
                    <el-option label="全部产品" value="0"></el-option>
                    <el-option label="分类1" value="1"></el-option>
                    <el-option label="分类2" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="screenForm.status">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="显示" value="1"></el-option>
                    <el-option label="隐藏" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布时间" prop="created_at">
                <el-date-picker
                        v-model="screenForm.created_at"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row>
            <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加产品</el-button>
            <!--            <el-button size="small" icon="el-icon-sort">排序规则</el-button>-->
            <el-button size="small" @click="handleExcel">
                <export-excel></export-excel>
                导出
            </el-button>
            <!--            <el-button type="primary">专利导入</el-button>-->
        </el-row>
        <el-table
                class="mt20"
                v-loading="loading"
                tooltip-effect="light"
                :data="list"
                style="width: 100%"
                @selection-change=""
        >
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="patent_name"
                    label="缩略图">
            </el-table-column>
            <el-table-column
                    prop="patent_number"
                    label="产品名称">
            </el-table-column>
            <el-table-column
                    prop="patent_number"
                    label="编号">
            </el-table-column>
            <el-table-column
                    prop="patent_number"
                    label="所属分类">
            </el-table-column>
            <el-table-column
                    prop="patent_number"
                    label="零售价">
            </el-table-column>
            <el-table-column
                    prop="patent_auth_time"
                    sortable
                    label="发布日期">
                <template slot-scope="scope">
                    {{ scope.row.patent_auth_time | moment('YYYY-MM-DD') }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="patent_number"
                    label="浏览量">
            </el-table-column>
            <el-table-column
                    prop="patent_number"
                    label="排序">
            </el-table-column>
            <el-table-column
                    prop="patent_number"
                    label="状态">
            </el-table-column>
            <!--            <el-table-column-->
            <!--                    prop="is_price_record"-->
            <!--                    label="是否办理专利费用减缓备案"-->
            <!--            >-->
            <!--                <template slot-scope="scope">-->
            <!--                    {{scope.row.is_price_record === 2 ? '是':'否'}}-->
            <!--                </template>-->
            <!--            </el-table-column>-->
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!--                    <el-button-->
                    <!--                            size="mini"-->
                    <!--                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                    <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)"
                    >修改</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row)"
                    >删除</el-button>
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
    import ExportExcel from '@/assets/exportExcel.svg?inline'

    export default {
        components: {
            ExportExcel,
        },
        data() {
            return {
                page: 1,
                limit: 10,
                total: 0,
                list: [
                ],
                screenForm: {
                    category_id: '全部产品',
                    keyword: '',
                    status: '全部',
                    created_at: '',
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                loading: false,
            }
        },
        watch: {

        },
        methods: {
            // formatter(row, column, cellValue, index) {
            //     console.log(row, column, cellValue, index)
            // },
            handleAdd(){
                this.$router.push({
                    path: '/productCategory/add'
                })
            },
            handleEdit(key, row) {
                this.$router.push({
                    path: '/system/patent/edit/'+row.id
                })
            },
            handleDelete(row){
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row.id)
                    this.$store.dispatch('patent/del', {
                        id: row.id
                    }).then(res => {
                        if(res.code === 0){
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.page = 1
                            this.getList()
                        }else{
                            this.$message.error('删除失败');
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getList() {
                this.loading = true
                this.$store.dispatch('product/list', {
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
            handleSizeChange(val) {
                this.limit = val
                this.page = 1
                this.getList()
            },
            handleCurrentChange(val) {
                this.page = val
                this.getList()
            },
            handleExcel(){
                this.loading = true
                this.$store.dispatch('patent/excel', {})
                this.loading = false
            },
            // 表单提交
            onSubmit() {
                this.page = 1
                this.getList()
            },
            // 表单重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
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
    .main{
        margin: 24px;
        padding: 24px;
        background-color: #ffffff;
    }
</style>
