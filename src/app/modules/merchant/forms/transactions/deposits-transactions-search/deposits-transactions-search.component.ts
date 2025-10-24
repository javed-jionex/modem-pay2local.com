import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AlertService } from "@services/alert/alert.service";
import { CommonService } from "@services/modem/common/common.service";
import { DateFilterService } from "@services/modem/date-filters/date-filter.service";
import { DepositsService } from "@services/transactions/deposits/deposits.service";
@Component({
  selector: "app-deposits-transactions-search",
  templateUrl: "./deposits-transactions-search.component.html",
  styleUrls: ["./deposits-transactions-search.component.css"],
})
export class DepositsTransactionsSearchComponent {
  @Input() itemsPerPage: any;
  @Input() pageNumber: any;
  @Input() isFileDownload: boolean = false;
  @Output() depositSearchData = new EventEmitter();
  @Output() fileDownload = new EventEmitter();
  settingSearchForm!: FormGroup;
  searchParm: any;
  isReset: boolean = true;
  modemData: any;
  commonData: any;
  bankList: any;
  isTime: boolean = true;
  startDate: any;
  endDate: any;
  dateTimeData: any = [];
  banTypeError: string = "";
  today: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private dateFilterService: DateFilterService,
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.initSearchForm();
    // this.merchantModemData();
    this.dateFilterSearch();
    this.today = this.dateFilterService.parseStringToDate(
      this.dateFilterService.dailyEndDate()
    );
  }
  dateFilterSearch() {
    this.dateTimeData = this.dateFilterService.getDateTime();
    if (this.dateTimeData?.type == "TrxDeposit") {
      this.startDate = this.dateFilterService.parseStringToDate(
        this.dateTimeData.start_date
      );
      this.endDate = this.dateFilterService.parseStringToDate(
        this.dateTimeData.end_date
      );
      this.settingSearchForm.patchValue({
        start_date: this.startDate,
        end_date: this.endDate,
      });
      setTimeout(() => {
        this.search(this.dateTimeData);
        this.dateFilterService.sendDateTime("");
      }, 400);
    } else {
      this.startDate = this.dateFilterService.parseStringToDate(
        this.dateFilterService.daliyStartDate()
      );
      this.endDate = this.dateFilterService.parseStringToDate(
        this.dateFilterService.dailyEndDate()
      );
      this.settingSearchForm.patchValue({
        start_date: this.startDate,
        end_date: this.endDate,
      });
      setTimeout(() => {
        this.search(this.settingSearchForm.value);
      }, 400);
    }
  }
  initSearchForm() {
    this.settingSearchForm = this.fb.group({
      start_date: [""],
      end_date: [""],

      modem_type: [""],
      status: [""],
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

    const startDate = new Date(data.start_date);
    const endDate = new Date(data.end_date);

    if (startDate > endDate) {
      this.alertService.error(
        "Date Filter",
        "Start Date should be less than End Date"
      );
      return;
    }

    let start_date = null;
    let end_date = null;
    if (data.start_date) {
      start_date = this.formatDateTime(startDate);
    }
    if (data.start_date) {
      end_date = this.formatDateTime(endDate);
    }
    this.searchParm = {
      page_size: this.itemsPerPage,
      page_number: this.pageNumber,

      modem_type: data.modem_type || null,
      status: data.status || null,
      start_date: start_date,
      end_date: end_date,
    };
    this.isReset = false;
    this.depositSearchData.emit(this.searchParm);
  }
  resetSearch() {
    this.settingSearchForm.reset({
      page_size: "50",
      modem_type: "",
      status: "",
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
