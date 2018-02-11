import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// 共享模块
import { ShareModule } from '../component/share.module';

import { InformationComponent } from './information.component';
import { InformationsRoutesModule } from './Information-route.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    InformationsRoutesModule
  ],
  declarations: [InformationComponent]
})
export class InformationModule { }
