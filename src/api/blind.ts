import { defHttp } from '@/utils/http/axios';

enum Api {
  getBlindList = '/blind/getBlindList',
  getBlindInfo = '/blind/getBlindInfo',
  openBlind = '/blind/openBlind',
}

export const getBlindList = (params?: any) =>
  defHttp.get<any>({ url: Api.getBlindList, params });

export const getBlindInfo = (params?: any) =>
  defHttp.get<any>({ url: Api.getBlindInfo, params });

export const openBlind = (data?: any) =>
  defHttp.post<any>({ url: Api.openBlind, data });
