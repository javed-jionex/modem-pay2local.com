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
      this.projectName + "modemUserProfile",
      JSON.stringify(data)
    );
  }
  getUserProfile() {
    let userProfile: any =
      localStorage.getItem(this.projectName + "modemUserProfile") || null;
    userProfile = JSON.parse(userProfile);
    return userProfile;
  }
  removeUerProfile() {
    localStorage.removeItem(this.projectName + "modemUserProfile");
  }
  sendpinCode(data: any) {
    localStorage.setItem(
      this.projectName + "modemPinCode",
      JSON.stringify(data)
    );
  }
  getPinCode() {
    let userPincode: any =
      localStorage.getItem(this.projectName + "modemPinCode") || null;
    userPincode = JSON.parse(userPincode);
    return userPincode;
  }
  sendProjectName(data: any) {
    localStorage.setItem(
      this.projectName + "modemProjectName",
      JSON.stringify(data)
    );
  }
  getProjectName() {
    let modemProjectName: any =
      localStorage.getItem(this.projectName + "modemProjectName") || null;
    modemProjectName = JSON.parse(modemProjectName);
    return modemProjectName;
  }
  removeProjectName() {
    localStorage.removeItem(this.projectName + "modemProjectName");
  }
  removePindCode() {
    localStorage.removeItem(this.projectName + "modemPinCode");
  }
  sendAdminPermisson(data: any) {
    localStorage.setItem(
      this.projectName + "modemPermission",
      JSON.stringify(data)
    );
  }
  getAdminPermisson() {
    let adminPermisson: any =
      localStorage.getItem(this.projectName + "modemPermission") || null;
    adminPermisson = JSON.parse(adminPermisson);
    return adminPermisson;
  }
  removeAdminPermisson() {
    localStorage.removeItem(this.projectName + "modemPermission");
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
