import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "@pages/home/home.component";
import { ModemCheckVersionComponent } from "@pages/modem-check-version/modem-check-version.component";
import { AuthGuard } from "@services/auth/auth.guard";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "modem-version", component: ModemCheckVersionComponent },
  {
    path: "admin",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("@pages/modem/modem.module").then((m) => m.ModemModule),
  },
  {
    path: "admin/login",
    loadChildren: () =>
      import("@pages/modem-login/login/login.module").then(
        (m) => m.LoginModule
      ),
  },
  {
    path: "admin/token-login",
    loadChildren: () =>
      import("@pages/modem-login/token-login/token-login.module").then(
        (m) => m.TokenLoginModule
      ),
  },
  {
    path: "admin/pin-code",
    loadChildren: () =>
      import("@pages/modem-login/pin-code/pin-code.module").then(
        (m) => m.PinCodeModule
      ),
  },
  {
    path: "**",
    loadChildren: () =>
      import("@pages/common/page-not-found/page-not-found.module").then(
        (e) => e.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
