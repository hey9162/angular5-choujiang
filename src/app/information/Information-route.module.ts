import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { InformationComponent } from './information.component';

const informationRoutes: Routes = [
  { path: 'information', component:InformationComponent, data: { title: '资讯' } },
  { path: '', redirectTo: '/information', pathMatch: 'full' },
]

@NgModule({
  imports:[
    RouterModule.forChild(informationRoutes)
  ],
  exports: [RouterModule]
})

export class InformationsRoutesModule {
  
}
