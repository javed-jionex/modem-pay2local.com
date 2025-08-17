import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import "slick-carousel/slick/slick";

declare var $: any;

declare const require: any;
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements AfterViewInit {
  activeClass: string = "";
  activeId: string | null = null;

  isClassAdded: boolean = false;

  @ViewChild("counterSection", { static: true }) counterSection!: ElementRef;

  agentsStart: number = 0;
  merchantsStart: number = 0;
  transactionsStart: number = 0;
  successRateStart: number = 0;

  agentsTarget: number = 100;
  merchantsTarget: number = 35;
  transactionsTarget: number = 2000000;
  successRateTarget: number = 98.95;

  agentsDigits: (string | number)[] = [];
  merchantsDigits: (string | number)[] = [];
  transactionsDigits: (string | number)[] = [];
  successRateDigits: (string | number)[] = [];

  observer: IntersectionObserver | undefined;

  constructor(private el: ElementRef, private router: Router) {}
  @HostListener("window:scroll", [])
  onScroll(): void {
    const offset = this.el.nativeElement.getBoundingClientRect().top;
    if (offset < 0) {
      this.activeClass = "active";
    } else {
      this.activeClass = "";
    }
  }

  showMenu() {
    this.isClassAdded = !this.isClassAdded;
  }

  ngOnInit(): void {
    // Import AOS using require
    const AOS = require("aos");
    AOS.init({
      duration: 1200, // Duration of the animation
      once: true, // Animation should happen only once
    });

    this.createObserver();
    //window.location.href = "https://pay2local.com";
    this.router.navigate(["/admin/login"]);
  }

  createObserver() {
    const options = {
      root: null, // Use the viewport as the root
      threshold: 0.5, // Trigger when 50% of the section is visible
    };

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start the odometer counter once the section is visible
          this.startOdometerCounter(
            "agents",
            this.agentsStart,
            this.agentsTarget
          );
          this.startOdometerCounter(
            "merchants",
            this.merchantsStart,
            this.merchantsTarget
          );
          this.startOdometerCounter(
            "transactions",
            this.transactionsStart,
            this.transactionsTarget
          );
          this.startOdometerCounter(
            "successRate",
            this.successRateStart,
            this.successRateTarget
          );
          observer.unobserve(entry.target); // Stop observing after animation starts
        }
      });
    }, options);

    if (this.counterSection) {
      this.observer.observe(this.counterSection.nativeElement);
    }
  }

  startOdometerCounter(counterType: string, start: number, target: number) {
    const step = Math.ceil(target / 100); // Number of steps in animation
    const interval = setInterval(() => {
      if (start < target) {
        start += step;
        if (start > target) {
          start = target;
        }
        this.updateDigits(counterType, start);
      } else {
        clearInterval(interval); // Stop when target is reached
      }
    }, 30); // Adjust the speed of the animation here
  }

  updateDigits(counterType: string, value: number) {
    switch (counterType) {
      case "agents":
        this.agentsDigits = this.formatNumber(value).split("");
        break;
      case "merchants":
        this.merchantsDigits = this.formatNumber(value).split("");
        break;
      case "transactions":
        this.transactionsDigits = this.formatNumber(value).split("");
        break;
      case "successRate":
        this.successRateDigits = this.formatNumber(value).split("");
        break;
    }
  }

  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"; // for values in millions
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"; // for values in thousands
    }
    return num.toFixed(2); // For percentage (or other smaller numbers)
  }

  ngAfterViewInit(): void {
    const sections = document.querySelectorAll("section");
    const options = {
      root: null, // viewport
      threshold: 0.6, // 60% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeId = entry.target.id;
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    $(this.el.nativeElement)
      .find(".slider")
      .slick({
        dots: false,
        arrow: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      });
    $(this.el.nativeElement)
      .find(".slider-two")
      .slick({
        dots: false,
        arrow: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      });
    $(this.el.nativeElement)
      .find(".slider-three")
      .slick({
        dots: false,
        arrow: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      });
  }
}

// Wait for the DOM to be ready
document?.addEventListener("DOMContentLoaded", () => {
  // Get the dark mode toggle button and body element
  const darkModeToggleBtn: HTMLButtonElement = document.getElementById(
    "darkModeToggleBtn"
  ) as HTMLButtonElement;
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
