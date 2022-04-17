import { defHttp } from '@/utils/http/axios';

enum Api {
  getNum = '/distribute/getNum',
  getList = '/distribute/getList',
}

export const getNum = (params?: any) =>
  defHttp.get<any>({ url: Api.getNum, params });

export const getList = (params?: any) =>
  defHttp.get<any>({ url: Api.getList, params });

// export const buyGoods = (data?: any) =>
//   defHttp.post<any>({ url: Api.buyGoods, data });  
