import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './component/error/error.component';
const appRoutes: Routes = [
  { path: '', loadChildren: 'app/information/information.module#InformationModule' },
  { path: 'award', loadChildren: 'app/award/award.module#AwardModule'},
  { path: 'list', loadChildren: 'app/list/list.module#ListModule' },
  { path: '**', component: ErrorComponent } 
]
@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutesModule {

}
