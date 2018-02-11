import { Title } from '@angular/platform-browser';
import { Component,Inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { API_URL } from './app.tokens';
import { WXService } from "./wx.service";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [WXService]
})
export class AppComponent {
  status: string;
  constructor(
    private wxService: WXService,
    private router: Router,
    private titleService: Title,
    @Inject(API_URL) public apiUrl,
    private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.router.events
    .filter(event => event instanceof NavigationEnd)
    .map(() => this.activatedRoute)
    .map(route => {
      while (route.firstChild) route = route.firstChild;
      return route;
    })
    .filter(route => route.outlet === 'primary')
    .mergeMap(route => route.data)
    .subscribe((event) => {
      this.titleService.setTitle(event['title'])
    });
     
    // 自定义微信分享链接标题link必须是微信的安全域名；
    this.wxService.config({
      title: '点我抽奖',
      desc: '留言抽奖赶快来啊',
      link: `${this.apiUrl}/dist/#/award`,
      imgUrl: 'http://pubweb.oss-cn-hangzhou.aliyuncs.com/WebStatic%2Frry-activity%2Fimg%2Fpan.png'
    }).then(() => {
        // 其它操作，可以确保注册成功以后才有效
        this.status = '注册成功';
        console.log(this.status);
    }).catch((err: string) => {
        this.status = `注册失败，原因：${err}`
        console.log(this.status);
    });
  }
}
