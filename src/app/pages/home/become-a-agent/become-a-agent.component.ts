import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-become-a-agent',
  templateUrl: './become-a-agent.component.html',
  styleUrl: './become-a-agent.component.css'
})
export class BecomeAAgentComponent {

  activeClass: string = ""
    constructor(private el: ElementRef) { }
    @HostListener('window:scroll', [])
    onScroll(): void {
        const offset = this.el.nativeElement.getBoundingClientRect().top;
        if (offset < 0) {
            this.activeClass = "active"
        } else {
            this.activeClass = ""
        }
    }

}

document?.addEventListener("DOMContentLoaded", () => {
  // Get the dark mode toggle button and body element
  const darkModeToggleBtn: HTMLButtonElement = document.getElementById("darkModeToggleBtn") as HTMLButtonElement;
  const body: HTMLElement = document.body;

  // Check if dark mode is enabled in local storage
  if (localStorage.getItem("darkMode") === "enabled") {
      body.classList.add("dark-mode");
  }

  // Toggle dark mode class and update local storage on button click
  darkModeToggleBtn?.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      // Check if dark mode is enabled and update local storage
      if (body.classList.contains("dark-mode")) {
          localStorage.setItem("darkMode", "enabled");
      } else {
          localStorage.setItem("darkMode", "disabled");
      }
  });
});
