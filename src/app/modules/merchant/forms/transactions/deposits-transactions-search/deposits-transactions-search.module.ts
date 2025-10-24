import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DepositsTransactionsSearchComponent } from "./deposits-transactions-search.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from "@danielmoncada/angular-datetime-picker";
import { SharedModule } from "src/app/pipes/sharedModule";

@NgModule({
  declarations: [DepositsTransactionsSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedModule,
  ],
  exports: [DepositsTransactionsSearchComponent],
})
export class DepositsTransactionsSearchModule {}
