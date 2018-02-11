import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { AwardComponent } from './award.component';

const informationRoutes: Routes = [
  { path: '', component: AwardComponent,data: { title: '抽奖' }},
]
@NgModule({
  imports:[
    RouterModule.forChild(informationRoutes)
  ],
  exports: [RouterModule]
})

export class AwardsRoutesModule {
  
}
