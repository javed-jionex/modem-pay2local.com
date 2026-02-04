import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DepositService } from "@services/modem/pending-request/deposits/deposits.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "@services/alert/alert.service";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrl: "./detail.component.css",
})
export class DetailComponent {
  displayedData: any;
  isDisplayed: boolean = true;
  closeResult: string = "";
  actionForm!: FormGroup;
  approveForm!: FormGroup;
  showingData: any;
  formType: string = "";
  depositID: any;
  maxTrxID: number = 0;
  minTrxID: number = 0;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private depositService: DepositService,
    private routers: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
  ) {}
  ngOnInit() {
    this.depositID = this.routers.snapshot.paramMap.get("id");
    this.initForm();
    this.paymentsRequestList();
  }
  initForm() {
    let parttrn = new RegExp(`^[^\\s]{${this.minTrxID},}$`);
    this.approveForm = this.fb.group({
      transaction_id: ["", [Validators.required, Validators.pattern(parttrn)]],
      amount: [""],
      id: [""],
    });
    this.actionForm = this.fb.group({
      id: [""],
      notes: ["", Validators.required],
    });
  }
  paymentsRequestList() {
    this.isDisplayed = true;
    this.depositService.singleRecord(this.depositID).subscribe((res: any) => {
      this.displayedData = res?.data;
      this.approveForm.patchValue(this.displayedData);
      this.isDisplayed = false;
    });

    setTimeout(() => {
      this.isDisplayed = false;
    }, 2000);
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
  showData(content: any, item: any) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", size: "md" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
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
  isType(type: string) {
    this.formType = type;
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
  saveApprove(data: any) {
    this.isLoading = true;
    if (this.approveForm.invalid) {
      this.isLoading = false;
      return;
    }
    let payLoad = {
      amount: data?.amount,
      transaction_id: data?.transaction_id,
      id: this.depositID,
    };

    this.depositService.approve(payLoad).subscribe((res: any) => {
      if (res.status === 200) {
        this.alertService.success("", res.message);
        this.router.navigate(["admin/deposit"]);
        this.isLoading = false;
      } else {
        this.alertService.error("", res.message);
        this.isLoading = false;
      }
    });
  }
  saveReject(data: any) {
    if (this.actionForm.invalid) {
      return;
    }
    this.actionForm.value.id = this.depositID;
    this.depositService.reject(this.actionForm.value).subscribe((res: any) => {
      if (res?.status === 200) {
        this.alertService.success("", res?.message);

        this.router.navigate(["admin/deposit"]);
      } else {
        this.alertService.error("error", res?.message);
      }
    });
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
