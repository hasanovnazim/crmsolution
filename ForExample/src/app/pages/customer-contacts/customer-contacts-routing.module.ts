import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import CustomerContactsComponent from './customer-contacts.component';

const routes: Routes = [{ path: '', component: CustomerContactsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerContactsRoutingModule {}
