import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";
import { ConfigService } from "@services/config/config.service";

@Injectable({
  providedIn: "root",
})
export class DepositService {
  apiUrl: string = environment.backendHost;
  constructor(private http: HttpClient, private configService: ConfigService) {}
  list() {
    return this.http.get(
      this.configService.getBackendHost() +
        `api/v1/modem_web/payments/get_pending_deposit`
    );
  }
  singleRecord(id: any) {
    return this.http.get(
      this.configService.getBackendHost() +
        `api/v1/modem_web/payments/get_deposit_detail?id=${id}`
    );
  }
  reject(data: any) {
    return this.http.put(
      this.configService.getBackendHost() +
        `api/v1/modem_web/payments/reject_pending_deposit`,
      data
    );
  }
  approve(data: any) {
    return this.http.put(
      this.configService.getBackendHost() +
        `api/v1/modem_web/payments/approve_pending_deposit`,
      data
    );
  }
}
