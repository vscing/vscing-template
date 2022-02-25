<template>
    <el-form :inline="true" class="demo-form-inline" ref="screenForm" size="small" :model="screenForm">
        <el-form-item :label="title" prop="keyword">
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
                <el-option label="已使用" value="1"></el-option>
                <el-option label="未使用" value="2"></el-option>
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
            <el-button type="primary" @click="submitForm()">查询</el-button>
            <el-button @click="resetForm('screenForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "ScreenForm",
        props: {
            title: {
                type: String,
                required: true
            },
            screenForm: {
                type: Object,
                required: true
            },
            submitForm: {
                type: Function,
                default: function(){
                    return () => {}
                }
            },
        },
        data(){
            return {
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
            }
        },
        methods: {
            // 查询表单重置
            resetForm(formName) {
                console.log(this.$refs[formName])
                this.$refs[formName].resetFields();
            }
        }

    };
</script>

<style scoped lang="less">

</style>
