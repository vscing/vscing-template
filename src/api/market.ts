import { defHttp } from '@/utils/http/axios';

enum Api {
  getMarketList = '/market/list',
  getMarketInfo = '/market/info',
  rankingList = '/market/rankingList'
}

export const getMarketList = (params?: any) =>
  defHttp.get<any>({ url: Api.getMarketList, params });

export const getMarketInfo = (params?: any) =>
  defHttp.get<any>({ url: Api.getMarketInfo, params });

export const rankingList = (params?: any) =>
  defHttp.get<any>({ url: Api.rankingList, params });

