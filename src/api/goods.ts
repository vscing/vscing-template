import { defHttp } from '@/utils/http/axios';

enum Api {
  getGoodsList = '/goods/list',
  getGoodsInfo = '/goods/info',
}

export const getGoodsList = (params?: any) =>
  defHttp.get<any>({ url: Api.getGoodsList, params });

export const getGoodsInfo = (params?: any) =>
  defHttp.get<any>({ url: Api.getGoodsInfo, params });
