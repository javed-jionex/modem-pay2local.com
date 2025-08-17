import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "@services/alert/alert.service";
import { LoginService } from "@services/modem/login/login.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent {
  profileDetails: any;
  closeResult: string = "";
  profileForm!: FormGroup;
  changePasswordForm!: FormGroup;
  constructor(
    private profileService: LoginService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: Router
  ) {}
  ngOnInit() {
    this.profileList();
  }

  profileList() {
    this.profileService.profile().subscribe((res: any) => {
      if (res.status == 200) {
        this.profileDetails = res.data;
      }
    });
  }
  formatLabel(value: string): string {
    if (!value) return "";

    // Replace underscores with spaces
    const spaced = value.replace(/_/g, " ");

    // Capitalize each word
    return spaced
      .split(" ")
      .map((word) => {
        // If word is lowercase with digits (like "p2p"), convert to uppercase
        if (/^[a-z0-9]+$/.test(word)) {
          return word.toUpperCase();
        }

        // Capitalize first letter only
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }
}
