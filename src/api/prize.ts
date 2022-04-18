import { defHttp } from '@/utils/http/axios';

enum Api {
  getNum = '/prize/getNum',
  setTake = '/prize/setTake',
}

export const getNum = (params?: any) =>
  defHttp.get<any>({ url: Api.getNum, params });

export const setTake = (data?: any) =>
  defHttp.post<any>({ url: Api.setTake, data });
