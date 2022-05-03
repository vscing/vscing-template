import { defHttp } from '@/utils/http/axios';

enum Api {
  getNum = '/distribute/getNum',
  getList = '/distribute/getList',
  getChildList = '/distribute/getChildList',
}

export const getNum = (params?: any) =>
  defHttp.get<any>({ url: Api.getNum, params });

export const getList = (params?: any) =>
  defHttp.get<any>({ url: Api.getList, params });

export const getChildList = (params?: any) =>
  defHttp.get<any>({ url: Api.getChildList, params });

// export const buyGoods = (data?: any) =>
//   defHttp.post<any>({ url: Api.buyGoods, data });  
