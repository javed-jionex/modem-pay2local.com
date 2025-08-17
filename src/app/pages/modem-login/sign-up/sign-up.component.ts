import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertService } from "@services/alert/alert.service";
import { LocalStorageMerchantService } from "@services/modem/localstorage/local.service";
import { LoginService } from "@services/modem/login/login.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private alertService: AlertService,
    private localStorageMerchantService: LocalStorageMerchantService
  ) {}
  ngOnInit() {
    this.initLoginForm();
    this.generatePin();
  }

  initLoginForm(data?: any) {
    this.signUpForm = this.fb.group({
      business_name: ["", Validators.required],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      phone: ["", Validators.required],
      pin: ["", Validators.required],
      merchant_type: ["", Validators.required],
      email: [
        "",
        Validators.required,
        Validators.pattern(
          "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"
        ),
      ],
      password: ["", Validators.required],
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
    if (this.signUpForm.invalid) {
      return;
    }
    this.loginService.create(this.signUpForm.value).subscribe(
      (res: any) => {
        if (res?.status == 200) {
          this.router.navigate(["/admin/login"]);
          this.alertService.success("Success", res.message);
        } else if (res?.status == 403) {
          this.alertService.error("Error", res.message);
        } else {
          this.alertService.error("Error", "username or password is incorrect");
        }
      },
      (error: any) => {
        this.alertService.error("Error", "username or password is incorrect");
      }
    );
  }
  generatePin(type?: any) {
    this.loginService.merchantPinCodeGenrate().subscribe((res: any) => {
      if (res?.stats === 200) {
        this.signUpForm.patchValue({ pin: res?.data });
        if (type == "gen") {
          this.alertService.success("Success", "Pin Code Genrate successfully");
        }
      }
    });
  }
  onKeyPress(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (input.value.length >= 10) {
      event.preventDefault();
    }
  }
}
