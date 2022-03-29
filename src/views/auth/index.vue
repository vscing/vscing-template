<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { Overlay as VantOverlay, Toast } from 'vant';
  import { useUserStore } from '@/store/modules/user';
  import { setCallback, getUserInfo } from '@/api/wechat';
  import { to, getUrlParame } from '@/utils';
  const userStore = useUserStore();
  const router = useRouter()

  const code = getUrlParame('code');

  const init = async () => {
    if(!code) {
      const url = window.location.href.split("#")[0];
      // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize
			// 			?appid=
			// 			&redirect_uri=${encodeURIComponent(url)}
			// 			&response_type=code
			// 			&scope=snsapi_userinfo
			// 			&state=vscing_state#wechat_redirect`
      const [err, res] = await to(setCallback({url: url}));
      console.log('%c [ res ]-11', 'font-size:13px; background:pink; color:#bf2c9f;', res, err)
      if(res) {
        window.location.href = res.redirectUrl;
      }
    } else {
      const [err, res] = await to(getUserInfo({code: code}));
      console.log('%c [ err, res ]-23', 'font-size:13px; background:pink; color:#bf2c9f;', err, res)
      if(res) {
        const url = window.localStorage.getItem('authUrl') as string;
        userStore.setToken(res.token);
        userStore.setUserInfo(res.userInfo);
        router.replace(url);
      }
    }
  }

  init();

  Toast.loading({
    message: '正在登录中...',
    forbidClick: true,
  });
</script>

<template>
  <VantOverlay :show="true"/>
</template>

<style scoped lang="less">

</style>
