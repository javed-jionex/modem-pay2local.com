import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDuration'
})
export class DateDurationPipe implements PipeTransform {
    transform(inputDate: string): string {
        const inputDateTime = new Date(inputDate);
        const currentDate = new Date();
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
        }
        if (secondsDifference > 0) {
          result += `${secondsDifference}s`;
        }
        return result.trim();
      }
}
