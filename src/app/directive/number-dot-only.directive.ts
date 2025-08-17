import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNumberDotOnly]',
  standalone: true
})
export class NumberDotOnlyDirective {
  private regex: RegExp = new RegExp(/^(100(\.0{0,2})?|(\d{0,2}(\.\d{0,2})?))$/) // Allows numbers and a single dot
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete', 'Ctrl', 'Meta', 'Enter'];

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);

    // Check if the next value is a valid number and falls within the range 0.1 to 100
    if (next && (!this.regex.test(next) || parseFloat(next) > 100 || parseFloat(next) < 0)) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    let input = this.el.nativeElement as HTMLInputElement;

    // Allow only numbers and a single dot
    const match = input.value.match(/^(100(\.0{0,2})?|(\d{0,2}(\.\d{0,2})?))$/);
    ;
    input.value = match ? match[0] : '';
    console.log(match)
    const inputValue = parseFloat(input.value);

    // Check if the current value is less than 0.1 or greater than 100
    if (input.value && (inputValue > 100 || inputValue < 0)) {
      input.value = inputValue > 100 ? '100' : '0';
    }
  }

  @HostListener('paste', ['$event'])
  handlePaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData || (window as any).clipboardData;
    let pastedText = clipboardData.getData('text');

    if (!this.regex.test(pastedText)) {
      event.preventDefault();
    }

    let input = this.el.nativeElement as HTMLInputElement;
    let newValue = input.value.concat(pastedText.replace(/[^\d.]/g, ''));

    const parsedValue = parseFloat(newValue);
    const dotCount = newValue.split('.').length - 1;

    // Ensure only one dot is present and the value is within 0.1 to 100
    if (dotCount > 1 || parsedValue > 100 || parsedValue < 0 || !this.regex.test(newValue)) {
      event.preventDefault();
    }
  }
}
