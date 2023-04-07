import { Injectable } from '@angular/core';
import {
  createFeatureSelector,
  createSelector,
  select,
  Store,
} from '@ngrx/store';
import { Actions } from './actions';
import { FeaturesEnum } from '../features.enum';
import { AuthState } from './state';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Role, rolesList } from './roles/rolesList';

@Injectable({ providedIn: 'root' })
export class Facade {
  constructor(
    private store: Store<any>,
    private cookieService: CookieService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    this.roles$.subscribe((v) => {
      this.roles = v;
    });
  }

  roles: Role[] = [];
  private userSelector = createSelector(
    createFeatureSelector(FeaturesEnum.AUTH),
    (state: AuthState) => state.user
  );
  private roleSelector = createSelector(
    createFeatureSelector(FeaturesEnum.AUTH),
    (state: AuthState) => state.roles
  );
  token$ = createSelector(
    createFeatureSelector(FeaturesEnum.AUTH),
    (state: AuthState) => state.token
  );

  user$ = this.store.pipe(select(this.userSelector));
  roles$: Observable<Role[]> = this.store.pipe(select(this.roleSelector));

  getToken(sessionId: string): void {
    this.store.dispatch(Actions.getToken({ sessionId }));
  }
  getTokenComplete(token: string): void {
    this.store.dispatch(Actions.getTokenComplete({ token }));
  }

  getUserData(): void {
    this.store.dispatch(Actions.getUserData());
  }

  logout() {
    this.cookieService.delete('token');
    this.router.navigate(['/']);
  }
  isAuthenticated(): boolean {
    const token = this.cookieService.get('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  // isRoleCorrect(role: Role): boolean {
  //   if (this.roles.includes(rolesList.DEBITOR_OPERATOR)) {
  //     return true;
  //   }
  //   return this.roles.includes(role);
  // }
}
