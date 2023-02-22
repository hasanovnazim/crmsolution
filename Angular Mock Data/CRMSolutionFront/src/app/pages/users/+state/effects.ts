import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../../store/api.service';
import { Actions as userActions } from './actions';
import { map, switchMap } from 'rxjs';
import { UserModel } from '../../../models/user.model';

@Injectable()
export class Effects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  onGetUsers = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(userActions.getUsers),
        switchMap(() =>
          this.apiService.get<UserModel[]>('users').pipe(
            map((users) => {
              return userActions.getUsersComplete({ users });
            })
          )
        )
      )
  );
}
