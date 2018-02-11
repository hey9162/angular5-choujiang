import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { JWeiXinService } from 'ngx-weui/jweixin';
import { HttpClient } from '@angular/common/http';
import { API_URL } from './app.tokens';
import 'rxjs/add/operator/catch';

declare const wx: any;

/**
 * 微信JS-SDK服务器
 */
@Injectable()
export class WXService {
    url: string;
    private static DEFAULTSHARE: any = {
        title: 'Site Name',
        desc: '',
        link: '',
        imgUrl: ''
    };
    constructor(private wxService: JWeiXinService, private http: HttpClient,
        @Inject(API_URL) public apiUrl) {
        this.url = encodeURIComponent(location.href.split('#')[0]);
    }

    private share: any;
    config(shareData: any): Promise<boolean> {
        this.share = shareData;
        return new Promise((resolve, reject) => {
            this.wxService.get().then((res) => {
                if (!res) {
                    reject('jweixin.js 加载失败');
                    return;
                }

                wx.ready(() => {
                    this._onMenuShareTimeline()
                        ._onMenuShareAppMessage()
                        ._onMenuShareQQ()
                        ._onMenuShareQZone()
                        ._onMenuShareWeibo();

                    resolve();
                });
                wx.error(() => {
                    reject('config 注册失败');
                });
                this.http
                    .get(`${this.apiUrl}/wechat/portal/get/jssignature?encodeUrl=${this.url}`)
                    .catch((error: Response | any) => {
                        reject('无法获取签名数据');
                        return Observable.throw('error');
                    })
                    .subscribe((ret: any) => {
                        if (!(ret.code === 12000)) {
                            reject('jsapi 获取失败');
                            return;
                        }
                        wx.config({
                            debug: false,
                            appId: ret.data.appId,
                            timestamp: ret.data.timestamp,
                            nonceStr: ret.data.nonceStr,
                            signature: ret.data.signature,
                            jsApiList: [
                                'checkJsApi',
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage',
                                'onMenuShareQQ',
                                'onMenuShareWeibo',
                                'onMenuShareQZone',
                                'hideMenuItems',
                                'showMenuItems',
                                'hideAllNonBaseMenuItem',
                                'showAllNonBaseMenuItem',
                                'translateVoice',
                                'startRecord',
                                'stopRecord',
                                'onVoiceRecordEnd',
                                'playVoice',
                                'onVoicePlayEnd',
                                'pauseVoice',
                                'stopVoice',
                                'uploadVoice',
                                'downloadVoice',
                                'chooseImage',
                                'previewImage',
                                'uploadImage',
                                'downloadImage',
                                'getNetworkType',
                                'openLocation',
                                'getLocation',
                                'hideOptionMenu',
                                'showOptionMenu',
                                'closeWindow',
                                'scanQRCode',
                                'chooseWXPay',
                                'openProductSpecificView',
                                'addCard',
                                'chooseCard',
                                'openCard'
                            ]
                        });
                    });
            });
        });
    }
    private _onMenuShareTimeline() {
        wx.onMenuShareTimeline(Object.assign({}, WXService.DEFAULTSHARE, this.share));
        return this;
    }

    private _onMenuShareAppMessage() {
        wx.onMenuShareAppMessage(Object.assign({}, WXService.DEFAULTSHARE, this.share));
        return this;
    }

    private _onMenuShareQQ() {
        wx.onMenuShareQQ(Object.assign({}, WXService.DEFAULTSHARE, this.share));
        return this;
    }

    private _onMenuShareWeibo() {
        wx.onMenuShareWeibo(Object.assign({}, WXService.DEFAULTSHARE, this.share));
        return this;
    }

    private _onMenuShareQZone() {
        wx.onMenuShareQZone(Object.assign({}, WXService.DEFAULTSHARE, this.share));
        return this;
    }
}
