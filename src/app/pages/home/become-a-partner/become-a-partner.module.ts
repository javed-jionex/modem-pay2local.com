import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BecomeAPartnerRoutingModule } from "./become-a-partner-routing.module";
import { BecomeAPartnerComponent } from "./become-a-partner.component";
import { SharedModule } from "src/app/pipes/sharedModule";

@NgModule({
  declarations: [BecomeAPartnerComponent],
  imports: [CommonModule, BecomeAPartnerRoutingModule, SharedModule],
})
export class BecomeAPartnerModule {}
