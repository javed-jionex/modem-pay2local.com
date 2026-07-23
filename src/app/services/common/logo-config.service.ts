import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { CommonService } from "./common.service";

@Injectable({ providedIn: "root" })
export class LogoConfigService {
  private logoStatus$ = new BehaviorSubject<boolean>(false);
  private intervalId: any;
  constructor(
    private http: HttpClient,
    private commonService: CommonService,
  ) {}

  loadConfig(): Promise<void> {
    return new Promise((resolve) => {
      this.commonService.getLogoStatus().subscribe({
        next: (res: any) => {
          this.logoStatus$.next(res?.data?.project_logo_enabled);
          this.startPolling();
          resolve();
        },
        error: () => {
          this.logoStatus$.next(true);
          resolve();
        },
      });
    });
  }
  startPolling() {
    this.intervalId = setInterval(() => {
      this.commonService.getLogoStatus().subscribe((res: any) => {
        this.logoStatus$.next(res?.data?.project_logo_enabled);
      });
    }, 30000); // every 30 sec
  }
  getLogoStatus() {
    return this.logoStatus$.asObservable();
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
