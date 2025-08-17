import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'removePlusMinus'})
export class RemovePlusMinusPipe implements PipeTransform {
    transform(value: any): string {
        if (typeof value !== 'string') {
          value = String(value);
        }
        return value.replace(/[+-]/g, '');
      }
}