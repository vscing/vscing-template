import { defHttp } from '@/utils/http/axios';

enum Api {
  getUserInfo = '/user/getUserInfo',
  logout = '/user/logout'
}

export const getUserInfo = (data?: any) =>
  defHttp.post<any>({ url: Api.getUserInfo, data });

export const doLogout = (params?: any) =>
  defHttp.get<any>({ url: Api.logout, params });

