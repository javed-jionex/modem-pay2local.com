import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";

@Injectable({
  providedIn: "root",
})
export class LocalStorageMerchantService {
  apiUrl: string = environment.backendHost;
  projectName: string = environment.project;
  constructor(private http: HttpClient) {}

  sendUserProfile(data: any) {
    localStorage.setItem(
      this.projectName + "merchantUserProfile",
      JSON.stringify(data)
    );
  }
  getUserProfile() {
    let userProfile: any =
      localStorage.getItem(this.projectName + "merchantUserProfile") || null;
    userProfile = JSON.parse(userProfile);
    return userProfile;
  }
  removeUerProfile() {
    localStorage.removeItem(this.projectName + "merchantUserProfile");
  }
  sendpinCode(data: any) {
    localStorage.setItem(
      this.projectName + "merchantPinCode",
      JSON.stringify(data)
    );
  }
  getPinCode() {
    let userPincode: any =
      localStorage.getItem(this.projectName + "merchantPinCode") || null;
    userPincode = JSON.parse(userPincode);
    return userPincode;
  }
  sendProjectName(data: any) {
    localStorage.setItem(
      this.projectName + "merchantProjectName",
      JSON.stringify(data)
    );
  }
  getProjectName() {
    let merchantProjectName: any =
      localStorage.getItem(this.projectName + "merchantProjectName") || null;
    merchantProjectName = JSON.parse(merchantProjectName);
    return merchantProjectName;
  }
  removeProjectName() {
    localStorage.removeItem(this.projectName + "merchantProjectName");
  }
  removePindCode() {
    localStorage.removeItem(this.projectName + "merchantPinCode");
  }
  sendAdminPermisson(data: any) {
    localStorage.setItem(
      this.projectName + "merchantPermission",
      JSON.stringify(data)
    );
  }
  getAdminPermisson() {
    let adminPermisson: any =
      localStorage.getItem(this.projectName + "merchantPermission") || null;
    adminPermisson = JSON.parse(adminPermisson);
    return adminPermisson;
  }
  removeAdminPermisson() {
    localStorage.removeItem(this.projectName + "merchantPermission");
  }
  sendThemeMode(data: any) {
    localStorage.setItem(this.projectName + "darkMode", JSON.stringify(data));
  }
  getThemeMode() {
    let darkMode: any =
      localStorage.getItem(this.projectName + "darkMode") || null;
    darkMode = JSON.parse(darkMode);
    return darkMode;
  }
  removeThemeMode(data: any) {
    localStorage.removeItem(this.projectName + "darkMode");
  }
  sendThemeType(data: any) {
    localStorage.setItem(this.projectName + "themeMode", JSON.stringify(data));
  }
  getThemeType() {
    let themeMode: any =
      localStorage.getItem(this.projectName + "themeMode") || null;
    themeMode = JSON.parse(themeMode);
    return themeMode;
  }
  removeThemeType(data: any) {
    localStorage.removeItem(this.projectName + "themeMode");
  }
}
