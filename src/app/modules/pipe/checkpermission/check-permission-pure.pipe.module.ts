import { NgModule } from '@angular/core';
import { CheckPermissionPurePipe } from './check-permission.pipe';


@NgModule({
  declarations: [CheckPermissionPurePipe],
  exports: [CheckPermissionPurePipe],
})
export class CheckPermissionPurePipeModule {}