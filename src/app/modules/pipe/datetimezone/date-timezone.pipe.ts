import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "timezoneDate",
})
export class TimezoneDatePipe implements PipeTransform {
  timezone: any = null;
  constructor() {}
  transform(
    value: any,
    format: string = "yyyy-MM-dd HH:mm:ss",
    timezone: string = "GMT+06:00"
  ): string | null {
    if (!value) return null;
    this.getTimezone();
    if (this.timezone == null) {
      this.timezone = timezone;
    }
    const datePipe = new DatePipe("en-US");
    return datePipe.transform(value, format, this.timezone);
  }

  getTimezone() {
    let timeZone = localStorage.getItem("commonTimezone");
    this.timezone = timeZone;
  }
}
