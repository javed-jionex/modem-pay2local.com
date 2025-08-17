
import { Injectable } from '@angular/core';
import { LocalStorageMerchantService } from '../localstorage/local.service';
@Injectable({
  providedIn: 'root'
})
export class MerchantPermissionService {
 
  constructor(private localStorageMerchantService: LocalStorageMerchantService) { }
  
  getMerchantPermissionOBJ(parentName:string){
    let permissionsData:any = this.localStorageMerchantService.getAdminPermisson();
      const parentPermissionObject = permissionsData?.filter((item:any, index:any) => {
        return item.name == parentName;
       });
       return parentPermissionObject
}
}
