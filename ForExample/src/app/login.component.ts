import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Facade } from './store/auth/facade';
import { environment } from '../environments/environment';

@Component({
  template: `<nz-skeleton [nzActive]="true"></nz-skeleton
    ><nz-skeleton [nzActive]="true"></nz-skeleton
    ><nz-skeleton [nzActive]="true"></nz-skeleton> `,
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authFacade: Facade
  ) {}
  ngOnInit() {
    const sessionId = this.route.snapshot.queryParamMap.get('sessionId');

    if (sessionId) {
      setTimeout(() => this.authFacade.getToken(sessionId), 1000);
    } else {
      window.location.href = environment.loginUrl;
    }
  }
}
