import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DateFilterService {
  apiUrl: string = environment.loginHost;
  private isDateTime: any;
  constructor(private http: HttpClient) {}
  /** OBJ */
  sendDateTime(data: any) {
    this.isDateTime = data;
  }

  getDateTime() {
    return this.isDateTime;
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
    const hours = "00";
    const minutes = "00";
    const seconds = "00"; // Set to 00

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  /***** This function using for default time */
  // dailyEndDate(): string {
  //   const now = new Date();
  //   const year = now.getFullYear();
  //   const month = this.padZero(now.getMonth() + 1);
  //   const day = this.padZero(now.getDate());
  //   const hours = this.padZero(now.getHours());
  //   const minutes = this.padZero(now.getMinutes());
  //   const seconds = this.padZero(now.getSeconds());

  //   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  // }

  /**** This function useing for Bangladesh timezone */
  dailyEndDate(): string {
    const now = new Date();
    const options: any = {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    // Convert to BST (GMT+06:00) and format the date
    const bdtNow = new Intl.DateTimeFormat("en-GB", options).format(now);
    // Reformat the output to the desired format: YYYY-MM-DD HH:mm:ss
    const [date, time] = bdtNow.split(", ");
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day} ${time}`;
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
  /**** Monthly End Date using default date */
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
  /**** Monthly End Date for Bangladesh */
  monthlyEndDate(): string {
    const now = new Date();
    const nextMonthDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    nextMonthDate.setDate(0); // Set to the last day of the current month

    const options: any = {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    // Convert to BST (GMT+06:00) and format the date
    const bdtEndOfMonth = new Intl.DateTimeFormat("en-GB", options).format(
      nextMonthDate
    );

    // Reformat the output to the desired format: YYYY-MM-DD HH:mm:ss
    const [date, time] = bdtEndOfMonth.split(", ");
    const [day, month, year] = date.split("/");

    return `${year}-${month}-${day} 23:59:59`; // Set time to 23:59:59
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  parseStringToDate(dateString: string): Date {
    // Split date and time parts
    const [datePart, timePart] = dateString.split(" ");

    // Split date into year, month, and day
    const [year, month, day] = datePart.split("-").map(Number);

    // Split time into hour, minute, and second
    const [hour, minute, second] = timePart.split(":").map(Number);

    // Create Date object
    return new Date(year, month - 1, day, hour, minute, second);
  }
}
