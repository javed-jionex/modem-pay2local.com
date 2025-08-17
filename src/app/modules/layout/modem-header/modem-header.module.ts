import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModemHeaderComponent } from "./modem-header.component";
import { NumberPipeModule } from "@modules/pipe/numberpipe/number.pipe.module";
import { AmountPipeModule } from "@modules/pipe/amountpipe/amount.pipe.module";
import { SharedModule } from "src/app/pipes/sharedModule";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [ModemHeaderComponent],
  imports: [
    CommonModule,
    NumberPipeModule,
    AmountPipeModule,
    SharedModule,
    FormsModule,
  ],
  exports: [ModemHeaderComponent],
})
export class ModemHeaderModule {}
