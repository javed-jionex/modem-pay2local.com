import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "@services/config/config.service";

@Injectable({
  providedIn: "root",
})
export class BalanceManagerService {
  apiUrl: string = "";

  // isAutoRefreshOBJ = new Subject<any>;
  constructor(private http: HttpClient, private configService: ConfigService) {}
  ngOnInit() {
    this.apiUrl = this.configService.getBackendHost();
    console.log(this.apiUrl);
  }

  getAllBalanceService(data: any) {
    return this.http.post(
      this.configService.getBackendHost() +
        `api/v1/merchant/balance_manager/custom_list`,
      data
    );
  }
}
