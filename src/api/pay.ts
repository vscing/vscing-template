import { defHttp } from '@/utils/http/axios';

enum Api {
  getPayInfo = '/userPay/getPayInfo',
  recharge = '/userPay/recharge',
  withdraw = '/userPay/withdraw'
}

export const setRecharge = (data?: any) =>
  defHttp.post<any>({ url: Api.recharge, data });

export const getPayInfo = (data?: any) =>
  defHttp.get<any>({ url: Api.getPayInfo, data });

export const setWithdraw = (data?: any) =>
  defHttp.post<any>({ url: Api.withdraw, data });
