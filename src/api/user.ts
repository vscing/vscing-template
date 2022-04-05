import { defHttp, resHttp } from '@/utils/http/axios';

enum Api {
  getUserInfo = '/user/getUserInfo',
  logout = '/user/logout',
  addIdCard = '/user/idCard',
  getCode = '/user/getCode',
  login = '/user/login',
}

export const getUserInfo = (data?: any) =>
  defHttp.post<any>({ url: Api.getUserInfo, data });

export const doLogout = (params?: any) =>
  defHttp.get<any>({ url: Api.logout, params });

// 实名认证
export const addIdCard = (data?: any) => defHttp.post<any>({ url: Api.addIdCard, data });

// 短信
export const getCode = (params?: any) => defHttp.get<any>({ url: Api.getCode, params}); 

// 登录
export const login = (data?: any) => defHttp.post<any>({ url: Api.login, data}); 

