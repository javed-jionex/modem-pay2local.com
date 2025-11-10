import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";

@Injectable({
  providedIn: "root",
})
export class DepositsService {
  apiUrl: string = environment.loginHost;
  constructor(private http: HttpClient) {}
  list(data: any) {
    return this.http.post(
      this.apiUrl + `api/v1/modem_web/profiles/filter_cpr_list`,
      data
    );
  }
  downloadFile(data: any) {
    return this.http.post(
      this.apiUrl + `api/v1/modem/payment_transactions/tr_deposit_export`,
      data
    );
  }
}
