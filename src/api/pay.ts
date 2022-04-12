import { defHttp } from '@/utils/http/axios';

enum Api {
  getPayInfo = '/userPay/getPayInfo',
  recharge = '/userPay/recharge',
  withdraw = '/userPay/withdraw',
  getPayList = '/userPay/getPayList'
}

export const setRecharge = (data?: any) =>
  defHttp.post<any>({ url: Api.recharge, data });

export const getPayInfo = (params?: any) =>
  defHttp.get<any>({ url: Api.getPayInfo, params });

export const setWithdraw = (data?: any) =>
  defHttp.post<any>({ url: Api.withdraw, data });

export const getPayList = (params?: any) =>
  defHttp.get<any>({ url: Api.getPayList, params });
