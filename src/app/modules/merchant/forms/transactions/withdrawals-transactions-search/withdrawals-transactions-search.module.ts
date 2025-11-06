import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WithdrawalsTransactionsSearchComponent } from "./withdrawals-transactions-search.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from "@danielmoncada/angular-datetime-picker";
import { SharedModule } from "src/app/pipes/sharedModule";
import { BDTSharedModule } from "src/app/directive/shared.module";

@NgModule({
  declarations: [WithdrawalsTransactionsSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedModule,
    BDTSharedModule,
  ],
  exports: [WithdrawalsTransactionsSearchComponent],
})
export class WithdrawalsTransactionsSearchModule {}
