import { Component } from "@angular/core";
import { AlertService } from "@services/alert/alert.service";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LocalStorageMerchantService } from "@services/modem/localstorage/local.service";
import { WithdrawalsService } from "@services/transactions/withdrawals/withdrawals.service";

@Component({
  selector: "app-withdrawals",
  templateUrl: "./withdrawals.component.html",
  styleUrls: ["./withdrawals.component.css"],
})
export class WithdrawalsComponent {
  displayedData: any = [];
  isDisplayed: boolean = true;
  closeResult: string = "";
  cryptoID: any;
  itemsPerPage: number = 50;
  pageNumber: number = 1;
  searchParm: any;
  totalRows: number = 0;
  showingData: any;
  userProfile: any;
  totalBlance: any;
  totalCommission: any;
  actionPermission: any;
  isFileDownload: boolean = false;
  constructor(
    private withdrawalsService: WithdrawalsService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private localStorageMerchantService: LocalStorageMerchantService
  ) {}
  ngOnInit() {
    // this.permissionService.sendMethod(this.routers.snapshot.data);
    //this.paymentsList();
    this.userProfile = this.localStorageMerchantService.getUserProfile();
    setTimeout(() => {
      // this.getPermisions();
    }, 1500);
  }

  paymentsList() {
    let data = {
      page_size: this.itemsPerPage,
      page_number: this.pageNumber,
      status: this.searchParm?.status || null,
      request_type: "withdraw",
      service_type: this.searchParm?.modem_type || null,
      start_date: this.searchParm?.start_date || null,
      end_date: this.searchParm?.end_date || null,
    };
    this.isDisplayed = true;
    this.withdrawalsService.list(data).subscribe((res: any) => {
      this.displayedData = res?.data;
      this.isDisplayed = false;
      this.totalRows = res?.total_rows;
      this.totalBlance = res?.total_amount;
      this.totalCommission = res?.total_commission;
    });
    setTimeout(() => {
      this.isDisplayed = false;
    }, 2000);
  }

  search(data: any) {
    this.searchParm = data;
    this.itemsPerPage = this.searchParm?.page_size;
    this.pageNumber = this.searchParm?.page_number;
    this.paymentsList();
  }
  onPageChange(page?: any): void {
    this.pageNumber = page;
    this.searchParm.page_number = page;
    this.paymentsList();
  }

  showData(content: any, item: any) {
    this.showingData = item;
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", size: "md" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  downloadDocument(type: string) {
    let data = {
      page_size: this.itemsPerPage,
      page_number: this.pageNumber,
      cust_phone: this.searchParm?.cust_phone,
      mobile_banking_id: this.searchParm?.mobile_banking_id || null,
      transaction_number: this.searchParm?.transaction_number || null,
      export_type: type,
      start_date: this.searchParm?.start_date || null,
      end_date: this.searchParm?.end_date || null,
      transaction_id: this.searchParm?.transaction_id || null,
      currency: this.searchParm?.currency || null,
      merchant_id: this.searchParm?.merchant_id || null,
      trx_id: this.searchParm?.trx_id || null,
      status: this.searchParm?.status || null,
      modem_type: this.searchParm?.modem_type || null,
    };
    this.withdrawalsService.downloadFile(data).subscribe((res: any) => {
      if (res.status == 200) {
        window.open(res.data, "_blank");
      }
    });
  }
  getLastPageNumber(): number {
    return Math.ceil(this.totalRows / this.itemsPerPage);
  }
  updateMerchantCommission() {
    let obj = {
      id: this.showingData?.id,
    };
    this.withdrawalsService
      .updateMerchantCommission(obj)
      .subscribe((res: any) => {
        if (res?.status == 200) {
          this.alertService.success("", res?.message);
          this.paymentsList();
          this.modalService.dismissAll();
        } else {
          this.alertService.warning("", res?.message);
        }
      });
  }
  // getPermisions() {
  //   this.actionPermission = this.commonService.getPermissionOBJ("Transactions");
  //   const filteredData = this.actionPermission[0]?.permissions?.filter(
  //     (item: any) => item.name == "Action"
  //   );
  //   this.isFileDownload = filteredData[0]?.action;
  // }
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
