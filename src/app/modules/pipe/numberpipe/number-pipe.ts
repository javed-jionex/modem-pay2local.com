import { DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "appNumberFormat",
})
export class IndianNumberFormatPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}
  transform(value: any): any {
    // if (value === null || value === undefined) {
    //   return '';
    // }
    // const formattedValue = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    // return formattedValue

    // const stringValue = value.toString();
    // const parts = stringValue.split('.');
    // parts[0] = parts[0].replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    // if(parts[1]){
    //   parts[1] = parts[1].substring(0, 2)
    // }
    // return parts.join('.')

    if (value === null || value === undefined || value === "") return "N/A";
    if (value === "-") return value;

    // Convert to string and clean up spaces
    let strValue = value.toString().trim();

    // Allow negative numbers with space like "- 1000"
    strValue = strValue.replace(/\s+/g, ""); // remove all spaces
    // Convert to number
    const num = Number(strValue);
    if (isNaN(num)) return value;

    // Keep the sign for negative numbers
    const formatted = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(Math.abs(num));

    return num < 0 ? `-${formatted}` : formatted;
  }
}
