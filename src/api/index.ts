import { defHttp } from '@/utils/http/axios';

enum Api {
  // 判断token是否登录还有是否微信环境
  setCallback = '/wechat/setCallback', // 提交当前地址给后端
  getUserInfo = '/wechat/getUserInfo'// 后端返回code，code请求用户登录接口
}

export const setCallback = (data?: any) =>
  defHttp.post<any>({ url: Api.setCallback, data });

export const getUserInfo = (params?: any) =>
  defHttp.get<any>({ url: Api.getUserInfo, params });
