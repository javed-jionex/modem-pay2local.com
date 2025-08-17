import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TokenLoginComponent } from "./token-login.component";

const routes: Routes = [
  {
    path: "",
    component: TokenLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokenLoginRoutingModule {}
