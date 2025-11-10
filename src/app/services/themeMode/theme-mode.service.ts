import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";

@Injectable({
  providedIn: "root",
})
export class ThemeModeService {
  apiUrl: string = environment.loginHost;
  constructor(private http: HttpClient) {}
  adminDarkTheme(data: any) {
    return this.http.put(
      this.apiUrl +
        `api/v1/users/update_dark_theme
      `,
      data
    );
  }
  merchantDarkTheme(data: any) {
    return this.http.post(
      this.apiUrl +
        `api/v1/merchant/dashboard/update_dark_theme
      `,
      data
    );
  }
}
