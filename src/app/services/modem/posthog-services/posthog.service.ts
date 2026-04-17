import { DestroyRef, Injectable, NgZone } from "@angular/core";
import posthog from "posthog-js";

import { NavigationEnd, Router } from "@angular/router";
import { environment } from "@environment/environment";
import { filter } from "rxjs";
@Injectable({ providedIn: "root" })
export class PosthogService {
  constructor(
    private ngZone: NgZone,
    private router: Router,
    private destroyRef: DestroyRef,
  ) {
    this.init();
  }

  init() {
    if (!environment.posthogKey) return;

    this.ngZone.runOutsideAngular(() => {
      posthog.init(environment.posthogKey, {
        api_host: environment.posthogHost,
        capture_pageview: false, // manual tracking

        session_recording: {
          maskAllInputs: true,
          network_payload_capture: true,
        } as any, // allow extra props if needed
      });
    });

    this.trackPageViews();
    this.captureConsoleLogs();
  }

  // Page tracking
  trackPageViews() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        posthog.capture("$pageview", {
          path: event.urlAfterRedirects,
        });
      });
  }

  //  Console logs tracking
  captureConsoleLogs() {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args: any[]) => {
      posthog.capture("console_log", { message: args });
      originalLog.apply(console, args);
    };

    console.error = (...args: any[]) => {
      posthog.capture("console_error", { message: args });
      originalError.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      posthog.capture("console_warn", { message: args });
      originalWarn.apply(console, args);
    };
  }

  //  Network tracking (Angular interceptor ke through use hoga)
  trackApiCall(req: any, res: any) {
    posthog.capture("api_call", {
      url: req.url,
      method: req.method,
      status: res.status,
    });
  }

  // Custom event
  capture(event: string, data?: any) {
    posthog.capture(event, data);
  }

  // Identify user
  identify(user: any) {
    posthog.identify(user.id, {
      email: user.email,
      name: user.name,
    });
  }
}
