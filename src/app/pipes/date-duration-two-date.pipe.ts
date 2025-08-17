import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDurationTwo'
})
export class DateDurationTwoDatePipe implements PipeTransform {
    transform(inputDate: string,approvalDate:string): string {
        let inputDateTime:any ;
        let currentDate:any;
         inputDateTime = this.parseDate(inputDate);
         currentDate = approvalDate ? this.parseDate(approvalDate) : new Date();
    
       
        // if(approvalDate){
        //     inputDateTime = new Date(inputDate);
        //     currentDate = new Date(approvalDate);
        // }else{
        //     inputDateTime = new Date(inputDate);
        //     currentDate = new Date();
        // }
        // console.log(inputDateTime,currentDate)
        
        const timeDifference = currentDate.getTime() - inputDateTime.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const secondsDifference = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        let result = '';
        if (daysDifference > 0) {
          result += `${daysDifference}d `;
        }
        if (hoursDifference > 0) {
          result += `${hoursDifference}h `;
        }
        if (minutesDifference > 0) {
          result += `${minutesDifference}m `;
        }else{
          result = "INSTANT"
        }
        if (secondsDifference > 0 && minutesDifference > 0) {
          result += `${secondsDifference}s`;
        }
        return result.trim();
      }
      private parseDate(dateString: string): Date {
        // Split the date and time parts using the 'T' character
        const [datePart, timePart] = dateString.split('T');
        // Split the date part into year, month, and day
        const [year, month, day] = datePart.split('-').map(Number);
        // Split the time part into hours, minutes, and seconds
        const [hours, minutes, seconds] = timePart.replace('Z', '').split(':').map(Number);
    
        return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
    }
}
