import { NgModule } from "@angular/core";
import { AmountFormatPipe } from "./amount-pipe";
import { DecimalPipe } from "@angular/common";

@NgModule({
  declarations: [AmountFormatPipe],
  exports: [AmountFormatPipe],
  providers: [DecimalPipe],
})
export class AmountPipeModule {}
