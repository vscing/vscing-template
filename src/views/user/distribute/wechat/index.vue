<script setup lang="ts">
import {
  Button as VantButton,
  Toast
} from 'vant';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { Images } from '@/assets/images';
import { useUserStore } from '@/store/modules/user';
import { ref } from 'vue';
import { getNum } from '@/api/distribute';
import { to } from '@/utils';

const userStore = useUserStore();
const userInfo = userStore.getUserInfo
console.log('%c [ userInfo ]-12', 'font-size:13px; background:pink; color:#bf2c9f;', userInfo)

const url = ref<string>('');
const num = ref(0);

const init = async() => {
  const [_, res] = await to(getNum());
  if(res){
    num.value = res.data
  }
}

init();

const generateQR = async text => {
  try {
    url.value = await QRCode.toDataURL(text)
  } catch (err) {
    Toast.fail('生成二维码失败')
  }
}

generateQR(`https://food.ysxqbjz.com/login?user_id=${userInfo['id']}`)

const setCanvas = () => {
  const canvas = document.createElement('canvas');
  // 获取要生成图片的 DOM 元素
  let canvasDom: any = document.getElementById('poster');
  // 获取指定的宽高
  const width = parseInt(window.getComputedStyle(canvasDom).width);
  const height = parseInt(window.getComputedStyle(canvasDom).height);
  // 宽高扩大 3 倍 处理图片模糊（根据自己的图片大小来进行调整）
  canvas.width = width * 3;
  canvas.height = height * 3;
  canvas.style.width = width /2 + 'px';
  canvas.style.height = height /2 + 'px';
  const context: any = canvas.getContext('2d');
  context.scale(1, 1);
  const options = {
    backgroundColor: null,
    canvas: canvas,
    useCORS: true
  };
  html2canvas(canvasDom, options).then(canvas => {
    //此时的图片是base64格式的，我们将图片格式转换一下
    let type = 'png';
    let imgData = canvas.toDataURL(type);
    // 照片格式处理
    let _fixType = function(type) {
      type = type.toLowerCase().replace(/jpg/i, 'jpeg');

      let r = type.match(/png|jpeg|bmp|gif/)[0];

      return 'image/' + r;
    };

    imgData = imgData.replace(_fixType(type), 'image/octet-stream');

    let filename = '食艺术' + '.' + type;

    saveFile(imgData, filename);
  });
}

const saveFile = (data, filename) => {
  let save_link: any = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  save_link.href = data;
  save_link.download = filename;
  let event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  save_link.dispatchEvent(event);
}

</script>
<template>
  <div class="distribute-moneny">
    <p>拉新数量</p>
    <h1>{{num}} 人</h1>
  </div>

  <div class="poster" id="poster">
    <img :src="Images.poster" />
    <img class="code" :src="url" />
  </div>

  <div class="btn" @click="setCanvas">
    <VantButton round block color="#01c2c3">
      保存海报到相册
    </VantButton>
  </div>
</template>

<style lang="less" scoped>
.distribute-moneny {
  background-color: #ffffff;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  p {
    font-size: 14px;
    font-weight: 400;
    color: #5a5f6d;
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
    color: #01c2c3;
  }
}
.poster {
  position: relative;
  .code {
    width: 100px;
    height: 100px;
    position: absolute;
    bottom: 40px;
    right: 50%;
    transform: translateX(50%);
  }
}
.btn {
  margin: 20px;
}
</style>
