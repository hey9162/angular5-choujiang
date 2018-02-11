import { Component,OnInit,ViewChild,Inject,ElementRef,AfterViewInit,HostListener } from "@angular/core";
import { Location } from "@angular/common";
import { API_URL } from "../app.tokens";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { DialogService, DialogConfig, DialogComponent } from "ngx-weui/dialog";
import { ToptipsService } from "ngx-weui/toptips";
import { InfiniteLoaderComponent } from "ngx-weui/infiniteloader/infiniteloader.component";

import { rotate } from "../component/animations";

@Component({
  selector: "app-award",
  templateUrl: "./award.component.html",
  styleUrls: ["./award.component.scss"],
  animations: [rotate]
})
export class AwardComponent implements OnInit, AfterViewInit {
  private timer;
  public rotateState: String = "active";
  private _isTrue: Boolean = true;
  public config: DialogConfig = {};
  drawList: Array<object> = [];
  oldphone: string;
  oldname: string;
  userInfo: any = {};
  state: boolean = false;
  disableName: boolean = false;
  disablePhone: boolean = false;
  disButton: boolean = false;
  time: number;
  date: any;
  hide: boolean = false;
  _boxNative: any;
  _content1Native: any;

  @ViewChild("userForm") form;
  @ViewChild("dialog") dialog: DialogComponent;
  @ViewChild("box") box: ElementRef;
  @ViewChild("content1") content1: ElementRef;
  constructor(
    private srv: ToptipsService,
    private http: HttpClient,
    @Inject(API_URL) public apiUrl,
    private elementRef: ElementRef,
    private location: Location
  ) {}
  ngOnInit() {
    this.getUser();
    this.isEdit();
    this.getDrawlist();
  }
  ngAfterViewInit() {
    this._boxNative = this.box.nativeElement;
    this._content1Native = this.content1.nativeElement;
    this.infinite2();
    this.changeImg()
  }
  getUser() {
    this.http.get(`${this.apiUrl}/user/me`, {}).subscribe((res: any) => {
      if (res.code === 12000) {
        this.state = false;
        this.userInfo = res.data;
        this.oldname = this.userInfo.name;
        this.oldphone = this.userInfo.phone;
      }
    });
  }
  isEdit() {
    this.http.post(`${this.apiUrl}/user/isedit`, {}).subscribe((res: any) => {
      if (res.code === 12000) {
        this.disableName = false;
      } else {
        this.disableName = true;
      }
    });
  }
  getDrawlist() {
    this.http
      .post(`${this.apiUrl}/draw/drawlist`, null)
      .subscribe((res: any) => {
        if (res.code === 12000) {
          this.drawList = res.data;
          console.log(this.drawList);
        } else {
          this.hide = true;
        }
      });
  }
  beforeOnline(){
    this.onShowTipBySrv("info", "抽奖活动即将开始，敬请期待！");
    return false;
  }
  start() {
    if (!this.userInfo.phone) {
      this.onShowTipBySrv("warn", "请完善您的个人信息");
      return false;
    }
    if (this._isTrue) {
      this.http
        .post(`${this.apiUrl}/draw/index`, Option)
        .subscribe((res: any) => {
          switch (res.code) {
            case 13004:
              this.onShowTipBySrv("info", "您还没有留言,请去文章底部留言！");
              break;
            case 13003:
              this.rotateState = "loser";
              break;
            case 13001:
              this.onShowTipBySrv("info", "您已经抽过奖了");
              break;
            case 12000:
              this.rotateState = "win";
              break;
            case 13002:
              this.onShowTipBySrv("info", "今天的机会已经用完咯！");
              break;
            case 13005:
              this.onShowTipBySrv("info", "该活动已下架！");
              break;
            case 14000:
              this.rotateState = "again";
              break;
          }
        });
    } else {
      this.onShowTipBySrv("info", "今天的机会已经用完咯~");
    }
  }
  done(event) {
    if (event.toState == "win") {
      this._isTrue = false;
      this.onShowTipBySrv("success", "恭喜您获得减轻茶一盒！");
    }
    if (event.toState == "again") {
      this.onShowTipBySrv("info", "再来一次");
      setTimeout(() => {
        this.rotateState = "active";
      }, 1500);
    }
    if (event.toState == "loser") {
      this.onShowTipBySrv("warn", "很遗憾，没有中哦！");
      this._isTrue = false;
    }
  }

