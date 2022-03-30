<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import { useUserStore } from '@/store/modules/user';
import storage from 'store';
import { useGlobSetting } from '@/hooks/setting';
import { getUserInfo } from '@/api/user';
import { to, getParams } from '@/utils';
const router = useRouter()

const globSetting = useGlobSetting();
const { apiUrl, urlPrefix } = globSetting;
const token: string = getParams('token') || '';
const url = storage.get('authUrl') || '/';
const userStore = useUserStore();

const init = async () => {
  if (token) {
    if(token === 'false'){
      Toast.fail('登录授权失败')
      return false;
    }
    userStore.setToken(token);
    Toast.loading({
      message: '正在登录中...',
      forbidClick: true,
    });
    const [_, res] = await to(getUserInfo());
    if(res) {
      userStore.setUserInfo(res.userInfo);
    } else {
      Toast.fail('登录授权失败');
      return false;
    }
    router.replace(url);
  } else {
    window.location.href = `${apiUrl}${urlPrefix}/wechat/setCallback?url=${window.location.href}`;
  }
}

init();
</script>
