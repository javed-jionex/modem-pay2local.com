import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { GlobalRoutesService } from "@services/globalRoutes/global-routes.service";
import { CommonService } from "@services/common/common.service";
import { LocalStorageMerchantService } from "@services/modem/localstorage/local.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private commonService: CommonService,
    private authService: AuthService,
    private globalRoutes: GlobalRoutesService,
    private localStorageMerchantService: LocalStorageMerchantService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const data = route.data;
    let expectedRoles: any = state?.url;
    let routeName = expectedRoles.split("/");

    this.getMerchantCurrentPermission();

    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
        this.isAtuhorized(route, state);
      }, 100); // 2000 milliseconds (2 seconds) delay before allowing/denying access
    });
  }
  private isAtuhorized(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let matchValue: any;
    let routeName;
    let editRouteName;
    let expectedRoles: any = state?.url;
    routeName = expectedRoles.split("/");
    // if(routeName[3] == "edit" || routeName[3] == "add"){
    //   expectedRoles = "/"+routeName[1]+"/"+routeName[2];
    // }else{
    //   expectedRoles = expectedRoles;
    // }

    if (this.authService.isLoggdInMerchant()) {
      this.globalRoutes
        .hasMerchantPermission()
        .then((hasPermission) => {
          if (hasPermission == false) {
            window.location.href = "/admin/dashboard";
          }
        })
        .catch((error) => {
          console.error("Error determining permission:", error);
        });
      // let roles: any = this.globalRoutes.checkNewMerchantRolePermission();
      // roles.forEach((item:any) => {
      //   if(item.name == "Dashboard" || item.name == "Transactions Logs"){

      //     if(item.url == expectedRoles){
      //       matchValue = item?.showOption;
      //     }
      //   }else{
      //     item?.permissions.forEach((childItem:any) => {
      //       if(expectedRoles==childItem.url){
      //         if(childItem.showOption){
      //           matchValue = true
      //         }else{
      //           matchValue = false;
      //         }
      //         // if(childItem.view || childItem.action){
      //         //   matchValue = true;
      //         // }else{
      //         //   matchValue = false;
      //         // }

      //       }
      //      });
      //   }
      // });
      // if(matchValue == false){
      //   window.location.href = "/merchant/dashboard"
      //  }
    } else {
      window.location.href = "/admin/login";
      return false;
    }

    //return matchValue;
    return true;
  }

  getMerchantCurrentPermission() {
    // this.commonService.getMerchantCurrentPermission().subscribe((res: any) => {
    //   this.localStorageMerchantService.sendAdminPermisson(res.data);
    // });
  }
}
