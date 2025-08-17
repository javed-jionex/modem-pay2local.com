import { ErrorHandler, NgModule, Provider } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ErrorHandlerComponent } from "@components/error-handler/error-handler.component";
import { environment } from "@environment/environment";
// import { GlobalErrorHandler } from '@services/global/error-handler';
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpCallsInterceptor } from "@services/global/http.intercepter";
import { HomeComponent } from "./pages/home/home.component";
import { SignUpComponent } from "./pages/modem-login/sign-up/sign-up.component";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { SharedModule } from "./pipes/sharedModule";
import { AppRoutingModule } from "./app-routing.module";
let providers: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpCallsInterceptor,
    multi: true,
  },
];

// Only enable custom error handler in production mode
if (environment) {
  providers.push({
    provide: ErrorHandler,
    // useClass: GlobalErrorHandler,
  });
}
@NgModule({
  declarations: [
    AppComponent,
    ErrorHandlerComponent,
    HomeComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      maxOpened: 2, // Limit the number of open toasts to 2
      autoDismiss: true, // Automatically dismiss the oldest toast when the limit is reached
    }),
    BrowserAnimationsModule,
    SlickCarouselModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule,
  ],
  providers: providers,
  bootstrap: [AppComponent],
})
export class AppModule {}
