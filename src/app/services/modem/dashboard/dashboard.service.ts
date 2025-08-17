import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";
import { ApiService } from "@services/apiService/api-service.service";
import { ConfigService } from "@services/config/config.service";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  apiUrl: string = "";
  loginApiURL: string = environment.loginHost;
  constructor(private http: HttpClient, private apiService: ApiService) {}
  ngOnInit() {}
  updatePaymentAccept(data: any) {
    return this.apiService.request(
      "PUT",
      `api/v1/modem_web/profiles/switch_payment_accept`,
      data
    );
  }
  updateStatus(data: any) {
    return this.apiService.request(
      "PUT",
      `api/v1/modem_web/profiles/change_online_offline`,
      data
    );
  }
}
