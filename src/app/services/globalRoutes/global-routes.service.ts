import { Injectable } from "@angular/core";
import { LocalStorageMerchantService } from "@services/modem/localstorage/local.service";
import { PermissionMerchantService } from "@services/modem/permission/permission.service";

@Injectable({
  providedIn: "root",
})
export class GlobalRoutesService {
  //  permission: any[] = [
  // 	{
  // 		name: 'Members',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: false,
  // 			},
  // 			{
  // 				name: 'Create',
  // 				create: false,
  // 			},
  // 			{
  // 				name: 'Bal/Com.',
  // 				balance: false,
  // 			},
  // 			{
  // 				name: 'Action',
  // 				action: false
  // 			},
  // 		],
  // 	},{
  // 		name: 'Agents',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: true,
  // 			},
  // 			{
  // 				name: 'Action',
  // 				action: false
  // 			},
  // 		],
  // 	},{
  // 		name: 'Modems',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: true,
  // 			}
  // 			,
  // 			{
  // 				name: 'Action',
  // 				action: false
  // 			},
  // 		],
  // 	},{
  // 		name: 'Merchants',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: true,
  // 			},
  // 			{
  // 				name: 'Create',
  // 				create: false,
  // 			},
  // 			{
  // 				name: 'Bal/Com.',
  // 				balance: false,
  // 			},
  // 			{
  // 				name: 'Action',
  // 				action: false
  // 			},
  // 		],
  // 	},{
  // 		name: 'Scam Filter',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: false,
  // 			},
  // 			{
  // 				name: 'Action',
  // 				action: false
  // 			},
  // 		],
  // 	},{
  // 		name: 'Sms inbox',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: false,
  // 			},

  // 			{
  // 				name: 'Action',
  // 				action: false
  // 			},
  // 		],
  // 	},{
  // 		name: 'Transactions',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: false,
  // 			},

  // 			{
  // 				name: 'Action',
  // 				action: false
  // 			},
  // 		],
  // 	},{
  // 		name: 'Pendings',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: false,
  // 			},

  // 			{
  // 				name: 'Action',
  // 				action: false
  // 			},
  // 		],
  // 	},{
  // 		name: 'Incompletes',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: false,
  // 			},
  // 			{
  // 				name: 'Create',
  // 				create: false,
  // 			},
  // 			{
  // 				name: 'Action',
  // 				action: false
  // 			},
  // 		],
  // 	},{
  // 		name: 'Reports',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: false,
  // 			},
  // 			{
  // 				name: 'Action',
  // 				action: false
  // 			},
  // 		],
  // 	},{
  // 		name: 'Logs',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: false,
  // 			},
  // 			{
  // 				name: 'Action',
  // 				action: false
  // 			},
  // 		],
  // 	},{
  // 		name: 'Methods',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: false,
  // 			},
  // 			{
  // 				name: 'Create',
  // 				create: false,
  // 			},
  // 			{
  // 				name: 'Action',
  // 				action: false
  // 			},
  // 		],
  // 	},{
  // 		name: 'Modem Settings',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: false,
  // 			},
  // 			{
  // 				name: 'Create',
  // 				create: false,
  // 			},
  // 			{
  // 				name: 'Action',
  // 				action: false
  // 			},
  // 		],
  // 	},{
  // 		name: 'Settings',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: false,
  // 			},
  // 			{
  // 				name: 'Action',
  // 				action: false
  // 			},
  // 		],
  // 	},{
  // 		name: 'Module Limit',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: false,
  // 			},
  // 			{
  // 				name: 'Action',
  // 				action: false
  // 			},
  // 		],
  // 	},{
  // 		name: 'Supports',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: false,
  // 			},
  // 			{
  // 				name: 'Create',
  // 				create: false,
  // 			},
  // 			{
  // 				name: 'Action',
  // 				action: false
  // 			},
  // 		],
  // 	},{
  // 		name: 'Global Time Zone',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: false,
  // 			},
  // 			{
  // 				name: 'Create',
  // 				create: false,
  // 			},
  // 			{
  // 				name: 'Action',
  // 				action: false
  // 			},
  // 		],
  // 	},{
  // 		name: 'Api',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: false,
  // 			}
  // 		],
  // 	},{
  // 		name: 'Sign In',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: false,
  // 			}
  // 		],
  // 	},{
  // 		name: 'Suspend',
  // 		permissions: [
  // 			{
  // 				name: 'View',
  // 				view: false,
  // 			}
  // 		],
  // 	}

  // ];
  permission: any = [];
  constructor(
    private permissionMerchantService: PermissionMerchantService,
    private localStorageMerchantService: LocalStorageMerchantService
  ) {}
  ngOnInit() {}

  hasMerchantPermission(): Promise<boolean> {
    this.permission = this.localStorageMerchantService.getAdminPermisson();
    return new Promise((resolve, reject) => {
      this.permissionMerchantService.getMethod().subscribe(
        (res: any) => {
          const moduleName = res.data;
          const module = this.permission.find(
            (m: any) => m.name === moduleName.moduleName
          );
          if (!module) {
            console.log("No such module found");
            resolve(false);
            return;
          }

          const permission = module.permissions.find(
            (p: any) => p.name === moduleName.name
          );

          if (!permission) {
            console.log("No such permission found");
            resolve(false);
            return;
          }
          const hasPermission = permission[moduleName.name.toLowerCase()];
          console.log(module, moduleName, permission);
          resolve(hasPermission ? hasPermission : false);
        },
        (error) => {
          console.error("Error fetching permissions", error);
          reject(error);
        }
      );
    });
  }
}
