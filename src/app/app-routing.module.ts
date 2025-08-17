import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "@pages/home/home.component";
import { AuthGuard } from "@services/auth/auth.guard";

const routes: Routes = [
  { path: "", component: HomeComponent },
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
  // {
  //   path: "admin/signup",
  //   loadChildren: () =>
  //     import("@pages/merchant-login/sign-up/sign-up.module").then(
  //       (m) => m.SignUpModule
  //     ),
  // },
  {
    path: "documentation",
    loadChildren: () =>
      import("@pages/home/documentation/documentation.module").then(
        (m) => m.DocumentationModule
      ),
  },
  {
    path: "documentation-v2",
    loadChildren: () =>
      import("@pages/home/documentation-v2/documentation-v2.module").then(
        (m) => m.DocumentationV2Module
      ),
  },
  {
    path: "become-a-partner",
    loadChildren: () =>
      import("@pages/home/become-a-partner/become-a-partner.module").then(
        (m) => m.BecomeAPartnerModule
      ),
  },
  {
    path: "become-a-agent",
    loadChildren: () =>
      import("@pages/home/become-a-agent/become-a-agent.module").then(
        (m) => m.BecomeAAgentModule
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
