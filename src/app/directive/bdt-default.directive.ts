import { Directive, AfterViewInit } from "@angular/core";
import { OwlDateTimeComponent } from "@danielmoncada/angular-datetime-picker";

@Directive({
  selector: "[appBdtStartAt]",
})
export class BdtStartAtDirective implements AfterViewInit {
  constructor(private owlDateTime: OwlDateTimeComponent<Date>) {}

  ngAfterViewInit(): void {
    // wait for component to be ready
    setTimeout(() => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const bdt = new Date(utc + 6 * 60 * 60 * 1000);
      this.owlDateTime.startAt = bdt;
    });
  }
}
