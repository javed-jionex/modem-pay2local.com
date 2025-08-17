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
  showingData: any;
  formType: string = "";
  depositID: any;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private depositService: DepositService,
    private routers: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}
  ngOnInit() {
    this.depositID = this.routers.snapshot.paramMap.get("id");
    this.initForm();
    this.paymentsRequestList();
  }
  initForm() {
    this.actionForm = this.fb.group({
      id: [""],
      notes: ["", Validators.required],
    });
  }
  paymentsRequestList() {
    this.isDisplayed = true;
    this.depositService.singleRecord(this.depositID).subscribe((res: any) => {
      this.displayedData = res?.data;
      this.isDisplayed = false;
    });

    setTimeout(() => {
      this.isDisplayed = false;
    }, 2000);
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
  saveApprove() {
    this.formType = "Approve";
    this.alertService
      .conformAlert("Are you sure?", "You want to Approve")
      .then((result) => {
        if (result.value) {
          this.depositService
            .approve({ id: this.depositID })
            .subscribe((res: any) => {
              if (res.status === 200) {
                this.alertService.success("Success", res.message);
                this.router.navigate(["admin/deposit"]);
              }
            });
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
