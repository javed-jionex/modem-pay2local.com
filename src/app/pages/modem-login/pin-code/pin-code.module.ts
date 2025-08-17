import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PinCodeRoutingModule } from "./pin-code-routing.module";
import { PinCodeComponent } from "./pin-code.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "@components/elements/button/button.component";
import { SharedModule } from "src/app/pipes/sharedModule";

@NgModule({
  declarations: [PinCodeComponent],
  imports: [
    CommonModule,
    PinCodeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    SharedModule,
  ],
})
export class PinCodeModule {}
