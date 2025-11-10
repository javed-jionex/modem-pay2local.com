import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";

@Injectable({
  providedIn: "root",
})
export class CallBacksService {
  apiUrl: string = environment.loginHost;
  constructor(private http: HttpClient) {}
  getCallBacks(data: any) {
    return this.http.post(
      this.apiUrl + `api/v1//merchant/bank_callback_configs/custom_list`,
      data
    );
  }

  updateCallBacks(data: any) {
    return this.http.post(
      this.apiUrl + `api/v1/merchant/bank_callback_configs/update_config`,
      data
    );
  }
}
