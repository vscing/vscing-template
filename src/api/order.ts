import { defHttp } from '@/utils/http/axios';

enum Api {
  getOrderList = '/order/getList',
  getOrderSkuList = '/orderSku/getList',
}

export const getOrderList = (params?: any) =>
  defHttp.get<any>({ url: Api.getOrderList, params });

export const getOrderSkuList = (params?: any) =>
  defHttp.get<any>({ url: Api.getOrderSkuList, params });

// export const buyGoods = (data?: any) =>
//   defHttp.post<any>({ url: Api.buyGoods, data });  
