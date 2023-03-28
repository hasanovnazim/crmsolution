import { Component } from '@angular/core';
import { Facade } from './store/auth/facade';
import { Observable } from 'rxjs';
import { UserModel } from './models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { rolesList } from './store/auth/roles/rolesList';

@Component({
  selector: 'app-root',
  template: `
    <nz-layout class="layout">
      <nz-header class="flex-wide">
        <ul nz-menu nzTheme="dark" nzMode="horizontal" *ngIf="user$ | async">
          <li nz-menu-item nzMatchRouter *rbac="[rolesList.DEBITORS_GET]">
            <a routerLink="/debitor">DM</a>
          </li>
          <li
            nz-menu-item
            nzMatchRouter
            *rbac="[rolesList.NOTIFICATIONHISTORY_GET]"
          >
            <a routerLink="/communication-channels">Kommunikasiya</a>
          </li>
          <li nz-menu-item nzMatchRouter *rbac="[rolesList.CONTACTS_GET]">
            <a routerLink="/customer-contacts">Müştəri kontaktları</a>
          </li>
          <li nz-menu-item nzMatchRouter *rbac="[rolesList.CANCELLATION_GET]">
            <a routerLink="/cancel-policy">Xitam olunacaq SŞ</a>
          </li>
          <li
            nz-submenu
            nzTitle="Bildirişlər"
            *rbac="[rolesList.SMSCHECKLIST_GET]"
          >
            <ul>
              <li nz-menu-item>
                <a routerLink="/sms-check-list/">Bildiriş təsdiq</a>
              </li>
              <li nz-menu-item>
                <a routerLink="/sms-check-list/failed-notifications"
                  >Xətalı bildirişlər</a
                >
              </li>
            </ul>
          </li>
          <!--          <li nz-menu-item nzMatchRouter>-->
          <!--            <a routerLink="/audio-records">Səs yazma arxivi</a>-->
          <!--          </li>-->
        </ul>
        <div style="display:flex;align-items: center">
          <p style="color: #fff; margin: 0 10px 0;">
            {{ (user$ | async)?.fullName }}
          </p>
          <a
            nz-button
            nzType="primary"
            [nzSize]="'small'"
            nzShape="circle"
            style="background: none; border: none; margin: 0 10px"
            routerLink="history"
            *rbac="[rolesList.OPERATIONHISTORY_GET]"
          >
            <span nz-icon nzType="history" nzTheme="outline"></span>
          </a>
          <button
            nz-button
            nzType="primary"
            [nzSize]="'small'"
            nzShape="circle"
            style="background: none; border: none"
            (click)="logout()"
          >
            <span nz-icon nzType="logout" nzTheme="outline"></span>
          </button>
        </div>
      </nz-header>
      <nz-content>
        <div class="inner-content">
          <router-outlet></router-outlet>
        </div>
      </nz-content>
      <nz-footer>Debitor app © 2022 Pasha Insurance</nz-footer>
    </nz-layout>
  `,
  styles: [
    `
      .layout {
        min-height: 100vh;
      }

      .logo {
        width: 120px;
        height: 31px;
        display: flex;
        margin-right: 20px;
        a {
          display: flex;
          img {
            max-width: 100%;
          }
        }
      }

      nz-header {
        position: fixed;
        width: 100%;
        display: flex;
        align-items: center;
        z-index: 2;
      }

      [nz-menu] {
        line-height: 64px;
      }

      nz-content {
        padding: 0 50px;
        margin-top: 64px;
      }

      nz-breadcrumb {
        margin: 16px 0;
      }

      .inner-content {
        background: #fff;
        padding: 24px;
        min-height: 380px;
      }

      nz-footer {
        text-align: center;
      }
      .tab-nav-el {
        color: var(--ant-primary-color);
      }
    `,
  ],
})
export class AppComponent {
  user$: Observable<UserModel>;
  rolesList = rolesList;
  constructor(private facade: Facade, private cookieService: CookieService) {
    this.user$ = this.facade.user$;
    const token = this.cookieService.get('token');
    if (token) {
      this.facade.getTokenComplete(token);
    }
  }
  logout() {
    this.facade.logout();
  }
}
