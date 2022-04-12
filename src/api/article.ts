import { defHttp } from '@/utils/http/axios';

enum Api {
  getArticleList = '/article/data',
  getArticleInfo = '/article/list',
}

export const getArticleList = (params?: any) =>
  defHttp.get<any>({ url: Api.getArticleList, params });

export const getArticleInfo = (params?: any) =>
  defHttp.get<any>({ url: Api.getArticleInfo, params });
