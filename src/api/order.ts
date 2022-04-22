import { defHttp } from '@/utils/http/axios';

enum Api {
  getOrderList = '/order/getList',
  getOrderSkuList = '/order/getMarketList',
  getSellList = '/order/getSellList',
}

export const getOrderList = (params?: any) =>
  defHttp.get<any>({ url: Api.getOrderList, params });

export const getOrderSkuList = (params?: any) =>
  defHttp.get<any>({ url: Api.getOrderSkuList, params });

export const getSellList = (params?: any) =>
  defHttp.get<any>({ url: Api.getSellList, params });

// export const buyGoods = (data?: any) =>
//   defHttp.post<any>({ url: Api.buyGoods, data });  