  onShow(type, title) {
    if (this.form.form.controls.phone.status === "INVALID") {
      this.onShowTipBySrv("warn", "请填写正确的手机号");
      return false;
    }
    this.config = {
      skin: type,
      title: title,
      type: "prompt",
      input: "text",
      inputPlaceholder: "请输入图片中的内容 不区分大小写",
      inputError: "请填图片写验证码",
      inputRequired: true,
      content: `
      <img src="${this.apiUrl}/code/captcha?phone=${
        this.userInfo.phone
      }&${new Date().getTime()}"/>
      <p style="margin-top: 0.5rem;">点击图片刷新验证码</p>
      `
    };
    setTimeout(() => {
      (<DialogComponent>this.dialog).show().subscribe((res: any) => {
        console.log("type", res);
        if (res.value) {
          this.http
            .post(`${this.apiUrl}/code/sendsms`, null, {
              params: {
                phone: `${this.userInfo.phone}`,
                captcha: `${res.result}`
              }
            })
            .subscribe((res: any) => {
              if (res.code === 12000) {
                this.onShowTipBySrv("success", res.msg);
                this.time = 60;
                this.doTimeOut();
              } else {
                this.onShowTipBySrv("warn", res.msg);
              }
            });
        }
      });
      this.changeImg();
    }, 10);
    return false;
  }
  changeImg(){
    let container = this.dialog.container;
    let img = container.nativeElement.querySelector('img');
    if(img){
      img.addEventListener("click",() => {
        img.src =  `${this.apiUrl}/code/captcha?phone=${
          this.userInfo.phone
        }&${new Date().getTime()}`
      },false)
    }
  };
  onShowTipBySrv(
    type: "warn" | "info" | "primary" | "success" | "default",
    text
  ) {
    this.srv[type](text);
  }

  doSave($form) {
    const $name = $form.controls['name'];
    const $phone = $form.controls['phone'];
    const $code = $form.controls['code'];
    if ($form.invalid) {
      if (!$name.valid) {
        this.onShowTipBySrv("warn", "请填写正确的昵称");
        return false;
      }
      if (!$phone.valid) {
        this.onShowTipBySrv("warn", "请填写正确的手机号");
        return false;
      }
      if (!$code.valid) {
        this.onShowTipBySrv("warn", "请填写正确的验证码");
        return false;
      }
    }
    if ($form.valid) {
      this.disButton = true;
      if (
        this.oldname !== this.userInfo.name &&
        this.oldphone === this.userInfo.phone
      ) {
        this.http
          .post(`${this.apiUrl}/user/editname`, null, {
            params: { name: `${this.userInfo.name}` }
          })
          .subscribe((res: any) => {
            this.disButton = false;
            if (res.code === 12000) {
              this.onShowTipBySrv("success", "修改昵称成功");
              this.state = false;
              this.oldname = `${this.userInfo.name}`;
              this.isEdit();
            } else {
              this.onShowTipBySrv("warn", res.msg);
            }
          });
      } else {
        this.http
          .post(`${this.apiUrl}/user/edit`, null, {
            params: {
              name: `${this.userInfo.name}`,
              phone: `${this.userInfo.phone}`,
              code: `${this.userInfo.code}`
            }
          })
          .subscribe((res: any) => {
            this.disButton = false;
            if (res.code === 12000) {
              this.onShowTipBySrv("success", "保存成功");
              clearInterval(this.timer);
              this.oldphone = this.userInfo.phone;
              this.state = false;
              this.time = 0;
              this.userInfo.code = "";
            }
            if (res.code === 13000) {
              this.onShowTipBySrv("warn", "保存失败");
            }
            if (res.code === 10000) {
              this.onShowTipBySrv("warn", "验证码输入错误!");
            }
            if (res.code === 14000) {
              this.getUser();
              this.disablePhone = true;
              this.onShowTipBySrv("warn", "修改次数已达上限！");
            }
            if (res.code === 17001) {
              this.onShowTipBySrv("warn", res.msg);
            }
          });
      }
    }
  }
  
  doTimeOut() {
    this.timer = setInterval(() => {
      if (this.time > 0) {
        this.time--;
      }else{
        clearInterval(this.timer);
      }
    }, 1000);
  }
  infinite2() {
    if (this._boxNative.scrollTop >= this._content1Native.offsetHeight) {
      this._boxNative.scrollTop = 0;
    } else {
      this._boxNative.scrollTop++;
    }
    setTimeout(() => {
      this.infinite2();
    }, 100);
  }
}
