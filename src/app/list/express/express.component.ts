import { Component, OnInit, OnDestroy } from '@angular/core';

import { ListProviderService } from '../services/list-provider.service';

@Component({
  selector: 'app-express',
  templateUrl: './express.component.html',
  styleUrls: ['./express.component.scss']
})
export class ExpressComponent implements OnInit, OnDestroy {
  express: any[];

  constructor(private listSrv: ListProviderService) { }
  
  ngOnInit() {
    this.listSrv.addPageClass(true, './assets/images/express_bg.jpg');
    this.listSrv.fetchData('/express/expmsg', null)
      .subscribe((res: any) => {
        const data = res.data;
        let express = [
          { itemLeft: ['昵', '称：'], info: '' },
          { itemLeft: ['手', '机', '号：'], info: '' },
          { itemLeft: ['通', '讯', '地', '址：'], info: '' },
          { itemLeft: ['物', '流', '单', '号：'], info: '' },
          { itemLeft: ['物', '流', '状', '态：'], info: '已发货' },
          { itemLeft: ['订', '单', '信', '息：'], info: '' }
        ];

        if (data) {
          express[0].info = data.userName;
          express[1].info = data.phone.replace(/(\d{3})\d{5}(\d{3})/, '$1*****$2');
          express[2].info = data.address;
          express[3].info = data.orderNum;
          express[5].info = data.expName;
          this.express = express;
        }
    });
  }

  ngOnDestroy() {
    this.listSrv.removePageClass();
  }
}
