import { Pipe, PipeTransform } from "@angular/core";
import { LocalizationService } from "@services/global/localization.service";

@Pipe({
  name: "translate",
})
export class TranslationPipe implements PipeTransform {
  constructor(private translationService: LocalizationService) {}

  transform(key: string): string {
    return this.translationService.translate(key);
  }
}
