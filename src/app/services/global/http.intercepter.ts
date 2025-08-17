import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, finalize, Observable, throwError } from "rxjs";
import { environment } from "@environment/environment";
import { ErrorHandlerService } from "@services/error-handler/error-handler.service";
import { Router } from "@angular/router";
import { AlertService } from "@services/alert/alert.service";
import { Location } from "@angular/common";
import { LocalStorageMerchantService } from "@services/modem/localstorage/local.service";
@Injectable()
export class HttpCallsInterceptor implements HttpInterceptor {
  currentUrl: any;
  count: number = 0;
  constructor(
    private errHandlerService: ErrorHandlerService,
    private router: Router,
    private alertService: AlertService,
    private location: Location,
    private localStorageMerchantService: LocalStorageMerchantService
  ) {
    this.currentUrl = this.location.path();
    this.currentUrl = this.currentUrl.split("/");
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let userProfile: any;

    userProfile = this.localStorageMerchantService.getUserProfile();

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
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          //console.error('An error occurred:', error?.error);
        } else if (error.status === 401) {
          let moduleType = localStorage.getItem("moduleType");
          // if(this.count == 0){
          // 	this.alertService.error('Error', error?.error?.error);
          // }

          this.count = this.count + 1;
          //localStorage.clear();

          this.localStorageMerchantService.removePindCode();
          this.localStorageMerchantService.removeUerProfile();
          this.router.navigate(["admin/login"]);
        } else if (error.status !== 429) {
          // Log errors other than 429
          //console.error('HTTP Error:', error);
        } else {
          console.error(
            `Backend returned code ${error.status}, body was: `,
            error.error
          );
        }
        //this.errHandlerService.showErrorr(error.message);
        return throwError(
          () => new Error("Something bad happened; please try again later.")
        );
      }),
      finalize(() => {
        //this.loaderService.closeDialog();
      })
    ) as Observable<HttpEvent<any>>;
  }
}
