import { defHttp } from '@/utils/http/axios';

enum Api {
  getHome = '/index/index',
}

export const getHome = (params?: any) =>
  defHttp.get<any>({ url: Api.getHome, params });
