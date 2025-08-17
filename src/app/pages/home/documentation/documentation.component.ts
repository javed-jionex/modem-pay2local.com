import { Component, ElementRef, HostListener } from "@angular/core";
import { environment } from "@environment/environment";

@Component({
  selector: "app-documentation",
  templateUrl: "./documentation.component.html",
  styleUrls: ["./documentation.component.css"],
})
export class DocumentationComponent {
  appUrl: any = environment.domain;
  apiUrl: any = environment.loginHost;
  activeClass: string = "";
  constructor(private el: ElementRef) {}
  depositsRequestBody: any = {
    request_type: "Deposit",
    redirect_url: "https://abc.com/example",
    merchant_payment_id: "hjvhgvhhgchchgchgc8",
  };
  depositsResponse: any = {
    status: 200,
    msg: "Success",
    currency: "BDT",
    redirect_url: `${this.appUrl}payment/de18331f-29ea-4c6d-9e23-b58bce6db208`,
    request_id: "1d8041f8-1c0c-4eb0-b664-6b3317b13c0b",
    callback_url: `${this.apiUrl}api/v1/secure/payment_requests/status?request_id=1d8041f8-1c0c-4eb0-b664-6b3317b13c0b`,
  };
  @HostListener("window:scroll", [])
  onScroll(): void {
    const offset = this.el.nativeElement.getBoundingClientRect().top;
    if (offset < 0) {
      this.activeClass = "active";
    } else {
      this.activeClass = "";
    }
  }
}
