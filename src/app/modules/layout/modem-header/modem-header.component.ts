import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
} from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@environment/environment";
import { AlertService } from "@services/alert/alert.service";
import { CommonService } from "@services/common/common.service";
import { LocalStorageMerchantService } from "@services/modem/localstorage/local.service";
//import { CommonService } from '@services/merchant/common/common.service';
import { LoginService } from "@services/modem/login/login.service";

@Component({
  selector: "app-modem-header",
  templateUrl: "./modem-header.component.html",
  styleUrls: ["./modem-header.component.css"],
})
export class ModemHeaderComponent {
  userProfile: any;
  sidebar: boolean = false;
  currentBalance: number = 0;
  isShow: boolean = false;
  cashOut: number = 0;
  CashIn: number = 0;
  activeClass: string = "";
  themeMode: string = "style";
  pendingDepositTotal: string | number = 0;
  pendingWithdrawTotal: string | number = 0;
  supportTotal: string | number = 0;
  serverType: string = environment.serverType;
  countryName: any = "";
  isSandbox: boolean = false;
  @Output() isLoader = new EventEmitter();
  constructor(
    private alertService: AlertService,
    private logOutService: LoginService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private commonService: CommonService,
    private loginService: LoginService,
    private localStorageMerchantService: LocalStorageMerchantService
  ) {
    this.userProfile = this.localStorageMerchantService.getUserProfile();
  }
  ngOnInit() {
    this.themeMode =
      this.localStorageMerchantService.getThemeType() || "light-style";
    this.getCurrentBalance();

    // this.headerService.getPendingCount().subscribe((res) => {
    //   this.pendingDepositTotal = res?.deposit > 99 ? "99+" : res?.deposit ?? 0;
    //   this.pendingWithdrawTotal =
    //     res?.withdraw > 99 ? "99+" : res?.withdraw ?? 0;
    // });
    // this.headerService.getSupportCount().subscribe((res) => {
    //   this.supportTotal =
    //     res?.support_ticket > 99 ? "99+" : res?.support_ticket ?? 0;
    // });
    this.countryName = this.localStorageMerchantService.getProjectName();
    console.log(this.countryName);
    let subString = "sandbox";
    let isFind = this.countryName.includes(subString);
    if (isFind) {
      this.isSandbox = true;
    } else {
      this.isSandbox = false;
    }
  }
  logout() {
    //localStorage.clear();
    this.logOutService.logOut().subscribe((res: any) => {
      if (res.status == 200) {
        this.alertService.success("Success", res?.message);
        this.localStorageMerchantService.removeUerProfile();
        this.commonService.setThemeMode({ type: "light-style" });
        this.router.navigate(["/admin/login"]);
      }
    });
  }

  toggleSidebar() {
    // this.dashboardService.pedingCountRF(true);
    const body = this.elementRef.nativeElement.ownerDocument.body;

    if (this.sidebar && body.classList.contains("toggle-sidebar")) {
      this.renderer.removeClass(body, "toggle-sidebar");
    } else {
      this.renderer.addClass(body, "toggle-sidebar");
    }

    this.sidebar = !this.sidebar;
  }

  getCurrentBalance() {
    // this.logOutService.currentBalance().subscribe((res: any) => {
    //   if (res?.status === 200) {
    //     this.currentBalance = res?.current_balance;
    //     this.isShow = true;
    //     this.activeClass = "";
    //   }
    // });
  }
  refreshBalance() {
    this.activeClass = "active";
    this.getCurrentBalance();
  }
  /*** Login Back with admin */
  loginWithSuperadmin(ID: any) {
    this.alertService
      .conformAlert("Are you sure?", "You want to login with admin.")
      .then((result) => {
        if (result.value) {
          this.loginService.commonAdminLoginBack(ID).subscribe((res: any) => {
            if (res.status == 200) {
              //  this.localStorageService.sendUserProfile(res.data);
              this.alertService.success(
                "",
                "Logged In successfully with admin"
              );
              setTimeout(() => {
                window.location.href =
                  window.location.origin + "/admin/dashboard";
                //this.router.navigate(['/merchant/dashboard']);
              }, 300);
            }
          });
        }
      });
  }
  changeThemeMode(event: any, type: any) {
    this.themeMode = type;
    this.commonService.setThemeMode({ type: type });
  }

  // setProjectName(event: any) {
  //   let payLoad = {
  //     current_country: this.localStorageMerchantService.getProjectName(),
  //     target_country: event.target.value,
  //     email: this.userProfile?.userDetail?.email,
  //   };
  //   this.headerService.sendLoaderStatus(true);
  //   this.headerService?.countrySwitch(payLoad).subscribe((res: any) => {
  //     if (res.status == 200) {
  //       this.localStorageMerchantService.sendUserProfile(res.data);
  //       this.localStorageMerchantService.removeProjectName();
  //       this.localStorageMerchantService.sendProjectName(event.target.value);
  //       this.alertService.success("", "Country switch successfully");
  //       setTimeout(() => {
  //         window.location.href = window.location.origin + "/admin/dashboard";
  //       }, 1000);
  //     } else {
  //       this.alertService.warning(
  //         "",
  //         "You are not allowed login to this country"
  //       );
  //       setTimeout(() => {
  //         this.headerService.sendLoaderStatus(false);
  //       }, 500);
  //     }
  //   });
  // }
}
