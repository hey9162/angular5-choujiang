import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from '../component/share.module';
import { ListRoutesModule } from './list-route.module';

import { ListComponent } from './list.component';
import { RedeemPrizeComponent } from './redeem-prize/redeem-prize.component';
import { ExpressComponent } from './express/express.component';

import { ListProviderService } from './services/list-provider.service';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    ListRoutesModule
  ],
  declarations: [
    ListComponent,
    RedeemPrizeComponent,
    ExpressComponent
  ],
  providers: [
    ListProviderService
  ]
})
export class ListModule { }
