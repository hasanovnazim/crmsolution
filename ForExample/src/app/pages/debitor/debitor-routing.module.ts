import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebitorComponent } from './debitor.component';
import { DebitorDetailsComponent } from './debitor-details/debitor-details.component';
import { CommentsComponent } from './comments/comments.component';
import { AuthGuardService as AuthGuard } from '../../guards/auth-guard.service';
import { rolesList } from '../../store/auth/roles/rolesList';

const routes: Routes = [
  { path: '', component: DebitorComponent },
  {
    path: ':insuredType/:insureTypeId/:insuredId',
    component: DebitorDetailsComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: rolesList.DEBITORDETAILS_GET,
    },
  },
  {
    path: 'comments/:policyId/:insuredType/:insureTypeId/:insuredId',
    component: CommentsComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: rolesList.COMMENTS_GET,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebitorRoutingModule {}
