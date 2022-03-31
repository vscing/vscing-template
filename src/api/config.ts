import { defHttp } from '@/utils/http/axios';

enum Api {
  getConfig = '/config/data'
}

export const getConfig = (params?: any) =>
  defHttp.get<any>({ url: Api.getConfig, params });
