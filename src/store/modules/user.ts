import { defineStore } from 'pinia';
import storage from 'store';
import { store } from '@/store';
import { doLogout } from '@/api/user';
interface UserState {
  userInfo: any;
  token?: string;
  whiteList: any[];
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: undefined,
    userInfo: null,
    whiteList: ['/', '/news/list', '/news/detail', '/sell/list', '/agree', '/about', '/register', '/forgot', '/group', '/download', '/download1', '/download2', '/activity/forward']
  }),
  getters: {
    getUserInfo: (state) => {
      return state.userInfo || storage.get('userInfo')
    },

    getToken: (state) => state.token || storage.get('token')
  },
  actions: {
    setUserInfo(userInfo: any) {
      storage.set('userInfo', userInfo)
      this.userInfo = userInfo
    },
    setToken(token: string | undefined) {
      storage.set('token', token)
      this.token = token
    },
    async logout(goLogin = false) {
      if (this.getToken && goLogin) {
        try {
          await doLogout();
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setToken(undefined);
      this.setUserInfo(null);
      window.location.reload();
    },
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
