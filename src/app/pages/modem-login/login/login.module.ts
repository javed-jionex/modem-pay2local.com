import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxCaptchaModule } from "ngx-captcha";
import { ButtonComponent } from "@components/elements/button/button.component";
import { SharedModule } from "src/app/pipes/sharedModule";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    ButtonComponent,
    SharedModule,
  ],
})
export class LoginModule {}
