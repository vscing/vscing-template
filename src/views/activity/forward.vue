
<script setup lang="ts">
import { ref } from 'vue';
import {
  Field as VantField,
  Uploader as VantUploader,
  Button as VantButton,
  Toast
} from 'vant';
import { Images } from '@/assets/images';
import { forwardImg, uploadImage } from '@/api/activity';
import { to } from '@/utils';

const fileList1 = ref<any[]>([]);
const fileList2 = ref<any[]>([]);
const fileList3 = ref<any[]>([]);
const phone = ref('');
const btnDisable = ref(false);

const beforeRead = (file) => {
  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    Toast('请上传 jpg或png 格式图片');
    return false;
  }
  return true;
}

const afterRead = async(file) => {
  file.status = 'uploading';
  file.message = '上传中...';
  const url = await upload(file);
  if(url) {
    file.status = 'success';
    file.message = '';
    file.url = url;
  } else {
    file.status = 'failed';
    file.message = '上传失败';
  }
};

const upload = async(file) => {
  const formData = new FormData();
  formData.append('file', file.file);
  const [_, res] = await to(uploadImage(formData));
  let url = '';
  if(res) {
    url = res.url;
  }
  return url;
}

const submit = async() => {
  btnDisable.value = true;
  if(!phone.value) {
    Toast('请输入手机号');
    return false;
  }
  const regex = /^1[3456789]\d{9}$/;
  if(!regex.test(phone.value)) {
    Toast.fail('请输入正确手机格式')
    return;
  }
  if(fileList1.value.length === 0) {
    Toast('请上传关注食艺术公众号截图');
    return false;
  }
  if(fileList2.value.length === 0) {
    Toast('请上传转发社群截图');
    return false;
  }
  if(fileList3.value.length === 0) {
    Toast('请上传转发朋友圈截图');
    return false;
  }
  const [err, res] = await to(forwardImg({
    phone: phone.value,
    img1_url: fileList1.value[0]?.url,
    img2_url: fileList2.value[0]?.url,
    img3_url: fileList3.value[0]?.url
  }));
  if(res) {
    Toast.success('参加成功')
    btnDisable.value = false;
    return
  }
  Toast.fail(err.message ? err.message : '参加失败')
  btnDisable.value = false;
}
</script>

<template>
  <div class="warp">
    <div class="explain">
      <div class="title-box">
        <img :src="Images.zuo" class="icon"/>
        <span>食艺术转发活动</span>
        <img :src="Images.you" class="icon"/>
      </div>
      <ul class="tips">
        <li>1.关注食艺术小板报订阅号切图。</li>
        <li>1.转发该文章到其他社群停留5分钟进行切图。</li>
        <li>2.转发朋友圈进行切图。</li>
        <li>3.填写平台注册手机号。</li>
      </ul>
    </div>
    <div class="phone-box">
      <p>食艺术ID（绑定平台的手机号）</p>
      <VantField v-model="phone" placeholder="在此输入手机号" class="input" />
    </div>
    <div class="upload-box">
      <p>关注食艺术公众号截图</p>
      <VantUploader 
        class="file" 
        v-model="fileList1" 
        :before-read="beforeRead"
        :after-read="afterRead"
        preview-size="80" 
        :max-count="1" 
        :max-size="15 * 1024 * 1024"
      />
    </div>
    <div class="upload-box">
      <p>转发社群截图</p>
      <VantUploader 
        class="file" 
        v-model="fileList2" 
        :before-read="beforeRead"
        :after-read="afterRead"
        preview-size="80" 
        :max-count="1" 
        :max-size="15 * 1024 * 1024"
      />
    </div>
    <div class="upload-box">
      <p>转发朋友圈截图</p>
      <VantUploader 
        class="file" 
        v-model="fileList3" 
        :before-read="beforeRead"
        :after-read="afterRead"
        preview-size="80" 
        :max-count="1" 
        :max-size="15 * 1024 * 1024"
      />
    </div>
    <VantButton class="button" @click="submit()" :disabled="btnDisable">提交</VantButton>
  </div>
</template>

<style scoped lang="less">
.warp {
  background-color: #0B0629;
  min-height: 100vh;
  overflow: hidden;
  font-family: PingFang SC-Bold, PingFang SC;
  color: #ffffff;
  padding: 15px;
  .explain {
    border-radius: 5px;
    background-image: linear-gradient(to bottom, #2C2857, #1A1530);
    color: #ffffff;
    padding: 20px 10px;
    .title-box {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
      .icon {
        width: 20px;
        margin: 0 10px;
      }
    }
    .tips {
      li {
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 10px;
        &:nth-child(4) {
          margin-bottom: 0px;
        }
      }
    }
  }
  .phone-box {
    margin-top: 20px;
    .input {
      margin-top: 10px;
      background-color: #241F3D;
      border-radius: 4px;
    }
    :deep(.van-field) {
      input {
        color: #ffffff !important;
      }
    }
  }
  .upload-box {
    margin-top: 20px;
    p {
      font-size: 14px;
      font-weight: bold;
      color: #F5F5F5;
      font-family: PingFang SC-Bold, PingFang SC;
    }
    .file {
      margin-top: 10px;
    }
  }
  .button {
    margin-top: 30px;
    height: 50px;
    border-color: #7927F5;
    background-color: #7927F5;
    color: #ffffff;
    width: 100%;
  }
}
</style>
