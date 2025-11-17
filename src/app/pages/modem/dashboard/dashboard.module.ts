import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { SharedModule } from "src/app/pipes/sharedModule";
import { FormsModule } from "@angular/forms";
import { NumberPipeModule } from "@modules/pipe/numberpipe/number.pipe.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    NumberPipeModule,
  ],
})
export class DashboardModule {}
