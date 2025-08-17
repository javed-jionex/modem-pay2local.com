import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeveloperComponent } from "./developer.component";
import { SharedModule } from "src/app/pipes/sharedModule";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [DeveloperComponent],
  imports: [CommonModule, SharedModule, FormsModule],
  exports: [DeveloperComponent],
})
export class DeveloperModule {}
