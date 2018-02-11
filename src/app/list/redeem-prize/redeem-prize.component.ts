import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormVerifyService } from '../../services/form-verify.service';
import { ListProviderService } from '../services/list-provider.service';
import { ToptipsService } from "ngx-weui/toptips";

@Component({
  selector: 'app-redeem-prize',
  templateUrl: './redeem-prize.component.html',
  styleUrls: ['./redeem-prize.component.scss']
})
export class RedeemPrizeComponent implements OnInit, OnDestroy {
  /** 模板渲染数据 */
  formGroup: any[] = [
    {
      icon: 'icon-xingming--',
      izimeli: ['姓', '名：'],
      ngmodel: '',
      pattern: /^[\u4e00-\u9fa5]{2,20}$|^([A-Za-z]+\s?)*[A-Za-z]$/,
      minlength: 2,
      required: true,
      name: 'name',
      type: 'text'
    },
    {
      icon: 'icon-weibiaoti--',
      izimeli: ['联', '系', '电', '话：'],
      ngmodel: '',
      pattern: /1[345789]\d{9}/,
      maxlength: 11,
      required: true,
      name: 'phone',
      type: 'tel'
    },
    {
      icon: 'icon-weibiaoti--1',
      izimeli: ['通', '讯', '地', '址：'],
      ngmodel: '',
      pattern: null,
      maxlength: 150,
      required: true,
      name: 'address',
      type: 'text'
    }
  ];

  constructor(
    private tipsSrv: ToptipsService,
    private listSrv: ListProviderService,
    private formVerifySrv: FormVerifyService
  ) { }

  ngOnInit() {
    this.listSrv.addPageClass(false);
    this.listSrv.fetchData('/address/addressinfo', {})
      .subscribe((res: any) => {
        const data = res.data;
        if (data) {
          this.formGroup[0].ngmodel = data.name;
          this.formGroup[1].ngmodel = data.phone;
          this.formGroup[2].ngmodel = data.address;
        }
      });
  }

  onShowBySrv(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text: string) {
    this.tipsSrv[type](text);
  }

  modifyUserInfo($form) {
    const $name = $form.controls['name'];
    const $phone = $form.controls['phone'];
    const $address = $form.controls['address'];

    if (!$name.valid) {
      this.onShowBySrv('warn', '姓名输入不正确！');
      return false;
    }

    if (!$phone.valid) {
      this.onShowBySrv('warn', '手机号码输入不正确！');
      return false;
    }

    if ($address.value === '') {
      this.onShowBySrv('warn', '收货地址不能为空！');
      return false;
    }
    
    this.listSrv.fetchData('/address/save', null, { params: $form.value })
      .subscribe((res: any) => {
        if (res.code === 12000) {
          this.onShowBySrv('success', res.msg);
        }
        if (res.code === 10000) {
          this.onShowBySrv('warn', res.msg);
        }
      });
  }

  forbidEmoji(event) {
    this.formVerifySrv.forbidEmoji(event.target);
  }

  ngOnDestroy() {
    this.listSrv.removePageClass();
  }
}
