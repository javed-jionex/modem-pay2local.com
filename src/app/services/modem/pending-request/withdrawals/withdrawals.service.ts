import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";

@Injectable({
  providedIn: "root",
})
export class WithdrawalService {
  apiUrl: string = environment.loginHost;
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get(
      this.apiUrl + `api/v1/modem_web/payments/get_pending_withdraw`,
    );
  }
  getListOnClick() {
    return this.http.get(
      this.apiUrl + `api/v1/modem_web/payments/request_withdraw`,
    );
  }
  reject(data: any) {
    return this.http.put(
      this.apiUrl + `api/v1/modem_web/payments/reject_withdraw`,
      data,
    );
  }
  release(data: any) {
    return this.http.put(
      this.apiUrl + `api/v1/modem_web/payments/release_withdraw`,
      data,
    );
  }

  waiting(data: any) {
    return this.http.put(
      this.apiUrl + `api/v1/modem_web/payments/waiting_withdraw`,
      data,
    );
  }
  approve(data: any) {
    return this.http.put(
      this.apiUrl + `api/v1/modem_web/payments/approve_withdraw`,
      data,
    );
  }
  viewWithdrawalsRecord(data: any) {
    return this.http.put(
      this.apiUrl + `api/v1/modem_web/payments/view_withdraw_request`,
      data,
    );
  }
}
