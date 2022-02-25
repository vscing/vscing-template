<template>
    <div class="login-wrap">
        <el-form
                class="login-form"
                label-position="top"
                label-width="80px"
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                @submit.native.prevent
        >
            <h2 class="login-title">管理后台</h2>
            <el-form-item prop="username">
                <el-input
                    class="login-input"
                    placeholder="请输入用户名"
                    v-model="ruleForm.username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                >
                    <i slot="prefix" class="el-input__icon el-icon-user"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    class="login-input"
                    placeholder="请输入密码"
                    type="password"
                    v-model="ruleForm.password"
                >
                    <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
            </el-form-item>
            <el-button class="login-btn" type="primary" :loading="loading" native-type="submit" @click="submitForm('ruleForm')">登录</el-button>
        </el-form>
    </div>
</template>
<script>
    import { mapActions } from "vuex";

    export default {
        name: "Login",
        data() {
            return {
                loading: false,
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { max: 32, message: '长度最大32个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, message: '长度最小6个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            //...mapActions('', ['login']),
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        this.$store.dispatch('user/login', this.ruleForm).then(res => {
                            this.$message({
                                message: res.msg ? res.msg : "登录成功",
                                type: "success",
                                onClose: () => {
                                    this.loading = false
                                    this.$router.replace({ path: '/' })
                                }
                            })
                        }).catch((err) => {
                            this.$message({
                                message: err.message ? err.message : "登录失败",
                                type: "error",
                                onClose: () => {
                                    this.loading = false
                                }
                            })
                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    };
</script>
<style lang="less" scoped>
    .login-wrap {
        height: 100vh;
        background-image: url('~@/assets/bg.svg');
        background-repeat: no-repeat;
        background-position: center 110px;
        background-size: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f0f2f5;
    }
    .login-form {
        width: 400px;
        background: #fff;
        border-radius: 5px;
        padding: 30px;
    }
    .login-btn {
        width: 100%;
    }
    .login-title {
        text-align: center;
        margin-bottom: 20px;
    }
    .login-input /deep/ .el-input__inner{
        height: 53px;
        line-height: 53px;
        font-size: 16px;
    }
    .el-input__icon{
        line-height: 53px;
        font-size: 14px;
        color: rgb(24, 144, 255);
    }
</style>
