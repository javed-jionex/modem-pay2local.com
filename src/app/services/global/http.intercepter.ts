import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, finalize, Observable, tap, throwError } from "rxjs";
import { environment } from "@environment/environment";
import { ErrorHandlerService } from "@services/error-handler/error-handler.service";
import { Router } from "@angular/router";
import { AlertService } from "@services/alert/alert.service";
import { Location } from "@angular/common";
import { LocalStorageMerchantService } from "@services/modem/localstorage/local.service";
import { PosthogService } from "@services/modem/posthog-services/posthog.service";
@Injectable()
export class HttpCallsInterceptor implements HttpInterceptor {
  currentUrl: any;
  count: number = 0;
  constructor(
    private errHandlerService: ErrorHandlerService,
    private router: Router,
    private alertService: AlertService,
    private location: Location,
    private localStorageMerchantService: LocalStorageMerchantService,
    private posthogService: PosthogService,
  ) {
    this.currentUrl = this.location.path();
    this.currentUrl = this.currentUrl.split("/");
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let userProfile: any;

    userProfile = this.localStorageMerchantService.getUserProfile();
    let modemData: any = this.localStorageMerchantService.getModemProfile();
    let token = userProfile?.token;
    if (token) {
      request = request.clone({
        headers: request.headers
          .set("Authorization", `Bearer ${token}`)
          // .set('Content-Type', 'application/json')
          .set("Accept", "*/*"),
      });
    } else {
      // request = request.clone({
      // 	headers: request.headers
      // 		.set('Content-Type', 'application/json')
      // 		.set('','application/json;indent=2')
      // });
      // let login:any = localStorage.getItem('loginStatus');
      // login = JSON.parse(login);
      //  if(!login){
      // 	this.router.navigate(['/login']);
      //  }
    }
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          // ✅ SUCCESS API TRACK
          this.posthogService.capture("api_success", {
            url: request.url,
            method: request.method,
            status: event.status,
            first_name: modemData?.first_name,
            last_name: modemData?.last_name,
            phone_number: modemData?.phone_number || userProfile?.phone_number,
            pincode: modemData?.pincode,
            limit: modemData?.limit,
            type_of_modem: modemData?.type_of_modem || userProfile?.modem_type,
            payment_accept: modemData?.payment_accept,
            is_login: modemData?.is_login,
            cashin_progress: modemData?.cashin_progress,

            // 👇 flatten transactions
            today_deposit: modemData?.transactions.today_deposit,
            monthly_deposit: modemData?.transactions.monthly_deposit,
            today_withdraw: modemData?.transactions.today_withdraw,
            monthly_withdraw: modemData?.transactions.monthly_withdraw,
          });
        }
      }),

      catchError((error: HttpErrorResponse) => {
        // ✅ ERROR API TRACK
        this.posthogService.capture("api_error", {
          url: request.url,
          method: request.method,
          status: error.status,
          message: error.message,
          first_name: modemData?.first_name,
          last_name: modemData?.last_name,
          phone_number: modemData?.phone_number || userProfile?.phone_number,
          pincode: modemData?.pincode,
          limit: modemData?.limit,
          type_of_modem: modemData?.type_of_modem || userProfile?.modem_type,
          payment_accept: modemData?.payment_accept,
          is_login: modemData?.is_login,
          cashin_progress: modemData?.cashin_progress,

          // 👇 flatten transactions
          today_deposit: modemData?.transactions.today_deposit,
          monthly_deposit: modemData?.transactions.monthly_deposit,
          today_withdraw: modemData?.transactions.today_withdraw,
          monthly_withdraw: modemData?.transactions.monthly_withdraw,
        });

        if (error.status === 0) {
          console.error("An error occurred:", error?.error);
        } else if (error.status === 401) {
          let moduleType = localStorage.getItem("moduleType");

          this.count = this.count + 1;

          this.localStorageMerchantService.removePindCode();
          this.localStorageMerchantService.removeUerProfile();
          this.router.navigate(["admin/login"]);
        } else if (error.status !== 429) {
          console.error("HTTP Error:", error);
        } else {
          console.error(
            `Backend returned code ${error.status}, body was: `,
            error.error,
          );
        }

        return throwError(
          () => new Error("Something bad happened; please try again later."),
        );
      }),

      finalize(() => {
        // optional loader बंद
      }),
    ) as Observable<HttpEvent<any>>;
  }
}
