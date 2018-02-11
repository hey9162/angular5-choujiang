import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RedirectInterceptor } from "./../services/http-interceptor.service";

import { WeUiModule } from "ngx-weui";

import { PageComponent } from "./page/page.component";
import { HttpClientModule } from "@angular/common/http";
import { SwiperComponent } from "./swiper/swiper.component";
import { ErrorComponent } from "./error/error.component";
import { InputDirective } from './input.directive';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, WeUiModule.forRoot()],
  declarations: [PageComponent, SwiperComponent, ErrorComponent, InputDirective],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RedirectInterceptor,
      multi: true
    }
  ],
  exports: [FormsModule, WeUiModule, PageComponent, SwiperComponent,InputDirective]
})
export class ShareModule {}
