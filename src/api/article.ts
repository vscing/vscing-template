import { defHttp } from '@/utils/http/axios';

enum Api {
  getArticleList = '/article/getList',
  getArticleInfo = '/article/getInfo',
}

export const getArticleList = (params?: any) =>
  defHttp.get<any>({ url: Api.getArticleList, params });

export const getArticleInfo = (params?: any) =>
  defHttp.get<any>({ url: Api.getArticleInfo, params });
