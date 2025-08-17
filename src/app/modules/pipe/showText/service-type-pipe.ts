import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "serviceTypeText",
})
export class ServiceTypeTextPipe implements PipeTransform {
  transform(value: string): string {
    if (value === "p2p_agent") {
      return "P2P Agent";
    } else if (value === "p2c_api") {
      return "P2C API";
    } else if (value === "p2c_qr") {
      return "P2C QR";
    } else {
      return value;
    }
  }
}
