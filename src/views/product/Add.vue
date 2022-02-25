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
        <el-page-header @back="goBack" content="添加产品">
        </el-page-header>

        <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
            <el-tab-pane label="基本信息" name="1"></el-tab-pane>
            <el-tab-pane label="详细描述" name="2"></el-tab-pane>
            <el-tab-pane label="图片&视频" name="3"></el-tab-pane>
            <el-tab-pane label="相关内容" name="4"></el-tab-pane>
            <el-tab-pane label="高级设置" name="5"></el-tab-pane>
        </el-tabs>
        <el-form
                class="demo-ruleForm"
                :model="ruleForm"
                ref="ruleForm"
                label-position="right"
                size="medium"
                label-width="100px"
        >
            <el-collapse v-model="activeCollapseName" @change="handleCollapseChange">
                <el-collapse-item title="基本信息" name="1">
                    <el-form-item
                        label="所属分类"
                        prop="category_id"
                        :rules="[
                            { required: true, message: '请选择所属分类', trigger: ['blur', 'change'] }
                        ]"
                    >
                        <el-select class="el-col el-col-8" v-model="ruleForm.category_id">
                            <el-option label="类别1" :value=1>
                                <el-radio>类别1</el-radio>
                            </el-option>
                            <el-option label="类别2" :value=2>
                                <el-radio>类别2</el-radio>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="产品名称"
                        prop="name"
                        :rules="[
                            { required: true, message: '请输入产品名称', trigger: ['blur', 'change'] }
                        ]"
                    >
                        <el-col :span="8">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item
                        label="最低起订量"
                        prop="min_number"
                        :rules="[
                            { required: true, message: '请输入最低起订量', trigger: ['blur', 'change'] }
                        ]"
                    >
                        <el-col :span="8">
                            <el-input v-model="ruleForm.min_number"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item
                        label="交货期"
                        prop="delivery_date"
                        :rules="[
                            { required: true, message: '请输入交货期', trigger: ['blur', 'change'] }
                        ]"
                    >
                        <el-col :span="8">
                            <el-input v-model="ruleForm.delivery_date"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item
                        label="计费重量"
                        prop="billing_weight"
                        :rules="[
                            { required: true, message: '请输入计费重量', trigger: ['blur', 'change'] }
                        ]"
                    >
                        <el-col :span="8">
                            <el-input v-model="ruleForm.billing_weight"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <span class="ml10">kg</span>
                        </el-col>
                    </el-form-item>
                </el-collapse-item>
                <el-collapse-item title="详细描述" name="2">
                    <el-form-item
                        label="产品描述"
                        prop="content"
                    >
                        <tinymce
                                :curValue="123"
                                @input="(val)=>{
                                    console.log(val)
                                }"
                                @imageSelectorCallback="()=>{
                                    this.$refs.selector.visible=true
                                }"
                        />
                    </el-form-item>
                    <el-form-item
                        label="概要描述"
                        prop="description"
                    >
                        <el-col :span="11">
                            <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="请输入内容"
                                v-model="ruleForm.description"
                            >
                            </el-input>
                        </el-col>
                        <el-button type="text" class="ml10">
                            从产品描述获取
                        </el-button>
                    </el-form-item>
                    <el-form-item
                            label="关键词"
                            prop="keywords"
                    >
                        <el-col :span="11">
                            <el-input v-model="ruleForm.keywords">
                            </el-input>
                        </el-col>
                        <el-button type="text" class="ml10">
                            从产品描述获取
                        </el-button>
                    </el-form-item>
                </el-collapse-item>
                <el-collapse-item title="图片&视频" name="3">
                    <el-form-item
                            label="添加图片"
                    >
                        <el-col :span="11">
                            <div class="imgBox"  @click="()=>{
                                this.$refs.selector.visible=true
                            }">
                                <i class="el-icon-plus"></i>
                                <span>上传多张图片</span>
                            </div>
                        </el-col>
                    </el-form-item>
<!--                    <el-form-item-->
<!--                            label="添加视频"-->
<!--                    >-->
<!--                        <el-col :span="11">-->
<!--                            <el-upload-->
<!--                                    action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                                    list-type="picture-card">-->
<!--                                <i class="el-icon-plus"></i>-->
<!--                            </el-upload>-->
<!--                            <el-dialog>-->
<!--                                <img width="100%" alt="">-->
<!--                            </el-dialog>-->
<!--                        </el-col>-->
<!--                    </el-form-item>-->
                </el-collapse-item>
                <el-collapse-item title="相关内容" name="4">
                    <div style="margin-bottom: 20px;">
                        <el-button
                                size="small"
                                @click="addTab(editableTabsValue)"
                        >
                            add tab
                        </el-button>
                    </div>
                    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
                        <el-tab-pane
                                v-for="(item, index) in editableTabs"
                                :key="item.name"
                                :label="item.title"
                                :name="item.name"
                        >
                            {{item.content}}
                        </el-tab-pane>
                    </el-tabs>
                </el-collapse-item>
                <el-collapse-item title="高级设置" name="5">
                    <el-tabs>
                        <el-tab-pane label="产品设置">

                        </el-tab-pane>
                        <el-tab-pane label="权限设置">
                            <el-alert
                                title="可针对网站前台访客身份设置对应权限，设置会员专享则仅有权限的登录会员才可做对应的操作。"
                                type="warning"
                                center
                                show-icon
                                :closable="false"
                            />
                        </el-tab-pane>
                        <el-tab-pane label="推广优化">
                            <el-alert
                                title="推广优化(修改默认规则需切换手动模式，如您不是专业人员建议使用自动模式，请谨慎操作！)"
                                type="warning"
                                center
                                show-icon
                                :closable="false"
                            >
                            </el-alert>
                            <el-form-item
                                    label="优化规则"
                                    prop="seo_rule"
                            >
                                <el-radio-group v-model="ruleForm.seo_rule">
                                    <el-radio-button label="自动"></el-radio-button>
                                    <el-radio-button label="手动"></el-radio-button>
                                </el-radio-group>
                            </el-form-item>

                        </el-tab-pane>
                    </el-tabs>
                </el-collapse-item>
            </el-collapse>
        </el-form>
        <selector name="图片" ref="selector" :fileType="1"></selector>
    </div>
