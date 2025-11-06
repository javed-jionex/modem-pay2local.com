import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BdtStartAtDirective } from "./bdt-default.directive";

@NgModule({
  declarations: [BdtStartAtDirective],
  imports: [CommonModule],
  exports: [BdtStartAtDirective],
})
export class BDTSharedModule {}
