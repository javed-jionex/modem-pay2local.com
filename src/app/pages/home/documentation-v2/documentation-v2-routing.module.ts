import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationV2Component } from './documentation-v2.component';

const routes: Routes = [
  {
		path: '',
		component: DocumentationV2Component,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationV2RoutingModule { }
