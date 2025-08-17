import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NumberPipeModule } from "@modules/pipe/numberpipe/number.pipe.module";
import { SharedModule } from "src/app/pipes/sharedModule";

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NumberPipeModule,
    SharedModule,
  ],
})
export class ProfileModule {}
