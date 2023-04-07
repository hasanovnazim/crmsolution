import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { Facade } from '../store/auth/facade';
import { Role } from '../store/auth/roles/rolesList';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: Facade,
    public router: Router,
    private notification: NotificationService
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole: Role = route.data['expectedRole'];
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    // if (!this.auth.isRoleCorrect(expectedRole)) {
    //   this.notification.show('error', 'Access Denied');
    //   return false;
    // }
    return true;
  }
}
