import { defHttp } from '@/utils/http/axios';

enum Api {
  getConfig = '/config/getConfig',
  getHelp = '/config/getHelp'
}

export const getConfig = (params?: any) =>
  defHttp.get<any>({ url: Api.getConfig, params });

export const getHelp = (params?: any) =>
  defHttp.get<any>({ url: Api.getHelp, params });
