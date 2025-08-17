import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";
import { ApiService } from "@services/apiService/api-service.service";
import { ConfigService } from "@services/config/config.service";

@Injectable({
  providedIn: "root",
})
export class B2BService {
  apiUrl: string = "";
  loginApiURL: string = environment.loginHost;
  constructor(private http: HttpClient, private apiService: ApiService) {}
  ngOnInit() {}
  B2BData() {
    return this.apiService.request(
      "GET",
      `api/v1/modem_web/profiles/get_modem_b2b`
    );
  }
}
