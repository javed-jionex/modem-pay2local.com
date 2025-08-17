import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]',
  standalone: true
})
export class NumberOnlyDirective {
  private regex: RegExp = new RegExp(/^\d+$/);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete', 'Ctrl', 'Meta', 'Enter'];

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }

    if (current.charAt(0) === '0' && current.length >= 11) {
      event.preventDefault();
    } else if (current.charAt(0) !== '0' && current.length >= 10) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    let input = this.el.nativeElement as HTMLInputElement;
    let initialDigit = input.value.charAt(0);

    input.value = input.value.replace(/\D/g, '');

    if (initialDigit === '0') {
      if (input.value.length > 11) {
        input.value = input.value.slice(0, 11);
      }
    } else {
      if (input.value.length > 10) {
        input.value = input.value.slice(0, 10);
      }
    }
  }

  @HostListener('paste', ['$event'])
  handlePaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData || (window as any).clipboardData;
    let pastedText = clipboardData.getData('text');
    let input = this.el.nativeElement as HTMLInputElement;
    let currentValue = input.value;
    let newValue = currentValue.concat(pastedText.replace(/\D/g, ''));

    if (!String(newValue).match(this.regex)) {
      event.preventDefault();
    }

    if (newValue.charAt(0) === '0' && newValue.length > 11) {
      event.preventDefault();
    } else if (newValue.charAt(0) !== '0' && newValue.length > 10) {
      event.preventDefault();
    }
  }
}
