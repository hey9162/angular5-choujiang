import { Component, OnInit, ViewEncapsulation, ViewChild, Inject  } from '@angular/core';
import { API_URL } from '../app.tokens';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { ToastComponent } from 'ngx-weui/toast';
import { WXService } from "../wx.service";

import { SwiperComponent } from '../component/swiper/swiper.component';
import { PageComponent } from '../component/page/page.component';
import { InfiniteLoaderComponent } from 'ngx-weui/infiniteloader';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  bannerArray: Observable<any>;
  _pageNo: number = 1;
  dataList: Array<object> = [];
  @ViewChild(InfiniteLoaderComponent) il;
  constructor(
    @Inject(API_URL) public apiUrl,
    public http: HttpClient
  ) { };

  ngOnInit() {
    this.bannerArray = 
    this.http
    .get(`${this.apiUrl}/banner/list`);
    this.getData(this._pageNo,this.il);
  }
  getData(pageNo,comp: InfiniteLoaderComponent){
    this.http
    .get(`${this.apiUrl}/article/page`,{params:{pageNo: pageNo}})
    .subscribe((res)=>{
      if(res['code'] === 12000){
        if(res['data'].records.length === 0){
          comp.setFinished();
        }else{
          this.dataList = this.dataList.concat(res['data'].records);
          comp.resolveLoading();
        }
      }
    })
  }
  onLoadMore(){
    this._pageNo = this._pageNo + 1
    this.getData(this._pageNo,this.il);
  }
  link(links: string,id:string,url:string){
    this.http
    .get(`${this.apiUrl}${url}`,{params:{id: id}})
    .subscribe((res)=>{
      if(res["code"] === 12000){
        window.location.href = links;
      }
    })
  }
};
