import { Injectable,Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,HttpClient } from '@angular/common/http';
import { Observable } from 'Rxjs/Observable';
import { WxService } from './wx-service';
import { ToastComponent, ToastService } from "ngx-weui/toast";

@Injectable()
export class RedirectInterceptor implements HttpInterceptor {
  timer:any;
  http:any;
  constructor(private wxService: WxService,
    public srv:ToastService,
    public inj: Injector) {
     };
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.onShowBySrv('loading')
    const started = Date.now();
    const http = this.inj.get(HttpClient);
    return next.handle(req).map(event => {
      if (event instanceof HttpResponse) {
        if (event.body.code === 54000) {
          window.location.href = this.wxService.redirectUrl();
        };
      };
      this.srv.hide();
      return event;
    })
  }
  onShowBySrv(type: 'success' | 'loading') {
    this.srv[type]();
  };
  getURLParam(name) {
    var value = window.location.search.match(new RegExp("[?&]" + name + "=([^&]*)(&?)", "i"));
    return value ? (value[1]) : value;
  }
};
