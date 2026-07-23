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
    if (window.location.hostname === "localhost") return;
    if (!environment.posthogKey) return;

    this.ngZone.runOutsideAngular(() => {
      posthog.init(environment?.posthogKey, {
        api_host: environment?.posthogHost,
        capture_pageview: false, // manual tracking
        disable_session_recording: true,
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
        const url = event.urlAfterRedirects;
        posthog.capture("$pageview", {
          path: event.urlAfterRedirects,
        });
        const allowedPages = ["/admin/withdrawals"];

        if (allowedPages.some((p) => url.includes(p))) {
          this.startRecording();
        } else {
          this.stopRecording();
        }
      });
  }
  // ✅ Start session replay
  startRecording() {
    posthog.startSessionRecording();
  }

  // ✅ Stop session replay
  stopRecording() {
    posthog.stopSessionRecording();
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

  // Custom event
  capture(event: string, data?: any) {
    posthog.capture(event, data);
  }
}
