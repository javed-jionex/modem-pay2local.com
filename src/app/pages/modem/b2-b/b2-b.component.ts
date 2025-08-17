import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2BService } from "@services/modem/b2b/b2b.service";

@Component({
  selector: "app-b2-b",
  templateUrl: "./b2-b.component.html",
  styleUrl: "./b2-b.component.css",
})
export class B2BComponent {
  displayedData: any;
  isDisplayed: boolean = true;
  closeResult: string = "";

  showingData: any;
  constructor(private b2bService: B2BService) {}
  ngOnInit() {
    this.paymentsRequestList();
  }

  paymentsRequestList() {
    this.isDisplayed = true;
    this.b2bService.B2BData().subscribe((res: any) => {
      this.displayedData = res?.response?.data;
      this.isDisplayed = false;
    });
    setTimeout(() => {
      this.isDisplayed = false;
    }, 2000);
  }

  formatLabel(value: string): string {
    if (!value) return "";

    // Replace underscores with spaces
    const spaced = value.replace(/_/g, " ");

    // Capitalize each word
    return spaced
      .split(" ")
      .map((word) => {
        // If word is lowercase with digits (like "p2p"), convert to uppercase
        if (/^[a-z0-9]+$/.test(word)) {
          return word.toUpperCase();
        }

        // Capitalize first letter only
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }
}
