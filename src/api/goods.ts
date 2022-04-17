import { defHttp } from '@/utils/http/axios';

enum Api {
  getSellList = '/sell/getList',
  getSellInfo = '/sell/getInfo',
  getSellOrderInfo = '/sell/getOrderInfo',
  buySell = '/sell/buy',

  getGoodsList = '/goods/getList',
  getGoodsInfo = '/goods/getInfo',
  getGoodsOrderInfo = '/goods/getOrderInfo',
  buyGoods = '/goods/buy',
}

export const getSellList = (params?: any) =>
  defHttp.get<any>({ url: Api.getSellList, params });

export const getSellInfo = (params?: any) =>
  defHttp.get<any>({ url: Api.getSellInfo, params });

export const getSellOrderInfo = (params?: any) =>
  defHttp.get<any>({ url: Api.getSellOrderInfo, params });

export const buySell = (data?: any) =>
  defHttp.post<any>({ url: Api.buySell, data });  

export const getGoodsList = (params?: any) =>
  defHttp.get<any>({ url: Api.getGoodsList, params });

export const getGoodsInfo = (params?: any) =>
  defHttp.get<any>({ url: Api.getGoodsInfo, params });

export const getGoodsOrderInfo = (params?: any) =>
  defHttp.get<any>({ url: Api.getGoodsOrderInfo, params });

export const buyGoods = (data?: any) =>
  defHttp.post<any>({ url: Api.buyGoods, data });  
