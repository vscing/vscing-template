import { defHttp } from '@/utils/http/axios';

enum Api {
  getMarketList = '/market/list',
  getMarketInfo = '/market/info',
}

export const getMarketList = (params?: any) =>
  defHttp.get<any>({ url: Api.getMarketList, params });

export const getMarketInfo = (params?: any) =>
  defHttp.get<any>({ url: Api.getMarketInfo, params });

