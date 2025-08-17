import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appNumberFormat'
})
export class IndianNumberFormatPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) { }
  transform(value: number): any {
    if (value === null || value === undefined) {
      return '';
    }
    // const formattedValue = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    // return formattedValue

    // const stringValue = value.toString();
    // const parts = stringValue.split('.');
    // parts[0] = parts[0].replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    // if(parts[1]){
    //   parts[1] = parts[1].substring(0, 2)
    // }
    // return parts.join('.')

    const formattedNumber: any = this.decimalPipe.transform(value, '1.0-0');
    const parts = formattedNumber.split(','); // Split the formatted number by commas
    const firstGroup = parts.shift(); // Remove the first part (which is the integer part)
    const integerPart = firstGroup.replace(/\B(?=(\d{2})+(?!\d))/g, ','); // Add comma for every two digits
    let formattedNumberWithDecimal;
    if (parts.length > 0) {
      formattedNumberWithDecimal = integerPart + ',' + parts.join(',') + '.00'; // Join the parts back together
    } else {
      formattedNumberWithDecimal = formattedNumber + '.00'; // Join the parts back together
    }

    // console.log(formattedNumberWithDecimal); // Outputs 3,17,879.00
    return formattedNumberWithDecimal
  }
}