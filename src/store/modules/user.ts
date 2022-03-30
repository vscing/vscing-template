import { defineStore } from 'pinia';
import { store } from '@/store';

interface UserState {
  userInfo: any;
  token?: string;
  currentUrl: string;
}


import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
getUserInfo(): UserInfo {
  return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
},
getToken(): string {
  return this.token || getAuthCache<string>(TOKEN_KEY);
},

export const useUserStore: any = defineStore('user', {
  state: (): UserState => ({
    token: undefined,
    currentUrl: '/',
    userInfo: {}
  }),
  getters: {
    getUserInfo: (state) => state.userInfo,

    getToken: (state) => state.token,

    getCurrentUrl: (state) => state.currentUrl
  },
  actions: {
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
    setToken(token: string) {
      this.token = token
    },
    setCurrentUrl(currentUrl: string) {
      this.currentUrl = currentUrl
    },
    // async logout(goLogin = false) {
    //   if (this.getToken) {
    //     try {
    //       await doLogout();
    //     } catch {
    //       console.log('注销Token失败');
    //     }
    //   }
    //   this.setToken(undefined);
    //   this.setSessionTimeout(false);
    //   this.setUserInfo(null);
    //   goLogin && router.push(PageEnum.BASE_LOGIN);
    // },
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
