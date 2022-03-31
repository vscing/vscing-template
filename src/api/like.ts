import { defHttp } from '@/utils/http/axios';

enum Api {
  addLike = '/like/add',
  getLikeList = '/like/list'
}

export const addLike = (data?: any) =>
  defHttp.post<any>({ url: Api.addLike, data });

export const getLikeList = (data?: any) =>
  defHttp.post<any>({ url: Api.getLikeList, data });
