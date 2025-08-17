import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "@services/config/config.service";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";

interface ApiResponse<T> {
  response: T | null;
  loading: boolean;
  error: any | null;
}

@Injectable({
  providedIn: "root",
})
export class ApiService {
  // private apiUrl: string = environment.loginHost;

  constructor(private http: HttpClient, private configService: ConfigService) {}
  public request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint: string,
    data: any = {},
    headers: HttpHeaders = new HttpHeaders()
  ): Observable<ApiResponse<T>> {
    const url = `${this.configService.getBackendHost()}${endpoint}`;

    // Subjects to keep track of loading, error, and data
    const response$ = new BehaviorSubject<ApiResponse<T>>({
      response: null,
      loading: true,
      error: null,
    });

    let apiCall: Observable<T>;

    switch (method) {
      case "GET":
        apiCall = this.http.get<T>(url, { headers, params: data });
        break;
      case "POST":
        apiCall = this.http.post<T>(url, data, { headers });
        break;
      case "PUT":
        apiCall = this.http.put<T>(url, data, { headers });
        break;
      case "DELETE":
        apiCall = this.http.delete<T>(url, { headers, body: data });
        break;
      default:
        return throwError(
          () => new Error(`Unsupported request method: ${method}`)
        );
    }

    // Handle the request, updating the BehaviorSubject along the way
    apiCall
      .pipe(
        tap((res: any) => {
          if (res?.status === 200 || res?.status === 201) {
            response$.next({ response: res, loading: false, error: null });
          } else {
            response$.next({
              response: null,
              loading: false,
              error: {
                message:
                  res?.message ?? res?.data?.message ?? "Something went wrong",
                status: res?.status,
              },
            });
          }
        }),
        catchError((error: HttpErrorResponse) => {
          response$.next({
            response: null,
            loading: false,
            error: {
              message: error ?? "Something went wrong",
            },
          });
          return of(response$.value);
        }),
        finalize(() => {})
      )
      .subscribe();

    return response$.asObservable();
  }
}
