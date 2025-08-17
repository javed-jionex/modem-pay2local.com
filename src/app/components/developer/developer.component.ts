import { Component, ElementRef, HostListener, Input } from "@angular/core";
import { environment } from "@environment/environment";
import { LocalizationService } from "@services/global/localization.service";
import { CommonService } from "@services/modem/common/common.service";
import { LocalStorageMerchantService } from "@services/modem/localstorage/local.service";

@Component({
  selector: "app-developer",
  templateUrl: "./developer.component.html",
  styleUrl: "./developer.component.css",
})
export class DeveloperComponent {
  @Input() p2pSolutionV1 = true;
  @Input() p2pSolutionV2 = true;
  @Input() withdrawalV1 = true;
  @Input() withdrawalV2 = true;
  @Input() p2cSolutionV1 = true;
  @Input() p2cSolutionV2 = true;
  @Input() checkPaymentStatus = true;
  isp2pSolutionV1 = false;
  isp2pSolutionV2 = false;
  iswithdrawalV1 = false;
  iswithdrawalV2 = false;
  isp2cSolutionV1 = false;
  isp2cSolutionV2 = false;
  ischeckPaymentStatus = false;
  appUrl: any = environment.domain;
  apiUrl: any = environment.loginHost;
  projectName: any = environment.project;
  bankType: any = [];
  activeClass: string = "";
  depositsRequestBody: any = {
    amount: 300,
    bank_type: "Nagad",
    request_type: "Deposit",
    redirect_url: "https://abc.com/example",
    merchant_payment_id: "hjvhgvhhgchchgchgc8",
    currency: "BDT",
    payment_mode: "auto",
  };
  depositsAgentRequestBody: any = {
    amount: 300,
    bank_type: "Nagad",
    request_type: "Deposit",
    redirect_url: "https://abc.com/example",
    merchant_payment_id: "hjvhgvhhgchchgchgc8",
    currency: "BDT",
  };
  depositsResponse: any = {
    status: 200,
    msg: "Success",
    requested_amount: 300.0,
    request_type: "Deposit",
    bank_type: "Nagad",
    currency: "BDT",
    redirect_url: `${this.appUrl}payment/de18331f-29ea-4c6d-9e23-b58bce6db208`,
    request_id: "1d8041f8-1c0c-4eb0-b664-6b3317b13c0b",
    callback_url: `${this.apiUrl}api/v1/secure/payment_requests/status?request_id=1d8041f8-1c0c-4eb0-b664-6b3317b13c0b`,
  };
  depositsAgentResponse: any = {
    status: 200,
    msg: "Success",
    requested_amount: 300.0,
    request_type: "Deposit",
    bank_type: "Nagad",
    currency: "BDT",
    redirect_url: `${this.appUrl}payment/de18331f-29ea-4c6d-9e23-b58bce6db208`,
    request_id: "1d8041f8-1c0c-4eb0-b664-6b3317b13c0b",
    callback_url: `${this.apiUrl}api/v1/secure/payment_requests/status?request_id=1d8041f8-1c0c-4eb0-b664-6b3317b13c0b`,
  };
  currency: any;
  isLoader: boolean = true;
  firstSegment: any;
  selectType: string = "p2p_agent";
  agentBankType: any = [];
  serverType: string = environment.serverType;
  countryName: any = "";
  apiServiceType: string = "";
  constructor(
    private el: ElementRef,
    private translationService: LocalizationService,
    private commonService: CommonService,
    private localStorageMerchantService: LocalStorageMerchantService
  ) {}
  @HostListener("window:scroll", [])
  onScroll(): void {
    const offset = this.el.nativeElement.getBoundingClientRect().top;
    if (offset < 0) {
      this.activeClass = "active";
    } else {
      this.activeClass = "";
    }
  }

  ngOnInit() {
    this.currency = this.translationService.translate("currency_name");
    let webUrl = document.location.pathname;
    this.firstSegment = webUrl.split("/")[1];

    this.getUrlData();
    setTimeout(() => {
      this.chaeckPermissionForContent();
    }, 2000);
    this.getAgentUrl();
    this.countryName = this.localStorageMerchantService.getProjectName();
    let subString = "sandbox";
    let isFind = this.countryName.includes(subString);
    if (isFind) {
      this.apiServiceType = "sandbox_";
    } else {
      this.apiServiceType = "";
    }
  }
  getAgentUrl() {
    this.merchantAgentModem();
  }

