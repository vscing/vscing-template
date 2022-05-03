import { defHttp } from '@/utils/http/axios';

enum Api {
  getSellList = '/sell/getList',
  getSellInfo = '/sell/getInfo',
  getSellOrderInfo = '/sell/getOrderInfo',
  buySell = '/sell/buy',

  getGoodsList = '/goods/getList',
  getGoodsInfo = '/goods/getInfo',
  getGoodsOrderInfo = '/goods/getOrderInfo',
  setSend = '/goods/setSend',
  setNotSend = '/goods/setNotSend',
  buyGoods = '/goods/buy',

  getUserCategory = '/goods/getUserCategory',
  getUserGoods = '/goods/getUserGoods',
  getSendGoods = '/goods/getSendGoods',
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

export const getUserCategory = (params?: any) =>
  defHttp.get<any>({ url: Api.getUserCategory, params });

export const getUserGoods = (params?: any) =>
  defHttp.get<any>({ url: Api.getUserGoods, params });

export const getSendGoods = (params?: any) =>
  defHttp.get<any>({ url: Api.getSendGoods, params });

export const setSend = (data?: any) =>
  defHttp.post<any>({ url: Api.setSend, data }); 

export const setNotSend = (data?: any) =>
  defHttp.post<any>({ url: Api.setNotSend, data }); 
