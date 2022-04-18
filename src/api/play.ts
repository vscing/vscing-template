import { defHttp } from '@/utils/http/axios';

enum Api {
  getList = '/play/getList',
  compound = '/play/compound',
}

export const getList = (params?: any) =>
  defHttp.get<any>({ url: Api.getList, params });

export const setCompound = (data?: any) =>
  defHttp.post<any>({ url: Api.compound, data });
