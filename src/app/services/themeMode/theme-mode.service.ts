import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";
import { ConfigService } from "@services/config/config.service";

@Injectable({
  providedIn: "root",
})
export class ThemeModeService {
  apiUrl: string = environment.backendHost;
  constructor(private http: HttpClient, private configService: ConfigService) {}
  adminDarkTheme(data: any) {
    return this.http.put(
      this.configService.getBackendHost() +
        `api/v1/users/update_dark_theme
      `,
      data
    );
  }
  merchantDarkTheme(data: any) {
    return this.http.post(
      this.configService.getBackendHost() +
        `api/v1/merchant/dashboard/update_dark_theme
      `,
      data
    );
  }
}
