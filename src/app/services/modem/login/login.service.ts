import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";
import { ApiService } from "@services/apiService/api-service.service";
import { ConfigService } from "@services/config/config.service";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  apiUrl: string = "";
  loginApiURL: string = environment.loginHost;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private apiService: ApiService
  ) {}
  ngOnInit() {}
  login(data: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    const requestOptions = { headers: headers };
    return this.http.post(
      `${this.loginApiURL}api/v1/modem_web/auth/login`,
      data,
      requestOptions
    );
  }
  pinCode(data: any, token: any) {
    console.log(this.configService.getBackendHost());
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    const requestOptions = { headers: headers };
    return this.http.post(
      this.configService.getBackendHost() +
        `api/v1/merchant/verifications/pincode`,
      data,
      requestOptions
    );
  }
  tokenLogin(token: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    });
    let data = {};
    const requestOptions = { headers: headers };
    return this.http.put(
      this.loginApiURL + `api/v1/modem_web/profiles/decode_token_and_login`,
      data,
      requestOptions
    );
  }
  genratePinCode() {
    return this.http.get(
      `${this.configService.getBackendHost()}api/v1/users/pincode`
    );
  }
  merchantPinCodeGenrate() {
    return this.http.get(
      `${this.configService.getBackendHost()}api/v1/merchants/generate_merchant_pin`
    );
  }
  create(data: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    const requestOptions = { headers: headers };
    return this.http.post(
      `${this.configService.getBackendHost()}api/v1/merchants/signup`,
      data,
      requestOptions
    );
  }
  logOut() {
    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Accept': '*/*'
    //   });

    // const requestOptions = { headers: headers };
    return this.http.post(
      `${this.configService.getBackendHost()}api/v1/merchant/verifications/sign_out_merchant`,
      {}
    );
  }
  currentPermission() {
    return this.http.get(
      `${this.configService.getBackendHost()}api/v1/merchant/dashboard/current_permission`
    );
  }
  // currentBalance() {
  //   return this.http.get(
  //     `${this.configService.getBackendHost()}api/v1/merchant/dashboard/current_balance`
  //   );
  // }
  profile() {
    return this.http.get(
      `${this.configService.getBackendHost()}/api/v1/modem_web/profiles`
    );
  }
  update(data: any) {
    return this.http.put(
      `${this.configService.getBackendHost()}api/v1/merchant/dashboard/profile_update`,
      data
    );
  }
  changePassword(data: any) {
    return this.http.put(
      `${this.configService.getBackendHost()}api/v1/merchant/dashboard/change_password`,
      data
    );
  }
  /** Merchant to Admin Login */
  commonAdminLoginBack(ID: any) {
    return this.http.put(
      `${this.configService.getBackendHost()}api/v1/merchant/dashboard/${ID}/stop_impersonating_merchant`,
      {}
    );
  }
  commissionList(data: any) {
    return this.apiService.request(
      "POST",
      `api/v1/merchant/dashboard/get_commissions`,
      data
    );
  }
  totalTransaction(data: any) {
    return this.apiService.request(
      "POST",
      `api/v1/merchant/balance_manager/total_of_transactions`,
      data
    );
  }
  allBankCalculation() {
    return this.apiService.request(
      "GET",
      `api/v1/merchant/balance_manager/all_methods_balance`
    );
  }
}
