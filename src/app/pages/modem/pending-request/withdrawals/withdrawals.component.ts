import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "@services/alert/alert.service";
import { CommonService } from "@services/modem/common/common.service";
import { LocalStorageMerchantService } from "@services/modem/localstorage/local.service";
import { WithdrawalService } from "@services/modem/pending-request/withdrawals/withdrawals.service";
import { PermissionMerchantService } from "@services/modem/permission/permission.service";
import { interval, take } from "rxjs";
@Component({
  selector: "app-withdrawals",
  templateUrl: "./withdrawals.component.html",
  styleUrls: ["./withdrawals.component.css"],
})
export class WithdrawalsComponent {
  displayedData: any;
  isDisplayed: boolean = true;
  closeResult: string = "";
  cryptoID: any;
  itemsPerPage: number = 50;
  pageNumber: number = 1;
  searchParm: any = [];
  totalRows: number = 0;
  userProfile: any;
  showingData: any;
  actionForm!: FormGroup;
  rejectForm!: FormGroup;
  actionType: any;
  actionID: any;
  transaction_id: any;
  errorMessageTransaction: string = "";
  totalBlance: any;
  actionPermission: any;
  formType: string = "";
  withdrawalID: any;
  maxTrxID: number = 0;
  minTrxID: number = 0;
  isAutoRefresh: boolean = true;
  seconds: number = 3;
  timerSubscription: any;
  constructor(
    private withdrawalService: WithdrawalService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private localStorageMerchantService: LocalStorageMerchantService,
    private permissionService: PermissionMerchantService,
    private routers: ActivatedRoute,
    private commonService: CommonService,
    private alertService: AlertService
  ) {}
  ngOnInit() {
    this.permissionService.sendMethod(this.routers.snapshot.data);
    this.paymentsRequestList();
    this.userProfile = this.localStorageMerchantService.getUserProfile();
    // this.initForm();
    this.setTimer();
    setTimeout(() => {
      this.getPermisions();
    }, 1500);
  }
  initForm() {
    let parttrn = new RegExp(`^[^\\s]{${this.minTrxID},}$`);
    this.actionForm = this.fb.group({
      transaction_id: ["", [Validators.required, Validators.pattern(parttrn)]],
      notes: [""],
      id: [""],
    });
    this.rejectForm = this.fb.group({
      id: [""],
      notes: ["", Validators.required],
    });
  }
  paymentsRequestList() {
    let data = {
      page_size: this.itemsPerPage,
      page_number: this.pageNumber,
      // mobile_banking_id: this.searchParm?.mobile_banking_id || null,
      // transaction_id: this.searchParm?.transaction_id || null,
      // cust_phone: this.searchParm?.cust_phone || null,
      // merchant_id: this.searchParm?.merchant_id || null,
      // start_date: this.searchParm?.start_date || null,
      // export_type: "list",
      // end_date: this.searchParm?.end_date || null,
      // modem_type: this.searchParm?.modem_type || null,
    };
    this.isDisplayed = true;
    this.withdrawalService.list().subscribe((res: any) => {
      this.displayedData = res.data;
      if (this.displayedData?.bank_name == "Nagad") {
        this.maxTrxID = 8;
        this.minTrxID = 8;
      } else {
        this.maxTrxID = 10;
        this.minTrxID = 10;
      }
      this.initForm();
      if (this.displayedData?.cust_phone) {
        this.isAutoRefresh = false;
        this.setTimer();
      } else {
        if (this.isAutoRefresh != true) {
          this.isAutoRefresh = true;
          this.setTimer();
        }
      }
      this.withdrawalID = this.displayedData?.id;
      this.isDisplayed = false;

      // this.dashboardService.pedingCountRF(true);
    });
    setTimeout(() => {
      this.isDisplayed = false;
    }, 2000);
  }

