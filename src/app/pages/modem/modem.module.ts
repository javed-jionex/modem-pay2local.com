import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ModemRoutingModule } from "./modem-routing.module";
import { ModemComponent } from "./modem.component";

import { SharedModule } from "src/app/pipes/sharedModule";
import { ModemSidebarComponent } from "@modules/layout/modem-sidebar/modem-sidebar.component";
import { ModemHeaderModule } from "@modules/layout/modem-header/modem-header.module";

@NgModule({
  declarations: [ModemComponent, ModemSidebarComponent],
  imports: [CommonModule, ModemRoutingModule, SharedModule, ModemHeaderModule],
})
export class ModemModule {}
