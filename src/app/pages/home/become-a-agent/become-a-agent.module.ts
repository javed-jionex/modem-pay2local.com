import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BecomeAAgentRoutingModule } from "./become-a-agent-routing.module";
import { BecomeAAgentComponent } from "./become-a-agent.component";
import { SharedModule } from "src/app/pipes/sharedModule";

@NgModule({
  declarations: [BecomeAAgentComponent],
  imports: [CommonModule, BecomeAAgentRoutingModule, SharedModule],
})
export class BecomeAAgentModule {}
