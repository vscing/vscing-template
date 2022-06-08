import { defHttp } from '@/utils/http/axios';

enum Api {
  getList = '/coupon/getList',
  getInfo = '/coupon/getInfo',
  confirmUseCoupon = '/coupon/confirmUseCoupon'
}

export const getList = (params?: any) =>
  defHttp.get<any>({ url: Api.getList, params });

export const getInfo = (params?: any) =>
  defHttp.get<any>({ url: Api.getInfo, params });

export const confirmUseCoupon = (data?: any) =>
  defHttp.post<any>({ url: Api.confirmUseCoupon, data });
