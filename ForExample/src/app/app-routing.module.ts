import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthGuardService as AuthGuard } from './guards/auth-guard.service';
import { rolesList } from './store/auth/roles/rolesList';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/Session.aspx' },
  {
    path: 'debitor',
    loadChildren: () =>
      import('./pages/debitor/debitor.module').then((m) => m.DebitorModule),
    canActivate: [AuthGuard],
    data: {
      expectedRole: rolesList.DEBITORS_GET,
    },
  },
  {
    path: 'communication-channels',
    loadChildren: () =>
      import(
        './pages/communication-channels/communication-channels.module'
      ).then((m) => m.CommunicationChannelsModule),
    canActivate: [AuthGuard],
    data: {
      expectedRole: rolesList.NOTIFICATIONHISTORY_GET,
    },
  },
  {
    path: 'customer-contacts',
    loadChildren: () =>
      import('./pages/customer-contacts/customer-contacts.module').then(
        (m) => m.CustomerContactsModule
      ),
    canActivate: [AuthGuard],
    data: {
      expectedRole: rolesList.CONTACTS_GET,
    },
  },
  {
    path: 'cancel-policy',
    loadChildren: () =>
      import('./pages/cancel-policy/cancel-policy.module').then(
        (m) => m.CancelPolicyModule
      ),
    canActivate: [AuthGuard],
    data: {
      expectedRole: rolesList.CANCELLATION_GET,
    },
  },
  // {
  //   path: 'audio-records',
  //   loadChildren: () =>
  //     import('./pages/audio-records/audio-records.module').then(
  //       (m) => m.AudioRecordsModule
  //     ),
  //   canActivate: [AuthGuard],
  //   data: {
  //     expectedRole: rolesList.DEBITORS_GET,
  //   },
  // },
  {
    path: 'history',
    loadChildren: () =>
      import('./pages/history/history.module').then((m) => m.HistoryModule),
    canActivate: [AuthGuard],
    data: {
      expectedRole: rolesList.OPERATIONHISTORY_GET,
    },
  },
  {
    path: 'sms-check-list',
    loadChildren: () =>
      import('./pages/sms-check-list/sms-check-list.module').then(
        (m) => m.SmsCheckListModule
      ),
    canActivate: [AuthGuard],
    data: {
      expectedRole: rolesList.SMSCHECKLIST_GET,
    },
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./pages/tasks/tasks.module').then((m) => m.TasksModule),
    canActivate: [AuthGuard],
    data: {
      expectedRole: rolesList.TASK_GET,
    },
  },
  {
    path: 'Session.aspx',
    component: LoginComponent,
  },
  { path: '**', pathMatch: 'full', redirectTo: '/debitor' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
