import { NgModule } from '@angular/core';
import { IndianNumberFormatPipe } from './number-pipe';
import { DecimalPipe } from '@angular/common';
import { RemovePlusMinusPipe } from './removeMinusPlus-pipe';
import { TimezoneDatePipe } from '../datetimezone/date-timezone.pipe';



@NgModule({
  declarations: [IndianNumberFormatPipe,RemovePlusMinusPipe,TimezoneDatePipe],
  exports: [IndianNumberFormatPipe,RemovePlusMinusPipe,TimezoneDatePipe],
  providers: [DecimalPipe]
})
export class NumberPipeModule {}