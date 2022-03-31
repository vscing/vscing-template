import { defHttp } from '@/utils/http/axios';

enum Api {
  getBanner = '/banner/list',
}

export const getBanner = (params?: any) =>
  defHttp.get<any>({ url: Api.getBanner, params });
