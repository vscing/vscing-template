import { defHttp } from '@/utils/http/axios';

enum Api {
  getConfig = '/config/getConfig'
}

export const getConfig = (params?: any) =>
  defHttp.get<any>({ url: Api.getConfig, params });