</template>

<script>
    import {env} from '@/config';
    import Storage from 'store';
    import Tinymce from '@/components/Tinymce';
    import Selector from '@/components/Resource/Selector';

    export default {
        components: {
            Tinymce,
            Selector
        },
        data() {
            return {
                activeTabName: '1',
                activeCollapseName: ['1','2','3','4','5'],

                editableTabsValue: '2',
                editableTabs: [{
                    title: 'Tab 1',
                    name: '1',
                    content: 'Tab 1 content'
                }, {
                    title: 'Tab 2',
                    name: '2',
                    content: 'Tab 2 content'
                }],
                tabIndex: 2,
                ruleForm: {
                    category_id: 0,
                    name: '',
                    min_number: 0,
                    delivery_date: '',
                    billing_weight: '0.00',
                    description: '',
                    keywords: '',
                    views: '',
                    status: '',
                    auth_type: '',

                }
            };
        },
        watch: {
        },
        methods: {
            handleCollapseChange(val) {
                this.activeTabName = val[0];
            },
            handleTabClick(tab, event) {
                const id = event.target.getAttribute('id');
                const name = id.replace('tab-', '');
                this.activeCollapseName = ['1', '2', '3', '4', '5'].filter((val) => {
                    if (Number(val) >= Number(name)) {
                        return val
                    }
                });
            },

            goBack() {
                this.$router.push({path: '/product/list'})
            },

            addTab(targetName) {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs.push({
                    title: 'New Tab',
                    name: newTabName,
                    content: 'New Tab content'
                });
                this.editableTabsValue = newTabName;
            },

            removeTab(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }

                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('patent/add', this.ruleForm).then(res => {
                            if(res.code === 0){
                                this.$message({
                                    message: res.msg ? res.msg : "录入成功",
                                    type: "success"
                                })
                                this.$router.replace({ path: '/system/patent/list' })
                            }else{
                                this.$message({
                                    message: res.msg ? res.msg : "录入失败",
                                    type: "error"
                                })
                            }
                        })
                    } else {
                        console.log(this.ruleForm)
                        this.$message({
                            message: "请完善表单",
                            type: "error"
                        })
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            remove(key, item) {
                const index = this.ruleForm[key].indexOf(item)
                if (index !== -1) {
                    this.ruleForm[key].splice(index, 1)
                }
            },
            add(key) {
                this.ruleForm[key].push({
                    value: '',
                    key: Date.now()
                });
            },
            fileRemove(file, fileList, key) {
                console.log(file, fileList, key);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ruleForm[key].splice(this.ruleForm[key].findIndex(item => item.url === file.url), 1)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                    fileList.push(file)
                });
            },
            fileSuccess(res, file, fileList, key) {
                if(res.code === 0){
                    this.ruleForm[key].push({
                        name: file.name,
                        url: res.data.url
                    })
                }else{
                    this.$message({
                        message: res.msg ? res.msg : "上传失败",
                        type: "error"
                    })
                    fileList.pop()
                }
            },
            fileError(file, fileList) {
                this.$message({
                    message: "上传失败",
                    type: "error"
                })
                fileList.pop()
            },
        },
        created(){
        },
        mounted() {
        },
        updated(){
        }
    };
</script>

<style lang="less" scoped>
    /deep/ .el-page-header {
        margin-bottom: 20px;
    }
    /deep/ .el-collapse-item__header {
        background: #F1F1F1;
        border-bottom: 1px solid #CCCCCC;
        padding: 0 20px;
        margin-bottom: 1px;
    }
    /deep/ .el-collapse-item__header.is-active {
        border-bottom-color: transparent;
    }
    /deep/ .el-collapse-item__content {
        padding: 24px;
    }
    .main{
        margin: 24px;
        padding: 24px;
        background-color: #ffffff;
    }
    .imgBox{
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        width: 148px;
        height: 148px;
        vertical-align: top;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        i{
            font-size: 28px;
            color: #8c939d;
        }
        &:hover{
            border-color: #409EFF;
        }
    }
</style>
