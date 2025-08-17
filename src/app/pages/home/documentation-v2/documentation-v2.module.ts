import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DocumentationV2RoutingModule } from "./documentation-v2-routing.module";
import { DocumentationV2Component } from "./documentation-v2.component";
import { SharedModule } from "src/app/pipes/sharedModule";

@NgModule({
  declarations: [DocumentationV2Component],
  imports: [CommonModule, DocumentationV2RoutingModule, SharedModule],
})
export class DocumentationV2Module {}
