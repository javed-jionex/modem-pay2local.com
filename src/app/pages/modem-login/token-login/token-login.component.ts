import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "@services/modem/login/login.service";
import { LocalStorageMerchantService } from "@services/modem/localstorage/local.service";
import { AlertService } from "@services/alert/alert.service";
import { finalize } from "rxjs";

@Component({
  selector: "app-token-login",
  templateUrl: "./token-login.component.html",
  styleUrl: "./token-login.component.css",
})
export class TokenLoginComponent {
  isLoader: any = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: LoginService,
    private alertService: AlertService,
    private localStorageMerchantService: LocalStorageMerchantService,
    private router: Router
  ) {}
  ngOnInit() {
    let token = this.activatedRoute.snapshot.queryParams["token"];
    if (token) {
      this.loginwithToken(token);
    }
  }
  loginwithToken(token: any) {
    this.userService
      .tokenLogin(token)
      .pipe(finalize(() => (this.isLoader = false)))
      .subscribe((res: any) => {
        if (res?.message == "Success") {
          this.alertService.success("Success", "Logged In successfully");
          this.localStorageMerchantService.sendProjectName(res.country);
          this.localStorageMerchantService.sendUserProfile(res.data);
          this.router.navigate(["/admin/dashboard"]);
        } else {
          this.alertService.error("error", res?.message);
        }
      });
  }
}
