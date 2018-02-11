import { Component, OnInit, AfterViewChecked, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';

import { ListProviderService } from './services/list-provider.service';

declare const wx: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewChecked {
  panelFrameData: any[];
  /** 是兑换奖品，还是物流信息 */
  isdraw: number;
  notData = false;
  @ViewChildren('tables') tables: QueryList<any>;
  afterViewCheckedStop = false;

  constructor(
    private render2: Renderer2,
    private location: Location,
    private listSrv: ListProviderService
  ) { }

  ngOnInit() {
    this.listSrv.fetchData('/record/list', null).subscribe((res: any) => {
      if (res.code === 12000) {
        res.data && (this.panelFrameData = res.data);
      }
      if (res.code === 14000) {
        this.notData = true;
      }
    });
    this.redeemPrize();
  }

  ngAfterViewChecked() {
    if (this.afterViewCheckedStop) {
      return;
    }

    this.tables.forEach((item, index) => {
      const elem = item.nativeElement;
      const flex_len = elem.querySelectorAll('.weui-flex').length / 2;
      const h = 1.6 * flex_len;
      const infiName = `infi_loop_${index}`;
      this.render2.setStyle(elem.parentNode, 'height', `${Math.min( Math.max(1.6, h), 5.15 )}rem`);

      if (flex_len > 1) {
        this.listSrv.overlayKeyframes(`-${h}rem`, infiName);
        this.render2.setStyle(elem, 'animation', `${flex_len * 2}s ${infiName} linear infinite normal`);
        this.afterViewCheckedStop = true;
      }
    });

  }

  goBack() {
    wx.closeWindow();
    // this.location.back();
  }

  redeemPrize() {
    this.listSrv.fetchData(`/record/isdraw`, {}).subscribe((res: any) => {
      this.isdraw = res.code;
    });
  }
}
