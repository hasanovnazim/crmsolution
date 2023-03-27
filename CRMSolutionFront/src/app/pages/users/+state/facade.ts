import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, Observable, skip } from 'rxjs';
import { Selectors } from './selectors';
import { UserModel } from '../../../models/user.model';
import { Actions } from './actions';

@Injectable()
export class Facade {
  constructor(private store: Store<any>) {}

  users$: Observable<UserModel[]> = this.store.pipe(
    select(Selectors.users),
    skip(1),
    filter((v) => !!v)
  );
  loading$: Observable<boolean> = this.store.pipe(
    select(Selectors.loading),
    filter((v) => !!v)
  );
  error$: Observable<any> = this.store.pipe(
    select(Selectors.error),
    filter((v) => !!v)
  );

  getUsers(): void {
    this.store.dispatch(Actions.getUsers());
  }
}
