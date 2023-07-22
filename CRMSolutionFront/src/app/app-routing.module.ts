import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthGuardService as AuthGuard } from './guards/auth-guard.service';
import { rolesList } from './store/auth/roles/rolesList';


const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
      //canActivate: [AuthGuard],
    // data: {
    //   expectedRole: rolesList.DEBITORS_GET,
    // },
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
      //canActivate: [AuthGuard],
  },
  {
    path: 'campaigns',
    loadChildren: () =>
      import('./pages/campaigns/module/campaigns.module').then((m) => m.CampaignsModule),
      canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  // { path: '**', pathMatch: 'full', redirectTo: '/welcome' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
