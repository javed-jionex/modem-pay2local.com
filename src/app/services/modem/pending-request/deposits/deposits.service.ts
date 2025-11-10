import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";

@Injectable({
  providedIn: "root",
})
export class DepositService {
  apiUrl: string = environment.loginHost;
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get(
      this.apiUrl + `api/v1/modem_web/payments/get_pending_deposit`
    );
  }
  singleRecord(id: any) {
    return this.http.get(
      this.apiUrl + `api/v1/modem_web/payments/get_deposit_detail?id=${id}`
    );
  }
  reject(data: any) {
    return this.http.put(
      this.apiUrl + `api/v1/modem_web/payments/reject_pending_deposit`,
      data
    );
  }
  approve(data: any) {
    return this.http.put(
      this.apiUrl + `api/v1/modem_web/payments/approve_pending_deposit`,
      data
    );
  }
}
