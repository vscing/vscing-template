import { defineStore } from 'pinia';
import storage from 'store';
import { store } from '@/store';
import { doLogout } from '@/api/user';
interface UserState {
  userInfo: any;
  token?: string;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: undefined,
    userInfo: null
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
      if (this.getToken) {
        try {
          await doLogout();
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setToken(undefined);
      this.setUserInfo(null);
      goLogin && window.location.reload();
    },
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
