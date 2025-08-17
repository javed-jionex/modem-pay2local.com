import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DepositsRoutingModule } from "./deposits-routing.module";
import { DepositsComponent } from "./deposits.component";
import { NgxPaginationModule } from "ngx-pagination";
import { SharedModule } from "src/app/pipes/sharedModule";
import { NumberPipeModule } from "@modules/pipe/numberpipe/number.pipe.module";
import { CheckPermissionPurePipeModule } from "@modules/pipe/checkpermission/check-permission-pure.pipe.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DetailComponent } from "./detail/detail.component";

@NgModule({
  declarations: [DepositsComponent, DetailComponent],
  imports: [
    CommonModule,
    DepositsRoutingModule,
    NgxPaginationModule,

    SharedModule,
    NumberPipeModule,
    CheckPermissionPurePipeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DepositsModule {}
