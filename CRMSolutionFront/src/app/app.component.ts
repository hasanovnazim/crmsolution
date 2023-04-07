import { Component } from '@angular/core';
import { Facade } from './store/auth/facade';
import { Observable } from 'rxjs';
import { UserModel } from './models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { rolesList } from './store/auth/roles/rolesList';import { LocalStorageEnum } from './enums/local-storage.enum';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;

  user$: Observable<UserModel>;
  rolesList = rolesList;
  constructor(private facade: Facade, private cookieService: CookieService) {
    this.user$ = this.facade.user$;
    const token = this.cookieService.get(LocalStorageEnum.Token);
    if (token) {
      this.facade.getTokenComplete(token);
    }
  }
  logout() {
    this.facade.logout();
  }

}


