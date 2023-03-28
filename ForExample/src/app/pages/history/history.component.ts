import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoryModel } from '../../models/history.model';
import { Facade } from './+state/facade';
import { Columns } from './data/columns';
import { originalOrder } from '../../utils/originalOrder';
import * as moment from 'moment';

@Component({
  templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit {
  history$: Observable<HistoryModel[]>;
  loading$: Observable<boolean>;
  count$: Observable<number>;
  currentPage$: Observable<number>;
  columns = Columns;
  originalOrder = originalOrder;
  params$: Observable<Partial<HistoryModel>>;
  constructor(private facade: Facade) {
    this.history$ = this.facade.history$;
    this.loading$ = this.facade.loading$;
    this.count$ = this.facade.count$;
    this.currentPage$ = this.facade.currentPage$;
    this.params$ = this.facade.params$;
  }

  ngOnInit() {
    this.facade.getCustomerHistory();
  }

  search(key: string): void {
    const searchParam = (this.columns as any)[key];
    searchParam.isSearchVisible = false;
    if (key === 'operationDate') {
      this.facade.changeParams(`${key}From`, this.columns[key].start);
      this.facade.changeParams(`${key}To`, this.columns[key].end);
      return;
    }
    this.facade.changeParams(key, searchParam.searchValue);
  }
  onDateFilter(result: Date[], colName: keyof Columns): void {
    this.columns[colName].start = moment(result[0]).format('DD.MM.YYYY');
    this.columns[colName].end = moment(result[1]).format('DD.MM.YYYY');
  }
  pageChange(page: number) {
    this.facade.changePage(page);
  }
  pageSizeChange(size: number) {
    this.facade.changeParams('limit', size);
  }
  resetFilter(key: keyof Columns): void {
    this.columns[key].searchValue = '';
    this.columns[key].min = 0;
    this.columns[key].max = 0;
    this.columns[key].start = '';
    this.columns[key].end = '';
  }
  downloadReport(): Observable<string> {
    return this.facade.downloadReport();
  }
}
