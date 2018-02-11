import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list.component';
import { RedeemPrizeComponent } from './redeem-prize/redeem-prize.component';
import { ExpressComponent } from './express/express.component';

const listRoutes: Routes = [
  { path: '', component: ListComponent, data: { title: '获奖名单' } },
  { path: 'redeem', component: RedeemPrizeComponent, data: { title: '兑换奖品' } },
  { path: 'express', component: ExpressComponent, data: { title: '我的物流' } }
]

@NgModule({
  imports:[
    RouterModule.forChild(listRoutes)
  ],
  exports: [ RouterModule ]
})
export class ListRoutesModule { }
