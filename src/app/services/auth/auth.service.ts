import { Injectable } from "@angular/core";
import { LocalStorageMerchantService } from "@services/modem/localstorage/local.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private localStorageMerchantService: LocalStorageMerchantService
  ) {}

  isLoggdInMerchant() {
    let userProfile: any = this.localStorageMerchantService.getUserProfile();
    const session = userProfile?.token;
    if (session) {
      return true;
    } else {
      return false;
    }
  }
}
