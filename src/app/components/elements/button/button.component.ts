import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/pipes/sharedModule";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.css",
})
export class ButtonComponent {
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() buttonClass: string = "";
  @Output() clicked: EventEmitter<any> = new EventEmitter();
  onClick() {
    this.clicked.emit();
  }
  constructor() {}
}
