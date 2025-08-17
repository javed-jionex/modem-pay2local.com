import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TokenLoginRoutingModule } from "./token-login-routing.module";
import { SharedModule } from "src/app/pipes/sharedModule";
import { TokenLoginComponent } from "./token-login.component";

@NgModule({
  declarations: [TokenLoginComponent],
  imports: [CommonModule, TokenLoginRoutingModule, SharedModule],
})
export class TokenLoginModule {}
