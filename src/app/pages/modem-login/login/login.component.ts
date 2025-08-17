import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "@environment/environment";
import { AlertService } from "@services/alert/alert.service";
import { LocalStorageMerchantService } from "@services/modem/localstorage/local.service";
import { LoginService } from "@services/modem/login/login.service";
import { finalize } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  protected aFormGroup!: FormGroup;
  loginForm!: FormGroup;
  siteKey: string = "6LfPrFwmAAAAAE82Ym7ByQfAZXdl07EtaCIjLjS9";
  capchaPass: boolean = false;
  loadingLogin = false;
  serverType: string = environment.serverType;
  custNumber: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private alertService: AlertService,
    private localStorageMerchantService: LocalStorageMerchantService
  ) {}
  ngOnInit() {
    this.aFormGroup = this.fb.group({
      recaptcha: ["", Validators.required],
    });
    this.initLoginForm();
  }

  handleSuccess(event: any) {
    this.capchaPass = true;
  }
  initLoginForm(data?: any) {
    this.loginForm = this.fb.group({
      phone_number: ["", Validators.required],
      pincode: ["", Validators.required],
      // country: ["bangladesh"],
    });
    let userProfile: any = this.localStorageMerchantService.getUserProfile();
    let token = userProfile?.token;
    if (token) {
      this.router.navigate(["/admin/dashboard"]);
    } else {
      this.localStorageMerchantService.removeUerProfile();
    }
  }
  save(data: any) {
    if (this.loginForm.invalid) {
      return;
    }
    this.loadingLogin = true;
    this.loginForm.value.phone_number = this.custNumber;
    this.loginService
      .login(this.loginForm.value)
      .pipe(finalize(() => (this.loadingLogin = false)))
      .subscribe(
        (res: any) => {
          if (res?.status == 200) {
            // this.localStorageMerchantService.sendpinCode(res.data);
            // this.router.navigate(["/admin/pin-code"]);
            this.localStorageMerchantService.sendUserProfile(res.data);
            this.router.navigate(["/admin/dashboard"]);
          } else if (res?.status == 403) {
            this.alertService.error("Error", res.message);
          } else {
            this.alertService.error(
              "Error",
              "username or password is incorrect"
            );
          }
        },
        (error: any) => {
          this.alertService.error("Error", "username or password is incorrect");
        }
      );
  }
  setProjectName(event: any) {
    this.localStorageMerchantService.sendProjectName(event.target.value);
  }
  onKeyPress(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (input.value.charAt(0) === "0") {
      if (input.value.length >= 11) {
        event.preventDefault();
      }
    } else if (input.value.charAt(0) != "0") {
      if (input.value.length >= 10) {
        event.preventDefault();
      }
    }
  }
  numberOnly(event: any): boolean {
    this.custNumber = event.target.value;
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 41 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
