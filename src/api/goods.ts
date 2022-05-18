import { defHttp } from '@/utils/http/axios';

enum Api {
  getSellList = '/sell/getList',
  getGoodsCategory = '/sell/getCategory',
  getSellInfo = '/sell/getInfo',
  getSellOrderInfo = '/sell/getOrderInfo',
  buySell = '/sell/buy',

  getGoodsList = '/goods/getList',
  getGoodsInfo = '/goods/getInfo',
  getGoodsOrderInfo = '/goods/getOrderInfo',
  onNetwork = '/goods/onNetwork',
  getMerchant = '/goods/getMerchant',
  setSend = '/goods/setSend',
  setNotSend = '/goods/setNotSend',
  createOrder = '/goods/createOrder',
  buyGoods = '/goods/buy',
  receiptpayment = '/goods/receiptpayment',

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

export const getGoodsCategory = (params?: any) =>
  defHttp.get<any>({ url: Api.getGoodsCategory, params });

export const getGoodsList = (params?: any) =>
  defHttp.get<any>({ url: Api.getGoodsList, params });

export const getGoodsInfo = (params?: any) =>
  defHttp.get<any>({ url: Api.getGoodsInfo, params });

export const getGoodsOrderInfo = (params?: any) =>
  defHttp.get<any>({ url: Api.getGoodsOrderInfo, params });

export const createOrder = (data?: any) =>
  defHttp.post<any>({ url: Api.createOrder, data }); 

export const buyGoods = (data?: any) =>
  defHttp.post<any>({ url: Api.buyGoods, data }); 

export const receiptpayment = (data?: any) =>
  defHttp.post<any>({ url: Api.receiptpayment, data }); 

export const getUserCategory = (params?: any) =>
  defHttp.get<any>({ url: Api.getUserCategory, params });

export const getUserGoods = (params?: any) =>
  defHttp.get<any>({ url: Api.getUserGoods, params });

export const getSendGoods = (params?: any) =>
  defHttp.get<any>({ url: Api.getSendGoods, params });

export const onNetwork = (data?: any) =>
  defHttp.post<any>({ url: Api.onNetwork, data }); 

export const getMerchant  = (params?: any) =>
  defHttp.get<any>({ url: Api.getMerchant, params });

export const setSend = (data?: any) =>
  defHttp.post<any>({ url: Api.setSend, data }); 

export const setNotSend = (data?: any) =>
  defHttp.post<any>({ url: Api.setNotSend, data }); 
