import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WithdrawalsSearchComponent } from "./withdrawals-search.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from "@danielmoncada/angular-datetime-picker";
import { SharedModule } from "src/app/pipes/sharedModule";

@NgModule({
  declarations: [WithdrawalsSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedModule,
  ],
  exports: [WithdrawalsSearchComponent],
})
export class WithdrawalsSearchModule {}
