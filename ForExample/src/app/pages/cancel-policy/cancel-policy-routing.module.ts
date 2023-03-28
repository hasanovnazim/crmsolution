import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import CancelPolicyComponent from './cancel-policy.component';

const routes: Routes = [{ path: '', component: CancelPolicyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelPolicyRoutingModule {}
