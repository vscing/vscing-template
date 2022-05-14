import { defHttp } from '@/utils/http/axios';

enum Api {
  getOrderList = '/order/getList',
  getOrderSkuList = '/order/getMarketList',
  getSellList = '/order/getSellList',
  orderCancel = '/order/orderCancel',
}

export const getOrderList = (params?: any) =>
  defHttp.get<any>({ url: Api.getOrderList, params });

export const getOrderSkuList = (params?: any) =>
  defHttp.get<any>({ url: Api.getOrderSkuList, params });

export const getSellList = (params?: any) =>
  defHttp.get<any>({ url: Api.getSellList, params });

export const orderCancel = (data?: any) =>
  defHttp.post<any>({ url: Api.orderCancel, data });  
