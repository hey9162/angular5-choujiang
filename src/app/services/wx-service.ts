import { Injectable, Inject } from '@angular/core';
import { API_URL } from '../app.tokens';
import { appId } from '../component/base-url'
@Injectable()
export class WxService {

  constructor(@Inject(API_URL) public apiUrl) { }

  redirectUrl(){
    let url =`${this.apiUrl}/auth?redirectUrl=` +  window.location.href;
    let redirect_uri = encodeURIComponent(url);
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
  }

}
