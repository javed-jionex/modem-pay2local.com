import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertService } from "@services/alert/alert.service";
import { LocalStorageMerchantService } from "@services/modem/localstorage/local.service";
import { LoginService } from "@services/modem/login/login.service";
import { finalize } from "rxjs";

@Component({
  selector: "app-pin-code",
  templateUrl: "./pin-code.component.html",
  styleUrls: ["./pin-code.component.css"],
})
export class PinCodeComponent {
  loginForm!: FormGroup;
  loadingLogin = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: LoginService,
    private alertService: AlertService,
    private localStorageMerchantService: LocalStorageMerchantService
  ) {}
  ngOnInit() {
    this.initLoginForm();
  }
  initLoginForm(data?: any) {
    this.loginForm = this.fb.group({
      pinCode: [data?.name || "", Validators.required],
    });
  }
  save(data: any) {
    if (this.loginForm.invalid) {
      return;
    }
    this.loadingLogin = true;
    let userProfile: any = this.localStorageMerchantService.getPinCode();
    let pincode = {
      pincode: this.loginForm.value.pinCode,
    };
    this.userService
      .pinCode(pincode, userProfile?.token)
      .pipe(finalize(() => (this.loadingLogin = false)))
      .subscribe((res: any) => {
        if (res?.message == "Success") {
          this.alertService.success("Success", "Logged In successfully");
          this.localStorageMerchantService.sendUserProfile(userProfile);
          this.router.navigate(["/admin/dashboard"]);
        } else {
          this.alertService.error("error", res?.message);
        }
      });
  }
}
