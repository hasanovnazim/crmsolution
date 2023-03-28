import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Selectors } from './selectors';
import { ApiService } from '../../../store/api.service';
import { ExcelDownloadService } from '../../../shared/excell-report/excel-download.service';
import { Actions } from './actions';
import { HistoryModel } from '../../../models/history.model';

@Injectable()
export class Facade {
  history$: Observable<HistoryModel[]> = this.store.pipe(
    select(Selectors.history),
    filter((v) => !!v)
  );
  loading$: Observable<boolean> = this.store.pipe(select(Selectors.loading));
  count$: Observable<number> = this.store.pipe(select(Selectors.count));
  params$: Observable<Partial<HistoryModel>> = this.store.pipe(
    select(Selectors.params)
  );
  currentPage$: Observable<number> = this.store.pipe(
    select(Selectors.currentPage)
  );
  error$: Observable<any> = this.store.pipe(
    select(Selectors.error),
    filter((v) => !!v)
  );
  constructor(
    private store: Store<any>,
    private api: ApiService,
    private excelService: ExcelDownloadService
  ) {}

  getCustomerHistory(): void {
    this.store.dispatch(Actions.getHistory());
  }

  changeParams(param: string, value: number | string): void {
    if (!value) {
      this.removeParam(param);
      return;
    }
    this.store.dispatch(Actions.changeHistoryParams({ param, value }));
  }

  changePage(page: number) {
    this.store.dispatch(Actions.changePagination({ page }));
  }

  removeParam(param: string): void {
    this.store.dispatch(Actions.removeHistoryParam({ param }));
  }

  downloadReport(): Observable<string> {
    return this.excelService.downloadReport(
      'operationhistory/report',
      this.params$
    );
  }
}
