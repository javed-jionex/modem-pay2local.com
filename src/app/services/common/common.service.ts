import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";
import { ConfigService } from "@services/config/config.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  apiUrl: string = "";
  objectRefresh = new Subject<any>();
  currentBalanceRefresh = new Subject<any>();
  pendingCountRefresh = new Subject<any>();
  isChangeThemeMode = new Subject<any>();
  // isAutoRefreshOBJ = new Subject<any>;
  constructor(private http: HttpClient, private configService: ConfigService) {}
  ngOnInit() {
    this.apiUrl = this.configService.getBackendHost();
  }
  getAllBanks(data: any) {
    return this.http.post(
      this.configService.getBackendHost() +
        `api/v1/mobile_bankings/custom_filter`,
      data
    );
  }
  /** BL Count Api Reftesh */
  countObjectRefresh(refresh: boolean) {
    this.objectRefresh.next({ refresh: refresh });
  }
  /** BL Count Api Reftesh */
  getcountObjectRefresh() {
    return this.objectRefresh.asObservable();
  }
  /** BL auto Refresh */
  isBLAutoRefresh(refresh: any) {
    this.objectRefresh.next({
      refresh: refresh.refresh,
      pageNumber: refresh.pageNumber,
    });
  }

  getIsBLAutoRefresh() {
    return this.objectRefresh.asObservable();
  }
  /** Current Balance Refresh */
  currentBalance(refresh: boolean) {
    this.currentBalanceRefresh.next({ refresh: refresh });
  }
  getCurrentBalance() {
    return this.currentBalanceRefresh.asObservable();
  }
  /** Pending Request Count Refresh */
  pedingCountRF(refresh: boolean) {
    this.pendingCountRefresh.next({ refresh: refresh });
  }
  getPedingCountRF() {
    return this.pendingCountRefresh.asObservable();
  }
  getPartnerDashboard() {
    return this.http.get(
      this.configService.getBackendHost() + `api/v1/partners/dashboard`
    );
  }
  getAgentsDashboard() {
    return this.http.get(
      this.configService.getBackendHost() + `api/v1/agent_webs/dashboard`
    );
  }
  getdistributorsDashboard() {
    return this.http.get(
      this.configService.getBackendHost() + `api/v1/distributors/dashboard`
    );
  }
  getDashboardData() {
    return this.http.get(
      this.configService.getBackendHost() + `api/v1/users/dashboard_data`
    );
  }

  getAllCompanies() {
    return this.http.get(
      this.configService.getBackendHost() + `api/v1/companies`
    );
  }

  getDistributors(company_id: string) {
    return this.http.get(
      this.configService.getBackendHost() +
        `api/v1/distributors?company_id=${company_id}`
    );
  }
  currentBalanceData() {
    return this.http.get(
      this.configService.getBackendHost() + `api/v1/users/current_balance`
    );
  }
  getPermissions() {
    return this.http.get(
      this.configService.getBackendHost() + `api/v1/users/current_permissions`
    );
  }

  paymentAllBanks(id: string) {
    return this.http.get(
      this.configService.getBackendHost() +
        `api/v1/users/check_payment?id=${id}`
    );
  }
  checkPaymentForMerchant(id: string) {
    return this.http.get(
      this.configService.getBackendHost() +
        `api/v1/users/check_merchant_payment?id=${id}`
    );
  }
  agentModem(payload: any) {
    return this.http.post(
      this.configService.getBackendHost() + `api/v1/users/agent_modem`,
      payload
    );
  }
  bankLimit(ID: any) {
    return this.http.get(
      this.configService.getBackendHost() +
        `api/v1/secure/payment_requests/get_bank_limit?id=${ID}`
    );
  }
  customerPaymentRequest(data: any) {
    return this.http.post(
      this.configService.getBackendHost() +
        `api/v1/secure/payment_requests/customer_request`,
      data
    );
  }
  merchantPaymentRequest(data: any) {
    return this.http.post(
      this.configService.getBackendHost() +
        `api/v1/secure/merchant_payments/customer_request`,
      data
    );
  }
  customerWithdrawRequest(data: any) {
    return this.http.post(
      this.configService.getBackendHost() +
        `api/v1/secure/payment_requests/customer_withdraw_request`,
      data
    );
  }
  relieseModem(phone_number: string) {
    return this.http.put(
      this.configService.getBackendHost() +
        `api/v1/secure/payment_requests/reliese_modem`,
      { phone_number: phone_number }
    );
  }

  resetData() {
    return this.http.put(
      this.configService.getBackendHost() + `api/v1/users/reset_payment_data`,
      {}
    );
  }
  getModemAndMerchant() {
    return this.http.get(
      this.configService.getBackendHost() +
        `api/v1/payment_transactions/payments_filter_data`
    );
  }
  // getMerchantCurrentPermission() {
  //   return this.http.get(
  //     this.configService.getBackendHost() +
  //       `api/v1/merchant/dashboard/current_permission`
  //   );
  // }
  /******PR Counts */
  prAdminCount() {
    return this.http.get(
      this.configService.getBackendHost() +
        `api/v1/payment_requests/admin_pending_counts`
    );
  }
  prPartnerCount() {
    return this.http.get(
      this.configService.getBackendHost() +
        `api/v1/payment_requests/partner_pending_counts`
    );
  }
  prAgentCount() {
    return this.http.get(
      this.configService.getBackendHost() +
        `api/v1/payment_requests/agent_pending_counts`
    );
  }
  prDistributorCount() {
    return this.http.get(
      this.configService.getBackendHost() +
        `api/v1/payment_requests/distributor_pending_counts`
    );
  }
  agent() {
    return this.http.get(
      this.configService.getBackendHost() + `api/v1/users/get_agents`
    );
  }
  /** Theme Mode change */
  setThemeMode(item: any) {
    this.isChangeThemeMode.next(item);
  }
  getThemeMode() {
    return this.isChangeThemeMode.asObservable();
  }
  getEmployeesDashboard() {
    return this.http.get(
      this.configService.getBackendHost() +
        `api/v1/employees/dashboard_details
      `
    );
  }
  prEmployeeCount() {
    return this.http.get(
      this.configService.getBackendHost() +
        `api/v1/employees/team_pending_counts
      `
    );
  }
  /**** New Apis standard Deposits */
  getBankWithModem(ID: any, reqId: any) {
    return this.http.get(
      this.configService.getBackendHost() +
        `api/v1/payment/deposits/bank_list?m_type=${ID}&request_id=${reqId}`
    );
  }
  assignModem(payload: any) {
    return this.http.put(
      this.configService.getBackendHost() +
        `api/v1/payment/deposits/select_bank`,
      payload
    );
  }
  confirmPayment(data: any) {
    return this.http.put(
      this.configService.getBackendHost() +
        `api/v1/payment/deposits/submit_payment_details`,
      data
    );
  }
  /**** New Apis Fast Deposits */
  getFastBankWithModem(ID: any) {
    return this.http.get(
      this.configService.getBackendHost() +
        `api/v1/payment/fast_deposits/bank_list?m_type=${ID}`
    );
  }
  assignFastModem(payload: any) {
    return this.http.put(
      this.configService.getBackendHost() +
        `api/v1/payment/fast_deposits/select_bank`,
      payload
    );
  }
  confirmFastPayment(data: any) {
    return this.http.put(
      this.configService.getBackendHost() +
        `api/v1/payment/fast_deposits/submit_payment_details`,
      data
    );
  }
  getJionexStatus() {
    return this.http.get(`${this.apiUrl}/api/v1/settings/logo_setting`);
  }
}
