import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WithdrawalsRoutingModule } from "./withdrawals-routing.module";
import { WithdrawalsComponent } from "./withdrawals.component";
import { NgxPaginationModule } from "ngx-pagination";
import { WithdrawalsSearchModule } from "@modules/merchant/forms/pending-request/withdrawals-search/withdrawals-search.module";
import { DateDurationPipe } from "src/app/pipes/date-duration.pipe";
import { SharedModule } from "src/app/pipes/sharedModule";
import { NumberPipeModule } from "@modules/pipe/numberpipe/number.pipe.module";
import { CheckPermissionPurePipeModule } from "@modules/pipe/checkpermission/check-permission-pure.pipe.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [WithdrawalsComponent],
  imports: [
    CommonModule,
    WithdrawalsRoutingModule,
    NgxPaginationModule,
    WithdrawalsSearchModule,
    SharedModule,
    NumberPipeModule,
    CheckPermissionPurePipeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class WithdrawalsModule {}
