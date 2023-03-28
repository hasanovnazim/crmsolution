import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationsModel } from '../../../models/notifications.model';
import { Columns } from '../data/columns';
import * as moment from 'moment';
import { CommunicationTypesModel } from '../../../models/communication-types.model';
import { originalOrder } from 'src/app/utils/originalOrder';
import { Observable } from 'rxjs';
import { PolicySeriesModel } from '../../../models/policy-series.model';
import { Facade } from '../+state/facade';

@Component({
  selector: 'app-notif-table',
  templateUrl: './notification-table.component.html',
})
export class NotificationTableComponent {
  checked = false;
  indeterminate = false;
  @Output() checkedItems = new EventEmitter<NotificationsModel[]>();
  @Output() searchKey = new EventEmitter<string>();
  @Output() resetKey = new EventEmitter<keyof Columns>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Input() page: number = 0;
  @Input() pageSize: number | undefined = 0;
  @Input() currentPage: number = 0;
  @Input() count: number = 0;
  @Input() listOfData: readonly NotificationsModel[] = [];
  @Input() columns: Columns = {} as Columns;
  @Input() communicationTypes: CommunicationTypesModel[] | null = [];
  listOfCurrentPageData: readonly NotificationsModel[] = [];
  setOfCheckedId = new Set<number>();
  originalOrder = originalOrder;

  policySeries$: Observable<PolicySeriesModel[]>;
  constructor(private facade: Facade) {
    this.policySeries$ = this.facade.getPolicySeries();
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(
    listOfCurrentPageData: readonly NotificationsModel[]
  ): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(({ id }) =>
      this.setOfCheckedId.has(id)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some(({ id }) =>
        this.setOfCheckedId.has(id)
      ) && !this.checked;
    this.checkedItems.emit(
      this.listOfCurrentPageData.filter(({ id }) => this.setOfCheckedId.has(id))
    );
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
  onPageSizeChange(size: number) {
    this.pageSizeChange.emit(size);
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.forEach(({ id }) =>
      this.updateCheckedSet(id, checked)
    );
    this.refreshCheckedStatus();
  }
  search(key: string) {
    this.searchKey.emit(key);
  }
  onDateFilter(result: Date[], colName: keyof Columns): void {
    this.columns[colName].start = moment(result[0]).format('DD.MM.YYYY');
    this.columns[colName].end = moment(result[1]).format('DD.MM.YYYY');
  }
  resetFilter(key: keyof Columns) {
    this.resetKey.emit(key);
  }
}
