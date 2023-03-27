import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignsAddComponent } from '../pages/add/campaigns-add.component';
import { CampaignsComponent } from '../pages/list/campaigns.component';

const routes: Routes = [
  {
    path: "",
    component: CampaignsComponent,
  },
  {
    path: "add",
    component: CampaignsAddComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignsRoutingModule { }
