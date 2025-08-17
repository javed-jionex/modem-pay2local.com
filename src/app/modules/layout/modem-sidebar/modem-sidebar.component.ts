import { Component, ElementRef, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { GlobalRoutesService } from "@services/globalRoutes/global-routes.service";
import { CommonService } from "@services/modem/common/common.service";
import { LocalStorageMerchantService } from "@services/modem/localstorage/local.service";

@Component({
  selector: "app-modem-sidebar",
  templateUrl: "./modem-sidebar.component.html",
  styleUrls: ["./modem-sidebar.component.css"],
})
export class ModemSidebarComponent {
  userProfile: any;
  statusCount: any = [];
  itemsPerPage: number = 10;
  menus: any;
  menuName: string = "";
  actionPermission: any;
  depositsCount: any;
  withdrawalCount: any;
  totalPendingRequestCount: number = 0;
  paymentCount: any;
  pendinCounts: any = [];
  supportCount: any = [];
  constructor(
    private router: Router,
    private globalRoutes: GlobalRoutesService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private localStorageMerchantService: LocalStorageMerchantService,
    private commonService: CommonService
  ) {
    //	this.getCountsObject()
  }

  ngOnInit() {
    this.userProfile = this.localStorageMerchantService.getAdminPermisson();
    //this.menus = this.globalRoutes.checkNewMerchantRolePermission();
    // this.dashboardService.getPedingCountRF().subscribe((res) => {
    //   this.getPendingRequestCount();
    // });
    // this.getPendingRequestCount();
    // this.getSupportDataCount();
  }
  closeSidebar() {
    const body = this.elementRef.nativeElement.ownerDocument.body;
    if (body.classList.contains("toggle-sidebar")) {
      this.renderer.removeClass(body, "toggle-sidebar");
    }
  }

  isCurrentUrl(routes: any): boolean {
    return routes.includes(this.router.url);
  }
  // getCountsObject() {
  //   this.balanceService.getStatusCount().subscribe((res: any) => {
  //     if (res.status === 200) {
  //       this.statusCount = res.data;
  //     }
  //   });
  // }
  menuCollapsed(name: any) {
    this.menuName = name;
  }

  // mouseOver() {
  // 	const screenWidth = window.innerWidth;

  // 	if (screenWidth >= 1200) {
  // 	  this.renderer.removeClass(
  // 		this.elementRef.nativeElement.ownerDocument.body,
  // 		'toggle-sidebar'
  // 	  );
  // 	}
  //   }

  // getPendingRequestCount() {
  //   this.dashboardService.pendingCountData().subscribe((res: any) => {
  //     if (res.status == 200) {
  //       this.pendinCounts = res.data;
  //       this.headerService.updatePendingCount(res.data);
  //     }
  //   });
  // }
  // getSupportDataCount() {
  //   this.dashboardService.supportCountData().subscribe((res: any) => {
  //     if (res?.status == 200) {
  //       this.supportCount = res.data;
  //       this.headerService.updateSupportCount(res.data);
  //     }
  //   });
  // }
  getPermisions(name: any, child?: any): any {
    let status = false;
    let parentPermission;
    // if(this.userProfile.userRoles[0] == 'SuperAdmin'){
    // 	return true
    // }else{
    let getPermission = this.commonService.getMerchantPermissionOBJ(name);
    if (getPermission == undefined) {
      return;
    }
    if (child) {
      if (getPermission?.length != 0) {
        getPermission[0]?.permissions.filter((item: any, index: any) => {
          if (item.name == child) {
            status = item.action;
          }
        });
      } else {
        status = false;
      }
    } else {
      if (getPermission?.length != 0) {
        getPermission[0]?.permissions.filter((item: any, index: any) => {
          if (item.name == "View") {
            status = item.view;
          }
        });
      } else {
        status = false;
      }
    }
    //}
    return status;
  }
}
