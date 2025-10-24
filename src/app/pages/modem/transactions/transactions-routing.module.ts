import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WithdrawalsComponent } from "./withdrawals/withdrawals.component";
import { DepositsComponent } from "./deposits/deposits.component";

const routes: Routes = [
  {
    path: "withdrawals",
    component: WithdrawalsComponent,
  },
  {
    path: "deposits",
    component: DepositsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