  merchantModem() {
    this.commonService.getModemBanks(this.selectType).subscribe((res: any) => {
      if (res.status == 200) {
        this.bankType = res?.data.filter((item: any) => item.status);
      }
    });
  }
  merchantAgentModem() {
    this.commonService.getModemBanks("p2p_agent").subscribe((res: any) => {
      if (res.status == 200) {
        this.agentBankType = res?.data.filter((item: any) => item.status);
      }
    });
  }
  getUrlData() {
    this.merchantModem();
  }
  chaeckPermissionForContent() {
    if (this.p2pSolutionV1) {
      this.isp2pSolutionV1 = true;
    } else if (this.p2pSolutionV2) {
      this.isp2pSolutionV2 = true;
    } else if (this.p2cSolutionV1) {
      this.isp2cSolutionV1 = true;
    } else if (this.p2cSolutionV2) {
      this.isp2cSolutionV2 = true;
    } else if (this.withdrawalV1) {
      this.iswithdrawalV1 = true;
    } else if (this.withdrawalV2) {
      this.iswithdrawalV2 = true;
    } else if (this.checkPaymentStatus) {
      this.ischeckPaymentStatus = true;
    }
    this.isLoader = false;
  }
  onClickPermissionForContent(value: any) {
    switch (value) {
      case "p2pSolutionV1":
        this.isp2pSolutionV1 = true;
        this.isp2pSolutionV2 = false;
        this.isp2cSolutionV1 = false;
        this.isp2cSolutionV2 = false;
        this.iswithdrawalV1 = false;
        this.iswithdrawalV2 = false;
        this.ischeckPaymentStatus = false;
        break;
      case "p2pSolutionV2":
        this.isp2pSolutionV1 = false;
        this.isp2pSolutionV2 = true;
        this.isp2cSolutionV1 = false;
        this.isp2cSolutionV2 = false;
        this.iswithdrawalV1 = false;
        this.iswithdrawalV2 = false;
        this.ischeckPaymentStatus = false;
        break;
      case "p2cSolutionV1":
        this.isp2pSolutionV1 = false;
        this.isp2pSolutionV2 = false;
        this.isp2cSolutionV1 = true;
        this.isp2cSolutionV2 = false;
        this.iswithdrawalV1 = false;
        this.iswithdrawalV2 = false;
        this.ischeckPaymentStatus = false;
        break;
      case "p2cSolutionV2":
        this.isp2pSolutionV1 = false;
        this.isp2pSolutionV2 = false;
        this.isp2cSolutionV1 = false;
        this.isp2cSolutionV2 = true;
        this.iswithdrawalV1 = false;
        this.iswithdrawalV2 = false;
        this.ischeckPaymentStatus = false;
        break;
      case "withdrawalV1":
        this.isp2pSolutionV1 = false;
        this.isp2pSolutionV2 = false;
        this.isp2cSolutionV1 = false;
        this.isp2cSolutionV2 = false;
        this.iswithdrawalV1 = true;
        this.iswithdrawalV2 = false;
        this.ischeckPaymentStatus = false;
        break;
      case "withdrawalV2":
        this.isp2pSolutionV1 = false;
        this.isp2pSolutionV2 = false;
        this.isp2cSolutionV1 = false;
        this.isp2cSolutionV2 = false;
        this.iswithdrawalV1 = false;
        this.iswithdrawalV2 = true;
        this.ischeckPaymentStatus = false;
        break;
      case "checkPaymentStatus":
        this.isp2pSolutionV1 = false;
        this.isp2pSolutionV2 = false;
        this.isp2cSolutionV1 = false;
        this.isp2cSolutionV2 = false;
        this.iswithdrawalV1 = false;
        this.iswithdrawalV2 = false;
        this.ischeckPaymentStatus = true;
        break;
      default:
        break;
    }
  }
}
