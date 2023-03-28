import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmsCheckListComponent } from './sms-check-list.component';
import { FailedNotificationsComponent } from './failed-notifications.component';

const routes: Routes = [
  { path: '', component: SmsCheckListComponent },
  { path: 'failed-notifications', component: FailedNotificationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsCheckListRoutingModule {}
