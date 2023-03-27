import { filter, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Selectors } from './selectors';
import { select, Store } from '@ngrx/store';
import { ConfigState } from './state';

@Injectable({
  providedIn: 'root',
})
export class Facade {
  constructor(private store: Store<any>) {}

  config$: Observable<ConfigState | null> = this.store.pipe(
    select(Selectors.config),
    filter((v) => !!v)
  );
}
