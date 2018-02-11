import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { API_URL } from "./app.tokens";
import { ShareModule } from "./component/share.module";

import { InformationModule } from "./information/information.module";
import { AwardModule } from "./award/award.module";
import { ListModule } from "./list/list.module";

import { AppRoutesModule } from "./app-route.module";

import { FormVerifyService } from "./services/form-verify.service";
import { WxService } from "./services/wx-service";

import { AppComponent } from "./app.component";

import { baseUrl } from "./component/base-url";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ShareModule,
    InformationModule,
    AppRoutesModule,
    AwardModule,
    ListModule,
    BrowserAnimationsModule
  ],
  providers: [
    FormVerifyService,
    WxService,
    {
      provide: API_URL,
      useValue:  baseUrl
    },
    [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
