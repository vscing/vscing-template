import { defHttp } from '@/utils/http/axios';

enum Api {
  // 判断token是否登录还有是否微信环境
  OPTIONS_LIST = '/select/getDemoOptions', // 提交当前地址给后端
  // 后端返回code，code请求用户登录接口
}

/**
 * @description: Get sample options value
 */
export const optionsListApi = (params?: selectParams) =>
  defHttp.get<DemoOptionsItem[]>({ url: Api.OPTIONS_LIST, params });
