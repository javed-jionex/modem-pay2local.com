import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TransactionsRoutingModule } from "./transactions-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { DepositsComponent } from "./deposits/deposits.component";
import { WithdrawalsComponent } from "./withdrawals/withdrawals.component";
import { SharedModule } from "src/app/pipes/sharedModule";
import { NumberPipeModule } from "@modules/pipe/numberpipe/number.pipe.module";
import { CheckPermissionPurePipeModule } from "@modules/pipe/checkpermission/check-permission-pure.pipe.module";
import { WithdrawalsTransactionsSearchModule } from "@modules/merchant/forms/transactions/withdrawals-transactions-search/withdrawals-transactions-search.module";
import { DepositsTransactionsSearchModule } from "@modules/merchant/forms/transactions/deposits-transactions-search/deposits-transactions-search.module";

@NgModule({
  declarations: [DepositsComponent, WithdrawalsComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    WithdrawalsTransactionsSearchModule,
    DepositsTransactionsSearchModule,
    SharedModule,
    NumberPipeModule,
    CheckPermissionPurePipeModule,
  ],
})
export class TransactionsModule {}
