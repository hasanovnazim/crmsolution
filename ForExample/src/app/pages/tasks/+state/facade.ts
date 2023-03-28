import { Injectable } from '@angular/core';
import { Selectors } from './selectors';
import { Actions } from './actions';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { TaskModel } from '../../../models/task.model';
import { InsuredType } from '../../../models/insured-type.model';
import { ResponsePayload } from '../../../models/response.model';
import { ApiService } from '../../../store/api.service';

@Injectable()
export class Facade {
  tasks$: Observable<TaskModel[]> = this.store.pipe(
    select(Selectors.tasks),
    filter((v) => !!v)
  );
  loading$: Observable<boolean> = this.store.pipe(select(Selectors.loading));
  count$: Observable<number> = this.store.pipe(select(Selectors.count));
  params$: Observable<Partial<TaskModel>> = this.store.pipe(
    select(Selectors.params)
  );
  currentPage$: Observable<number> = this.store.pipe(
    select(Selectors.currentPage)
  );
  error$: Observable<any> = this.store.pipe(
    select(Selectors.error),
    filter((v) => !!v)
  );
  constructor(private store: Store<any>, private api: ApiService) {}

  getTasks(): void {
    this.store.dispatch(Actions.getTasks());
  }

  changeParams(param: string, value: number | string): void {
    if (!value) {
      this.removeParam(param);
      return;
    }
    this.store.dispatch(Actions.changeTasksParams({ param, value }));
  }

  changePage(page: number) {
    this.store.dispatch(Actions.changePagination({ page }));
  }

  removeParam(param: string): void {
    this.store.dispatch(Actions.removeTasksParam({ param }));
  }

  public getInsuredTypes(): Observable<InsuredType[]> {
    return this.api
      .get<ResponsePayload<InsuredType>>('insuredTypes')
      .pipe(map((v) => v.data.result));
  }
}
