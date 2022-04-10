import { defHttp } from '@/utils/http/axios';

enum Api {
  addBank = '/bank/addBankCard',
  getBankList = '/bank/list',
  getBankCard = '/bank/getBankCard'
}

export const addBank = (data?: any) =>
  defHttp.post<any>({ url: Api.addBank, data });

export const getBankList = (data?: any) =>
  defHttp.get<any>({ url: Api.getBankList, data });

export const getBankCard = (data?: any) =>
  defHttp.get<any>({ url: Api.getBankCard, data });
