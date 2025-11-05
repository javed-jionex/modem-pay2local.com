import { Component, ElementRef, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { GlobalRoutesService } from "@services/globalRoutes/global-routes.service";
import { CommonService } from "@services/modem/common/common.service";
import { LocalStorageMerchantService } from "@services/modem/localstorage/local.service";
import { DepositService } from "@services/modem/pending-request/deposits/deposits.service";
import { WithdrawalService } from "@services/modem/pending-request/withdrawals/withdrawals.service";

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
  depositCount: any;
  withdrawalCount: any;
  totalPendingRequestCount: number = 0;
  paymentCount: any;
  pendinCounts: any = [];
  supportCount: any = [];
  activeParent: string | null = null;
  constructor(
    private router: Router,
    private globalRoutes: GlobalRoutesService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private localStorageMerchantService: LocalStorageMerchantService,
    private commonService: CommonService,
    private depositService: DepositService,
    private withdrawalService: WithdrawalService
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
    this.paymentsRequestList();
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

  // Click on child → activate parent
  setActiveParent(parentName: string) {
    this.clearAllParents();
    this.activateParent(parentName);

    // Save in localStorage
    localStorage.setItem("activeParent", parentName);
  }

  // Clear all active/collapsed parents
  clearAllParents() {
    const body = this.elementRef.nativeElement.ownerDocument.body;

    const allParents = body.querySelectorAll(".parentMenuLink");
    allParents.forEach((parent: any) => {
      this.renderer.removeClass(parent, "active");
      this.renderer.addClass(parent, "collapsed");
      this.renderer.setAttribute(parent, "aria-expanded", "true");
    });
  }

  // Activate a specific parent menu
  activateParent(parentName: string) {
    const body = this.elementRef.nativeElement.ownerDocument.body;
    const parentElement = body.querySelector(
      `.parentMenuLink[data-name="${parentName}"]`
    );
    if (parentElement) {
      this.renderer.addClass(parentElement, "active");
      this.renderer.removeClass(parentElement, "collapsed");
      this.renderer.setAttribute(parentElement, "aria-expanded", "false");
    }

    this.activeParent = parentName;
  }

  // Click on regular menu
  clearActiveParent() {
    const body = this.elementRef.nativeElement.ownerDocument.body;
    this.clearAllParents();
    localStorage.removeItem("activeParent");
    this.activeParent = null;

    const allCollapses = body.querySelectorAll(".collapse");
    allCollapses.forEach((collapse: any) =>
      this.renderer.removeClass(collapse, "show")
    );
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
  paymentsRequestList() {
    this.depositService.list().subscribe((res: any) => {
      this.depositCount = res?.data?.length ?? 0;
    });
    this.withdrawalService.list().subscribe((res: any) => {
      this.withdrawalCount = res?.data?.length ?? 0;
    });
  }
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
