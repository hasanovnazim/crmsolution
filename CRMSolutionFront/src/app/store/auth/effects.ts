import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApiService } from "../api.service";
import { Actions as authActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import { UserModel } from "../../models/user.model";
import { TokenModel } from "src/app/models/token.model";

interface AuthResponsePayload<T> {
  code: number;
  data: T;
  message: string;
  timeStamp: string;
}

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private router: Router,
    private cookieService: CookieService
  ) {}
  onGetToken = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(authActions.getToken),
        switchMap((action) =>
          this.apiService
            .post<AuthResponsePayload<TokenModel>>("login", {
              sessionId: action.sessionId,
            })
            .pipe(
              map((auth) => {
                const token = auth.data.token;
                const helper = new JwtHelperService();

                const expirationDate = helper.getTokenExpirationDate(token);
                this.cookieService.set("token", token, {
                  expires: expirationDate!,
                });
                this.router.navigate(["/campaigns"]);
                return authActions.getTokenComplete({ token });
              }),
              catchError((error: any) =>
                of(authActions.getTokenError({ ...error }))
              )
            )
        )
      )
  );
  onGetTokenComplete = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(authActions.getTokenComplete),
        switchMap(({ token }) => {
          const helper = new JwtHelperService();
          const roles = helper.decodeToken(token).loginDetails.roles;

          return of(authActions.setRoles({ roles }), authActions.getUserData());
        })
      )
  );
  onGetUserData = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(authActions.getUserData),
        switchMap(() =>
          this.apiService.get<AuthResponsePayload<UserModel>>("login").pipe(
            map((user) => {
              return authActions.getUserDataComplete({
                user: { ...user.data },
              });
            }),
            catchError((error: any) =>
              of(authActions.getUserDataError({ ...error }))
            )
          )
        )
      )
  );
}
