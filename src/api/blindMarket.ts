import { defHttp } from '@/utils/http/axios';

enum Api {
  getBlindList = '/blindMarket/getBlindList',
  getBlindInfo = '/blindMarket/getBlindInfo',
  getPayChannel = '/blindMarket/getPayChannel',
  createBlindOrder = '/blindMarket/createBlindOrder',
  blindOrderPay = '/blindMarket/blindOrderPay',
  getBlindOrderList = '/blindMarket/getBlindOrderList',
  orderCancel = '/blindMarket/orderCancel',
  getBlindPublishList = '/blindMarket/getBlindPublishList',
  getBlindSaleList = '/blindMarket/getBlindSaleList',

  getSpecialBlindInfo = '/blindMarket/getSpecialBlindInfo',
  createSpecialBlindOrder = '/blindMarket/createSpecialBlindOrder',
  specialBlindOrderPay = '/blindMarket/specialBlindOrderPay'
}

export const createSpecialBlindOrder = (data?: any) =>
  defHttp.post<any>({ url: Api.createSpecialBlindOrder, data });

export const specialBlindOrderPay = (data?: any) =>
  defHttp.post<any>({ url: Api.specialBlindOrderPay, data });

export const getSpecialBlindInfo = (params?: any) =>
  defHttp.get<any>({ url: Api.getSpecialBlindInfo, params });

export const getBlindList = (params?: any) =>
  defHttp.get<any>({ url: Api.getBlindList, params });

export const getBlindInfo = (params?: any) =>
  defHttp.get<any>({ url: Api.getBlindInfo, params });

export const getPayChannel = (params?: any) =>
  defHttp.get<any>({ url: Api.getPayChannel, params });

export const createBlindOrder = (data?: any) =>
  defHttp.post<any>({ url: Api.createBlindOrder, data });

export const blindOrderPay = (data?: any) =>
  defHttp.post<any>({ url: Api.blindOrderPay, data });

export const getBlindOrderList = (params?: any) =>
  defHttp.get<any>({ url: Api.getBlindOrderList, params });

export const orderCancel = (data?: any) =>
  defHttp.post<any>({ url: Api.orderCancel, data });

export const getBlindPublishList = (params?: any) =>
  defHttp.get<any>({ url: Api.getBlindPublishList, params });

export const getBlindSaleList = (params?: any) =>
  defHttp.get<any>({ url: Api.getBlindSaleList, params });
