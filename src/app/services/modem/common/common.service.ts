import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";
import { Subject } from "rxjs";
import { LocalStorageMerchantService } from "../localstorage/local.service";
import { ConfigService } from "@services/config/config.service";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  apiUrl: string = environment.backendHost;
  objectRefresh = new Subject<any>();
  currentBalanceRefresh = new Subject<any>();
  isChangeThemeMode = new Subject<any>();
  // isAutoRefreshOBJ = new Subject<any>;
  constructor(
    private http: HttpClient,
    private localStorageMerchantService: LocalStorageMerchantService,
    private configService: ConfigService
  ) {}
  /** BL auto Refresh */
  isBLAutoRefresh(refresh: any) {
    this.objectRefresh.next({
      refresh: refresh.refresh,
      pageNumber: refresh.pageNumber,
    });
  }

  getIsBLAutoRefresh() {
    return this.objectRefresh.asObservable();
  }
  /** Current Balance Refresh */
  currentBalance(refresh: boolean) {
    this.currentBalanceRefresh.next({ refresh: refresh });
  }
  getCurrentBalance() {
    return this.currentBalanceRefresh.asObservable();
  }
  currentBalanceData() {
    return this.http.get(
      this.configService.getBackendHost() +
        `api/v1/merchant/payment_transactions/current_balance`
    );
  }
  setThemeMode(item: any) {
    this.isChangeThemeMode.next(item);
  }
  getThemeMode() {
    return this.isChangeThemeMode.asObservable();
  }
  getMerchantPermissionOBJ(parentName: string) {
    let permissionsData: any =
      this.localStorageMerchantService.getAdminPermisson();
    const parentPermissionObject = permissionsData?.filter(
      (item: any, index: any) => {
        return item.name == parentName;
      }
    );
    return parentPermissionObject;
  }
  getModemBanks(data: any) {
    return this.http.get(
      this.configService.getBackendHost() +
        `api/v1/merchant/dashboard/bank_with_type?bank_type=${data}`
    );
  }
  getPermissionOBJ(parentName: string) {
    let userProfile = this.localStorageMerchantService.getUserProfile();
    let permissionsData: any =
      this.localStorageMerchantService.getAdminPermisson();
    const parentPermissionObject = permissionsData?.filter(
      (item: any, index: any) => {
        return item.name == parentName;
      }
    );
    console.log(parentPermissionObject);
    return parentPermissionObject;
  }
}
