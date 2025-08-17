import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { B2BRoutingModule } from "./b2-b-routing.module";
import { B2BComponent } from "./b2-b.component";
import { SharedModule } from "src/app/pipes/sharedModule";
import { NumberPipeModule } from "@modules/pipe/numberpipe/number.pipe.module";

@NgModule({
  declarations: [B2BComponent],
  imports: [CommonModule, B2BRoutingModule, SharedModule, NumberPipeModule],
})
export class B2BModule {}
