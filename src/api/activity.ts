import { ContentTypeEnum } from '@/enums/httpEnum';
import { defHttp } from '@/utils/http/axios';

enum Api {
  forwardImg = '/userUpload/forwardImg',
  uploadImage = '/userUpload/uploadImage',
}

export const forwardImg = (data?: any) =>
  defHttp.post<any>({ url: Api.forwardImg, data });

export const uploadImage = (data: any) => {
  return defHttp.post<any>({ 
    url: Api.uploadImage,
    headers: {
      'Content-type': ContentTypeEnum.FORM_DATA
    },
    params: data
  });
}
  
  
