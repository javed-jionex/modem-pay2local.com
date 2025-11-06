import { Directive, AfterViewInit, NgZone } from "@angular/core";
import { OwlDateTimeComponent } from "@danielmoncada/angular-datetime-picker";
import * as moment from "moment-timezone";

@Directive({
  selector: "[appBdtStartAt]",
})
export class BdtStartAtDirective implements AfterViewInit {
  constructor(
    private owlDateTime: OwlDateTimeComponent<Date>,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        const bdtMoment = moment.tz("Asia/Dhaka");
        const offsetDiff = bdtMoment.utcOffset() - moment().utcOffset();
        const BdtTime = moment().add(offsetDiff, "minutes").toDate();
        this.owlDateTime.startAt = BdtTime;
        (this.owlDateTime as any)._pickerMoment = BdtTime;
        this.ngZone.run(() => {});
      }, 50);
    });
  }
}
