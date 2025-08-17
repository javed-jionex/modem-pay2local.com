import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DepositService } from "@services/modem/pending-request/deposits/deposits.service";

@Component({
  selector: "app-deposits",
  templateUrl: "./deposits.component.html",
  styleUrls: ["./deposits.component.css"],
})
export class DepositsComponent {
  displayedData: any;
  isDisplayed: boolean = true;
  closeResult: string = "";
  actionForm!: FormGroup;
  showingData: any;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private depositService: DepositService,
    private routers: ActivatedRoute
  ) {}
  ngOnInit() {
    this.initForm();
    this.paymentsRequestList();
  }
  initForm() {
    this.actionForm = this.fb.group({
      id: [""],
      notes: [""],
    });
  }
  paymentsRequestList() {
    this.isDisplayed = true;
    this.depositService.list().subscribe((res: any) => {
      this.displayedData = res?.data;
      this.isDisplayed = false;
    });
    setTimeout(() => {
      this.isDisplayed = false;
    }, 2000);
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
