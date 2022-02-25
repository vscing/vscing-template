<template>
    <el-dialog
            :title="'上传'+this.name"
            :visible.sync="visible"
            top="13vh"
            width="53%"
            @close="closeDialog"
    >
        <el-upload
                ref="fileUpload"
                class="dialog-upload"
                drag
                action=""
                :http-request="handleFileUpload"
                :on-preview="handleFilePreview"
                :before-upload="handleFileBeforeUpload"
                :before-remove="handleFileBeforeRemove"
                :on-remove="handleFileRemove"
                :file-list="fileList"
                list-type="picture"
                multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                <slot name="text"></slot>
            </div>
            <div class="el-upload__tips">
                <slot name="tips"></slot>
            </div>
        </el-upload>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="visible = false">关闭</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import { env } from '@/config';

    export default {
        name: "Upload",
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
            size: {
                type: Number,
                required: true
            },
            extRule: {
                type: Array,
                required: true
            },
        },
        data(){
            return {
                visible: false,
                fileList: [ ],
            }
        },
        methods: {
            //验证文件
            handleFileBeforeUpload(file){
                const fileName = file.name,
                    isSize = file.size / 1024 / 1024 > this.size;
                // 后缀获取
                let flieArr = fileName.split('.');
                let ext = flieArr[flieArr.length - 1];
                if(!ext){
                    this.$message.error("上传"+this.name+"格式"+this.extRule.join('、'));
                    return false;
                }
                // 进行图片匹配
                let result = this.extRule.some(function (item) {
                    return item === ext
                })
                if (!result) {
                    this.$message.error("上传"+this.name+"格式"+this.extRule.join('、'));
                    return false;
                }
                // 这里常规检验，看项目需求而定
                if (isSize) {
                    this.$message.error("上传"+this.name+"大小不超过"+this.size+"M");
                    return false;
                }
            },
            //自定义上传
            handleFileUpload(option){
                console.log(option)
                const file = option.file;
                // 根据后台需求数据格式
                const form = new FormData();
                // 文件对象
                form.append("file", file);
                form.append("file_type", this.fileType);
                this.$store.dispatch('files/add', form).then(res => {
                    if(res.code === 0){
                        this.fileList.push({
                            id: res.data.id,
                            name: res.data.name,
                            url: env.uploadHost + res.data.url
                        })
                        this.$emit('fileCallback')
                    }else{
                        this.$message.error(res.msg ? res.msg:"上传失败");
                    }
                })
            },
            //删除上传图片
            handleFileBeforeRemove(file, fileList){
                const { id, name } = file || {}
                if(!id){
                    return;
                }
                return this.$store.dispatch('files/del', {id, name}).then(res => {
                    if(res.code === 0){
                        this.$message.success(res.msg ? res.msg : "删除成功");
                        this.$emit('fileCallback')
                    }else{
                        this.$message.error(res.msg ? res.msg:"删除失败");
                        return new Promise((reject) =>{
                            reject()
                        })
                    }
                })
            },
            handleFileRemove(file, fileList) {
                this.fileList = fileList;
            },
            //点击图片
            handleFilePreview(file) {
                console.log(file);
            },
            //dialog关闭事件
            closeDialog() {
                this.$refs.fileUpload.clearFiles()
                this.fileList = [];
            },
        }
    };
</script>

<style scoped lang="less">
    .dialog-upload{
        /deep/ .el-upload{
            width: 100%;
            .el-upload-dragger{
                width: 100%;
                .el-icon-upload{
                    margin-top: 24px;
                }
                .el-upload__text{
                    color: rgba(0, 0, 0, 0.65);
                    font-size: 16px;
                    line-height: 26px;
                }
                .el-upload__tips{
                    color: rgba(0,0,0,.45);
                    font-size: 14px;
                    line-height: 26px;
                }
            }
        }
        /deep/ .el-upload-list{
            overflow-y: auto;
            max-height: 35vh;
            .el-upload-list__item{
                /*transition: unset;*/
                border: 1px solid #ebedf0;
            }
        }



    }
</style>
