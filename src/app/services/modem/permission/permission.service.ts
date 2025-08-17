import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environment/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionMerchantService {
  methodName = new Subject<any>();
  apiUrl:string = environment.backendHost;
  constructor(private http :HttpClient) {}
  sendMethod(data: any) {
    this.methodName.next({ data: data });
  }
  getMethod(){
    return this.methodName.asObservable();
  }
  
}