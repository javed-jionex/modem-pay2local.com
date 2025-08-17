import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginService } from "@services/modem/login/login.service";
import { DashboardService } from "@services/modem/dashboard/dashboard.service";
import { AlertService } from "@services/alert/alert.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {
  isDisplayed: boolean = false;
  listData: any;
  serviceType = "";
  statusType = "";
  constructor(
    private profileService: LoginService,
    private dashboardService: DashboardService,
    private alertService: AlertService
  ) {}
  ngOnInit() {
    this.getDetails();
  }
  getDetails() {
    this.profileService.profile().subscribe((res: any) => {
      if (res.status == 200) {
        this.listData = res.data;
        this.serviceType = this.listData?.payment_accept;
        this.statusType = this.listData?.status;
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
  paymentAccept() {
    let data = {
      payment_accept: this.serviceType,
    };

    this.dashboardService.updatePaymentAccept(data).subscribe((res: any) => {
      if (res?.response?.status == 200) {
        this.getDetails();
        this.alertService.success("", res?.response?.message);
      }
    });
  }
  changeStatus() {
    let data = {
      status: this.statusType,
    };

    this.dashboardService.updateStatus(data).subscribe((res: any) => {
      if (res?.response?.status == 200) {
        this.getDetails();
        this.alertService.success("", res?.response?.message);
      }
    });
  }
}
