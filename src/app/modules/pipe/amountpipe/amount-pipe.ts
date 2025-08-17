import { DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "appAmountFormat",
})
export class AmountFormatPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}
  transform(value: number): any {
    if (value === null || value === undefined) {
      return "";
    }
    const stringValue = Number(value).toFixed(2);
    const parts = stringValue.split(".");
    let integerPart = parts[0];
    const decimalPart = parts[1];
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `${integerPart}.${decimalPart}`;
  }
}
