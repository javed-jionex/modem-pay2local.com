import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import * as moment from 'moment-timezone';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateFilterService {

  apiUrl:string = environment.backendHost;
  private isDateTime:any;
  constructor(private http :HttpClient) {}
  /** OBJ */
  sendDateTime(data: any) {
    this.isDateTime = data;
  }

  getDateTime() {
    return this.isDateTime
  }
  clearDateTime() {
    this.isDateTime = null;
  }

  /** Daily Date Format */
daliyStartDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = this.padZero(now.getMonth() + 1);
    const day = this.padZero(now.getDate());
    const hours = '00';
    const minutes = '00';
    const seconds = '00'; // Set to 00

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }




/**** This function useing for Global timezone */
dailyEndDate(): string {
  let timezone:any = localStorage.getItem('commonTimezone');
  const now = new Date();

  // Extract GMT offset
  const offsetMatch = timezone.match(/GMT([+-]\d{2}):(\d{2})/);
  if (!offsetMatch) {
    throw new Error(`Invalid time zone specified: ${timezone}`);
  }
  const sign = offsetMatch[1][0]; // '+' or '-'
  const hoursOffset = parseInt(offsetMatch[1].slice(1), 10);
  const minutesOffset = parseInt(offsetMatch[2], 10);

  // Calculate the total offset in minutes
  const totalOffsetMinutes = (hoursOffset * 60 + minutesOffset) * (sign === '+' ? 1 : -1);

  // Adjust the current date by the total offset
  const adjustedDate = new Date(now.getTime() + totalOffsetMinutes * 60000);

  // Reformat the output to the desired format: YYYY-MM-DD HH:mm:ss
  const year = adjustedDate.getUTCFullYear();
  const month = String(adjustedDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(adjustedDate.getUTCDate()).padStart(2, '0');
  const hours = String(adjustedDate.getUTCHours()).padStart(2, '0');
  const minutes = String(adjustedDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(adjustedDate.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
  /** Monthly Format */
  monthlyStartDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = this.padZero(now.getMonth() + 1);
    const day = this.padZero(now.getDate());
    const hours = "00";
    const minutes = "00";
    const seconds = "00";

    return `${year}-${month}-1 ${hours}:${minutes}:${seconds}`;
  }

  // monthlyEndDate(): string {
  //   const now = new Date();
  //   const nextMonthDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  //   const year = nextMonthDate.getFullYear();
  //   const month = this.padZero(nextMonthDate.getMonth() + 1);
  //   const day = this.padZero(nextMonthDate.getDate());
  //   const hours = this.padZero(now.getHours());
  //   const minutes = this.padZero(now.getMinutes());
  //   const seconds = this.padZero(now.getSeconds());
  //   // const hours = '23'; // Set to 23 for 11 PM
  //   // const minutes = '59'; // Set to 59
  //   // const seconds = '59'; // Set to 59

  //   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  // }
  monthlyEndDate(): string {
    let timezone:any = localStorage.getItem('commonTimezone');
    const now = moment();

    // Extract GMT offset
    const offsetMatch = timezone.match(/GMT([+-]\d{2}):(\d{2})/);
    if (!offsetMatch) {
        throw new Error(`Invalid time zone specified: ${timezone}`);
    }

    const sign = offsetMatch[1][0]; // '+' or '-'
    const hoursOffset = parseInt(offsetMatch[1].slice(1), 10);
    const minutesOffset = parseInt(offsetMatch[2], 10);

    // Calculate the total offset in minutes
    const totalOffsetMinutes = (hoursOffset * 60 + minutesOffset) * (sign === '+' ? 1 : -1);

    // Adjust the time to the given GMT offset
    const adjustedTime = moment(now).add(totalOffsetMinutes, 'minutes');

    // Set the adjusted date to the last day of the next month
    adjustedTime.add(1, 'month').endOf('month');

    // Format the date as 'YYYY-MM-DD HH:mm:ss'
    return adjustedTime.format('YYYY-MM-DD 23:59:59');
}
  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  parseStringToDate(dateString: string): Date {
    // Split date and time parts
    const [datePart, timePart] = dateString.split(' ');
  
    // Split date into year, month, and day
    const [year, month, day] = datePart.split('-').map(Number);
  
    // Split time into hour, minute, and second
    const [hour, minute, second] = timePart.split(':').map(Number);
  
    // Create Date object
    return new Date(year, month - 1, day, hour, minute, second);
    }
}


