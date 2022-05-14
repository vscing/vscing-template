import { defHttp } from '@/utils/http/axios';

enum Api {
  addBank = '/bank/addBankCard',
  getBankList = '/bank/list',
  getBankCard = '/bank/getBankCard',
  defaultBankCard = '/bank/defaultBankCard',
  deleteBankCard = '/bank/deleteBankCard'
}

export const defaultBankCard = (data?: any) =>
  defHttp.post<any>({ url: Api.defaultBankCard, data });

export const deleteBankCard = (data?: any) =>
  defHttp.post<any>({ url: Api.deleteBankCard, data });

export const addBank = (data?: any) =>
  defHttp.post<any>({ url: Api.addBank, data });

export const getBankList = (params?: any) =>
  defHttp.get<any>({ url: Api.getBankList, params });

export const getBankCard = (params?: any) =>
  defHttp.get<any>({ url: Api.getBankCard, params });
