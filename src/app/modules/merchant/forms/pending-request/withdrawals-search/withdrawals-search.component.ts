import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AlertService } from "@services/alert/alert.service";
import { CommonService } from "@services/modem/common/common.service";
import { DateFilterService } from "@services/modem/date-filters/date-filter.service";
import { WithdrawalService } from "@services/modem/pending-request/withdrawals/withdrawals.service";

@Component({
  selector: "app-withdrawals-search",
  templateUrl: "./withdrawals-search.component.html",
  styleUrls: ["./withdrawals-search.component.css"],
})
export class WithdrawalsSearchComponent {
  @Input() itemsPerPage: any;
  @Input() pageNumber: any;
  @Output() withdrawalSearchData = new EventEmitter();
  @Output() fileDownload = new EventEmitter();
  settingSearchForm!: FormGroup;
  searchParm: any;
  isReset: boolean = true;
  commonData: any;
  bankList: any = [];
  isTime: boolean = true;
  banTypeError: string = "";
  today: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private bankService: WithdrawalService,
    private alertService: AlertService,
    private commonService: CommonService,
    private dateFilterService: DateFilterService
  ) {}
  ngOnInit() {
    this.initSearchForm();
    // this.merchantModemData();
    this.today = this.dateFilterService.parseStringToDate(
      this.dateFilterService.dailyEndDate()
    );
  }
  initSearchForm() {
    this.settingSearchForm = this.fb.group({
      mobile_banking_id: [""],
      transaction_id: [""],
      cust_phone: [""],
      merchant_id: [""],
      modem_type: [""],
      start_date: [""],
      end_date: [""],
      page_size: [this.itemsPerPage],
    });
  }
  formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1); // Adding 1 because getMonth returns zero-based index
    const day = this.padZero(date.getDate());
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  // formatDateTime(date: Date): string {
  // 	const year = date.getUTCFullYear();
  // 	const month = this.padZero(date.getUTCMonth() + 1); // Adding 1 because getMonth returns zero-based index
  // 	const day = this.padZero(date.getUTCDate());
  // 	const hours = this.padZero(date.getUTCHours());
  // 	const minutes = this.padZero(date.getUTCMinutes());
  // 	const seconds = this.padZero(date.getUTCSeconds());
  // 	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  //   }
  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  search(data: any) {
    this.pageNumber = 1;
    // let startDate = '';
    // let endDate = '';
    // if (data.start_date) {
    // 	startDate =
    // 		data.start_date.year +
    // 		'-' +
    // 		data.start_date.month +
    // 		'-' +
    // 		data.start_date.day;
    // }
    // if (data.end_date) {
    // 	endDate =
    // 		data.end_date.year +
    // 		'-' +
    // 		data.end_date.month +
    // 		'-' +
    // 		data.end_date.day;
    // }
    // 		if (data.start_date > data.end_date) {

    // 			this.alertService.error(
    // 		'Date Filter',
    // 		'Start Date should be less then End Date'
    // 	);
    // 	return;
    // }
    // if (!data.start_date || !data.end_date) {
    // 	this.alertService.error('Date Filter Validation', 'Please select both Start Date and End Date');
    // 	return;
    //   }

    // const startDate = new Date(data.start_date);
    // const endDate = new Date(data.end_date);

    // if (startDate > endDate) {
    //   this.alertService.error(
    //     "Date Filter",
    //     "Start Date should be less than End Date"
    //   );
    //   return;
    // }

    // let start_date = null;
    // let end_date = null;
    // if (data.start_date) {
    //   start_date = this.formatDateTime(startDate);
    // }
    // if (data.start_date) {
    //   end_date = this.formatDateTime(endDate);
    // }
    this.searchParm = {
      page_size: this.itemsPerPage,
      page_number: this.pageNumber,
      // mobile_banking_id: data.mobile_banking_id || null,
      // transaction_id: data.transaction_id || null,
      // cust_phone: data.cust_phone || null,
      // merchant_id: data.merchant_id || null,
      // modem_type: data.modem_type || null,
      // // start_date: startDate,
      // // end_date: endDate,
      // start_date: start_date,
      // end_date: end_date,
    };
    this.isReset = false;
    this.withdrawalSearchData.emit(this.searchParm);
  }
  resetSearch() {
    this.settingSearchForm.reset({
      page_size: "50",
      merchant_id: "",
      mobile_banking_id: "",
      modem_type: "",
    });
    this.search(this.settingSearchForm.value);
    this.isReset = true;
    this.bankList = [];
  }

  // merchantModemData() {
  //   this.bankService.getModemAndMerchant().subscribe((res: any) => {
  //     if (res.status === 200) {
  //       this.commonData = res?.data;
  //       //this.bankList = res?.data.banks.filter((item: any) => item.status);
  //     }
  //   });
  // }
  docDocument(type: any) {
    this.fileDownload.emit(type);
  }
  modemType(event: any) {
    this.commonService
      .getModemBanks(event.target.value)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.bankList = res?.data.filter((item: any) => item.status);
          if (res.data.length == 0) {
            this.banTypeError = "No Bank available in " + event.target.value;
          } else {
            this.banTypeError = "";
            this.settingSearchForm.patchValue({ mobile_banking_id: "" });
          }
        }
      });
  }
  bankType() {
    if (this.bankList.length == 0) {
      if (this.banTypeError == "") {
        this.banTypeError = "Please select Service Type";
      }
    } else {
      this.banTypeError = "";
    }
  }
}
