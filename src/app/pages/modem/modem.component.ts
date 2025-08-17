import { Component, Renderer2 } from "@angular/core";

@Component({
  selector: "app-modem",
  templateUrl: "./modem.component.html",
  styleUrls: ["./modem.component.css"],
})
export class ModemComponent {
  isLoader: boolean = false;
  constructor(private renderer: Renderer2) {}

  // removeBodyClass() {
  //   const body = document.getElementsByTagName('body')[0];
  //   this.renderer.removeClass(body, 'toggle-sidebar');
  // }
  ngOnInit() {
    // this.setTimezone();
  }
  // setTimezone() {
  //   this.timezoneService.get().subscribe((res: any) => {
  //     if (res.status == 200) {
  //       localStorage.removeItem("commonTimezone");
  //       localStorage.setItem("commonTimezone", res.data);
  //     }
  //   });
  // }
  getLoader(event: boolean) {
    this.isLoader = event;
  }
}
