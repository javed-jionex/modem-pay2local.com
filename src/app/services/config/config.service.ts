// config.service.ts
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";
import { LocalizationService } from "@services/global/localization.service";
import { LocalStorageMerchantService } from "@services/modem/localstorage/local.service";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  //backendHost: string;

  constructor(
    private localStorageMerchantService: LocalStorageMerchantService,
    private localizationService: LocalizationService
  ) {
    // this.backendHost = this.getBackendHost(
    //   this.localStorageMerchantService.getProjectName()
    // );
  }

  getBackendHost(): string {
    let serverType = this.localStorageMerchantService.getProjectName();
    switch (serverType) {
      case "dev_india":
        this.localizationService.setLanguage("ind");
        return "http://192.168.1.68:3001/";
      case "sandbox_india":
        this.localizationService.setLanguage("ind");
        return "https://sandboxapi.pay2in.com/";
      case "india":
        this.localizationService.setLanguage("ind");
        return "https://api.pay2in.com/";
      case "dev_nepal":
        this.localizationService.setLanguage("nep");
        return "http://192.168.1.68:3001/";
      case "sandbox_nepal":
        this.localizationService.setLanguage("nep");
        return "https://sandboxapi.pay2nep.com/";
      case "nepal":
        this.localizationService.setLanguage("nep");
        return "https://api.pay2nep.com/";
      case "dev_bangladesh":
        this.localizationService.setLanguage("bn");
        return "http://192.168.1.68:3001/";
      case "sandbox_bangladesh":
        this.localizationService.setLanguage("bn");
        return "https://testapi.pay2bd.com/";
      case "bangladesh":
        this.localizationService.setLanguage("bn");
        return "https://api.pay2bd.com/";

      case "dev_pakistan":
        this.localizationService.setLanguage("pak");
        return "http://192.168.1.68:3001/";
      case "sandbox_pakistan":
        this.localizationService.setLanguage("pak");
        return "https://sandboxapi.pay2pak.com/";
      case "pakistan":
        this.localizationService.setLanguage("pak");
        return "https://api.pay2pak.com/";
      case "dev_egypt":
        this.localizationService.setLanguage("ar-EG");
        return "http://192.168.1.68:3001/";
      case "sandbox_egypt":
        this.localizationService.setLanguage("ar-EG");
        return "https://sandboxapi.pay2eg.com/";
      case "egypt":
        this.localizationService.setLanguage("ar-EG");
        return "https://api.pay2eg.com/";
      default:
        this.localizationService.setLanguage("bn");
        return "https://api.pay2bd.com/";
      //return "https://bdapi.allnilam.com/";
    }
  }
}