  search(data: any) {
    this.searchParm = data;
    this.itemsPerPage = this.searchParm?.page_size;
    this.pageNumber = this.searchParm?.page_number;
    this.paymentsRequestList();
  }
  onPageChange(page?: any): void {
    this.pageNumber = page;
    this.searchParm.page_number = page;
    this.paymentsRequestList();
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
      mobile_banking_id: this.searchParm?.mobile_banking_id || null,
      transaction_id: this.searchParm?.transaction_id || null,
      cust_phone: this.searchParm?.cust_phone || null,
      export_type: type,
      merchant_id: this.searchParm?.merchant_id || null,
      start_date: this.searchParm?.start_date || null,
      end_date: this.searchParm?.end_date || null,
      modem_type: this.searchParm?.modem_type || null,
    };
    // this.withdrawalService.downloadFile(data).subscribe((res: any) => {
    //   if (res.status == 200) {
    //     window.open(res.data, "_blank");
    //   }
    // });
  }
  saveAction(data: any) {
    // if (this.rejectedForm.invalid) {
    // 	return;
    //   }
    // let rejectData = {
    // 	id: this.rejectedID,
    // 	reject_notes: data.notes
    // }
    // this.incompleteWithdrawalsRequestService.rejectWithdrawals(rejectData).subscribe((res:any)=>{
    // 	if (res?.status === 200) {
    // 		this.alertService.success('success', res?.message);
    // 		this.modalService.dismissAll();
    // 	} else {
    // 		this.alertService.error('error', res?.message);
    // 	}
    // })
  }
  getLastPageNumber(): number {
    return Math.ceil(this.totalRows / this.itemsPerPage);
  }
  getPermisions() {
    this.actionPermission = this.commonService.getPermissionOBJ("Pendings");
  }
  isType(type: string) {
    this.formType = type;
  }
  saveApprove(data: any) {
    if (this.actionForm.invalid) {
      return;
    }
    this.actionForm.value.id = this.withdrawalID;
    this.withdrawalService
      .approve(this.actionForm.value)
      .subscribe((res: any) => {
        if (res?.status === 200) {
          this.alertService.success("success", res?.message);
          this.paymentsRequestList();
        } else {
          this.alertService.error("error", res?.message);
        }
      });
  }
  saveReject(data: any) {
    if (this.rejectForm.invalid) {
      return;
    }
    this.rejectForm.value.id = this.withdrawalID;
    this.withdrawalService.reject(data).subscribe((res: any) => {
      if (res?.status === 200) {
        this.alertService.success("success", res?.message);
        this.paymentsRequestList();
      } else {
        this.alertService.error("error", res?.message);
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
  checkMaxLimit(limit: any, event: any) {
    const input = event.target as HTMLInputElement;
    // Define a regular expression to remove special characters
    const regex = /[^a-zA-Z0-9]/g; // This regex allows only alphanumeric characters. Adjust as needed.

    // Remove special characters from the input value
    input.value = input.value.replace(regex, "");

    // Check if input exceeds the limit
    if (input.value.length > limit) {
      // Trim the input value to the limit
      input.value = input.value.slice(0, limit);
    }

    // Update the form control value
    this.actionForm.patchValue({ transaction_id: input.value });

    return input;
  }

  /***Set Interval time */

  startTimer(): void {
    if (this.isAutoRefresh) {
      this.timerSubscription = interval(1000) // 12 seconds
        .pipe(take(Infinity))
        .subscribe(() => {
          if (this.seconds == 0) {
            //this.autoRefreshList();
            this.paymentsRequestList();
            this.seconds = 3;
          } else {
            this.seconds -= 1;
          }
        });
    }
  }
  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  setTimer() {
    if (this.isAutoRefresh == false) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }
  get formattedTime(): string {
    const minutes = Math.floor(this.seconds / 60);
    const remainingSeconds = this.seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  copyMerchant(token: string) {
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = token;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
    this.alertService.success("Success", "Coppied !");
  }
}
