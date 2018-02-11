import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AwardComponent } from './award.component';

import { ShareModule } from '../component/share.module';
import { FormsModule }   from '@angular/forms';
import { AwardsRoutesModule } from './award-route.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    AwardsRoutesModule,
    FormsModule
  ],
  declarations: [AwardComponent]
})
export class AwardModule { }
