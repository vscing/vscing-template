import { defHttp, resHttp } from '@/utils/http/axios';

enum Api {
  getUserInfo = '/user/getUserInfo',
  logout = '/user/logout',
  addIdCard = '/user/idCard',
  getCode = '/user/getCode',
  login = '/user/login',
  aliPay = '/user/aliPay',
  editUserInfo = '/user/editUserInfo',
  getPaasWord = '/user/getPaasWord',
  setPaasWord = '/user/setPaasWord',
  getCodeImage = '/user/getCodeImage',
  checkCodeImage = '/user/checkCodeImage',
}

export const getUserInfo = (params?: any) =>
  defHttp.get<any>({ url: Api.getUserInfo, params });

export const doLogout = (params?: any) =>
  defHttp.get<any>({ url: Api.logout, params });

// 实名认证
export const addIdCard = (data?: any) => defHttp.post<any>({ url: Api.addIdCard, data });

// 短信
export const getCode = (params?: any) => defHttp.get<any>({ url: Api.getCode, params}); 

// 登录
export const login = (data?: any) => defHttp.post<any>({ url: Api.login, data}); 

// 绑定支付宝
export const aliPay = (data?: any) => defHttp.post<any>({ url: Api.aliPay, data});

// 编辑信息
export const editUserInfo = (data?: any) => defHttp.post<any>({ url: Api.editUserInfo, data});

// 判断支付密码是否设置
export const getPaasWord = (data?: any) => defHttp.post<any>({ url: Api.getPaasWord, data});

// 绑定支付密码
export const setPaasWord = (data?: any) => defHttp.post<any>({ url: Api.setPaasWord, data});

export const getCodeImage = (params?: any) =>
  defHttp.get<any>({ url: Api.getCodeImage, params });

export const checkCodeImage = (data?: any) => defHttp.post<any>({ url: Api.checkCodeImage, data});
