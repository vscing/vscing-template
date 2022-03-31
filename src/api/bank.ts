import { defHttp } from '@/utils/http/axios';

enum Api {
  addBank = '/bank/add',
  getBankList = '/bank/list'
}

export const addBank = (data?: any) =>
  defHttp.post<any>({ url: Api.addBank, data });

export const getBankList = (data?: any) =>
  defHttp.post<any>({ url: Api.getBankList, data });
