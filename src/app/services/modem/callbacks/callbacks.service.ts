import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";
import { ConfigService } from "@services/config/config.service";

@Injectable({
  providedIn: "root",
})
export class CallBacksService {
  apiUrl: string = environment.backendHost;
  constructor(private http: HttpClient, private configService: ConfigService) {}
  getCallBacks(data: any) {
    // return this.http.get(
    //   this.configService.getBackendHost() + `api/v1/merchant/callbacks`
    // );
    // return this.http.get(
    //   this.configService.getBackendHost() + `api/v1/merchant/callback_configs`
    // );
    return this.http.post(
      this.configService.getBackendHost() +
        `api/v1//merchant/bank_callback_configs/custom_list`,
      data
    );
  }

  updateCallBacks(data: any) {
    // return this.http.post(
    //   this.configService.getBackendHost() +
    //     `api/v1/merchant/callbacks/update_callbacks`,
    //   data
    // );
    // return this.http.put(
    //   this.configService.getBackendHost() +
    //     `api/v1/merchant/callback_configs/${merchantID}`,
    //   data
    // );
    return this.http.post(
      this.configService.getBackendHost() +
        `api/v1/merchant/bank_callback_configs/update_config`,
      data
    );
  }
}
