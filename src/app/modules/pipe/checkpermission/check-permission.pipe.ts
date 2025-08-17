import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "checkPermissionPure",
  pure: true,
})
export class CheckPermissionPurePipe implements PipeTransform {
  constructor() {}
  transform(value: any, permission: string): any {
    if (Array.isArray(value)) {
      const filteredData = value[0]?.permissions?.filter(
        (item: any) => item.name == permission
      );
      if (filteredData?.length > 0) {
        switch (permission) {
          case "Create":
            return filteredData[0]?.create;
            break;
          case "View":
            return filteredData[0]?.view;
            break;
          case "Balcom":
            return filteredData[0]?.balcom;
            break;
          case "Action":
            return filteredData[0]?.action;
            break;
          default:
            break;
        }
      }
    }
    // Handle the case where value is not an array or no matching item is found
    return false; // or any default value you want
  }
}
