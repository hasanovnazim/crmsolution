import { NgModule } from '@angular/core';
import { RolesDirective } from './roles.directive';
import { RoleReplacementComponent } from './role-replacement.component';

@NgModule({
  declarations: [RolesDirective, RoleReplacementComponent],
  exports: [RolesDirective, RoleReplacementComponent],
})
export class RolesModule {}
