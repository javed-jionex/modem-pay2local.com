import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { WithdrawalService } from "@services/admin/pending-request/withdrawals/withdrawals.service";
import { AlertService } from "@services/alert/alert.service";
import { SharedModule } from "src/app/pipes/sharedModule";
@Component({
  selector: "app-reject-multiple-withdrawals",
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: "./reject-multiple-withdrawals.component.html",
  styleUrl: "./reject-multiple-withdrawals.component.css",
})
export class RejectMultipleWithdrawalsComponent {
  @Input() ids: number[] = [];
  notesForm: FormGroup;
  errorMessage: string = "";
  constructor(
    private alertService: AlertService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private withdrawalService: WithdrawalService
  ) {
    this.notesForm = this.formBuilder.group({
      notes: [""],
    });
  }

  ngOnInit() {
    this.ids;
  }

  transmitDataOnClose() {
    this.activeModal.close(true);
  }

  submitForm(formValue: any) {
    if (!formValue) {
      this.errorMessage = "Notes is required";
      return;
    }
    if (this.notesForm.valid) {
      let notes = formValue;
      let obj = {
        ids: this.ids,
        notes: notes,
      };
      this.withdrawalService
        .rejectMultipleWithdrawals(obj)
        .subscribe((res: any) => {
          if (res?.status === 200) {
            this.alertService.success("success", res?.message);
            // this.closeModal()
            this.transmitDataOnClose();
          } else {
            this.alertService.error("error", res?.message);
            this.transmitDataOnClose();
          }
        });
    }
  }
}
