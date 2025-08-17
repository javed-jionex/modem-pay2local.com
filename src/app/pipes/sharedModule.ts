import { NgModule } from "@angular/core";
import { DateDurationPipe } from "./date-duration.pipe";
import { DateDurationTwoDatePipe } from "./date-duration-two-date.pipe";
import { TranslationPipe } from "./translation.pipe";

@NgModule({
  declarations: [
    DateDurationPipe,
    DateDurationTwoDatePipe,
    TranslationPipe,
    // other declarations...
  ],
  exports: [
    DateDurationPipe,
    DateDurationTwoDatePipe,
    TranslationPipe,
    // other exports...
  ],
})
export class SharedModule {}
