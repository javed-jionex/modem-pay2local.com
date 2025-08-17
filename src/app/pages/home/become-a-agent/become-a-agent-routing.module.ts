import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BecomeAAgentComponent } from './become-a-agent.component';

const routes: Routes = [
  { path: '', component: BecomeAAgentComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BecomeAAgentRoutingModule { }
