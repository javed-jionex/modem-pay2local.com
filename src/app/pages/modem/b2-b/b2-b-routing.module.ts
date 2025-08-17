import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { B2BComponent } from "./b2-b.component";

const routes: Routes = [
  {
    path: "",
    component: B2BComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class B2BRoutingModule {}
