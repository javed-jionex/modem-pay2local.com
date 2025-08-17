import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LocalizationService {
  private language: string = "bn"; // Default language
  private translations: any = {};
  private direction: string = "ltr"; // Default direction is left-to-right

  constructor(private http: HttpClient) {}

  // Load the JSON file based on the current language
  loadTranslations(): Observable<any> {
    return this.http.get(`/assets/i18n/${this.language}.json`);
  }

  // Set the language and direction (e.g., 'en' or 'ar-EG')
  setLanguage(lang: string) {
    this.language = lang;
    // this.direction = lang === "ar-EG" ? "rtl" : "ltr"; // Set text direction

    // Update the direction attribute of the HTML document
    //document.documentElement.setAttribute("dir", this.direction);

    this.loadTranslations().subscribe(
      (translations) => {
        this.translations = translations;
      },
      (error) => {
        console.error("Error loading language file:", error);
      }
    );
  }

  // Get the translation for a key
  translate(key: string): string {
    // this.setLanguage(this.language);
    return this.translations[key] || key;
  }
}
