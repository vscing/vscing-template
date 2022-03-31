import { defHttp, resHttp } from '@/utils/http/axios';

enum Api {
  getUserInfo = '/user/getUserInfo',
  logout = '/user/logout',
  addIdCard = '/user/idCard',
}

export const getUserInfo = (data?: any) =>
  defHttp.post<any>({ url: Api.getUserInfo, data });

export const doLogout = (params?: any) =>
  defHttp.get<any>({ url: Api.logout, params });

// 实名认证
export const addIdCard = (data?: any) =>
  resHttp.post<any>({ url: Api.addIdCard, data });

