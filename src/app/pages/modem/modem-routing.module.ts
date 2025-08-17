import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModemComponent } from "./modem.component";

const routes: Routes = [
  { path: "", redirectTo: "/admin/dashboard", pathMatch: "full" },
  {
    path: "",
    component: ModemComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("@pages/modem/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "withdrawals",
        data: { moduleName: "Pendings", name: "View" },
        loadChildren: () =>
          import(
            "@pages/modem/pending-request/withdrawals/withdrawals.module"
          ).then((m) => m.WithdrawalsModule),
      },
      {
        path: "deposit",
        data: { moduleName: "Pendings", name: "View" },
        loadChildren: () =>
          import("@pages/modem/pending-request/deposits/deposits.module").then(
            (m) => m.DepositsModule
          ),
      },
      {
        path: "profile",
        data: { moduleName: "profile", name: "View" },
        loadChildren: () =>
          import("@pages/modem/profile/profile.module").then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: "b2b-payments",
        data: { moduleName: "profile", name: "View" },
        loadChildren: () =>
          import("@pages/modem/b2-b/b2-b.module").then((m) => m.B2BModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModemRoutingModule {}
