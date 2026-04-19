import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginService } from "@services/modem/login/login.service";
import { DashboardService } from "@services/modem/dashboard/dashboard.service";
import { AlertService } from "@services/alert/alert.service";
import { DepositService } from "@services/modem/pending-request/deposits/deposits.service";
import { WithdrawalService } from "@services/modem/pending-request/withdrawals/withdrawals.service";
import { PosthogService } from "@services/modem/posthog-services/posthog.service";

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
  withdrawalCount: number = 0;
  depositCount: number = 0;
  constructor(
    private profileService: LoginService,
    private dashboardService: DashboardService,
    private depositService: DepositService,
    private withdrawalService: WithdrawalService,
    private alertService: AlertService,
    private posthog: PosthogService,
  ) {}
  ngOnInit() {
    this.getDetails();
    this.paymentsRequestList();
  }
  getDetails() {
    this.isDisplayed = true;
    this.profileService.profile().subscribe((res: any) => {
      if (res.status == 200) {
        this.isDisplayed = false;
        this.listData = res.data;
        this.serviceType = this.listData?.payment_accept;
        this.statusType = this.listData?.status;
        this.posthogSendData(this.listData);
      }
    });
  }
  posthogSendData(data: any) {
    this.posthog.capture("modem_data_loaded", {
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      pincode: data.pincode,
      limit: data.limit,
      type_of_modem: data.type_of_modem,
      payment_accept: data.payment_accept,
      status: data.status,
      is_login: data.is_login,
      cashin_progress: data.cashin_progress,

      // 👇 flatten transactions
      today_deposit: data.transactions.today_deposit,
      monthly_deposit: data.transactions.monthly_deposit,
      today_withdraw: data.transactions.today_withdraw,
      monthly_withdraw: data.transactions.monthly_withdraw,
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
      } else {
        this.alertService.warning("", res?.response?.message);
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
  paymentsRequestList() {
    this.depositService.list().subscribe((res: any) => {
      this.depositCount = res?.data?.length ?? 0;
    });
    this.withdrawalService.list().subscribe((res: any) => {
      this.withdrawalCount = res?.data?.length ?? 0;
    });
  }
}
