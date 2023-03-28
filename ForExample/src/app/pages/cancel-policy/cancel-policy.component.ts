import { Component, OnInit } from '@angular/core';
import { Facade } from './+state/facade';
import { Facade as authFacade } from '../../store/auth/facade';
import { lastValueFrom, map, Observable, of } from 'rxjs';
import {
  CancellationApprove,
  CancellationIncrease,
  CancellationModel,
} from '../../models/cancellation.model';
import { Columns } from './data/columns';
import { InsuredTypeEnum } from '../debitor/data/insuredType.enum';
import { InsuredType } from '../../models/insured-type.model';
import * as moment from 'moment';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from '../../shared/notification.service';
import { CreateTaskModel } from '../../models/task.model';
import { SmsStatusListModel } from '../../models/sms-status-list.model';
import { differenceInCalendarDays } from 'date-fns';
import { PolicySeriesModel } from '../../models/policy-series.model';
import { rolesList } from '../../store/auth/roles/rolesList';

@Component({
  templateUrl: './cancel-policy.component.html',
})
export default class CancelPolicyComponent implements OnInit {
  columns = Columns;
  cancellations$: Observable<CancellationModel[]>;
  loading$: Observable<boolean>;
  count$: Observable<number>;
  currentPage$: Observable<number>;
  insuredTypes$: Observable<InsuredType[]>;

  isDateVisible = false;
  isDateOkLoading = false;
  isCreateTaskVisible = false;
  isCreateTaskOkLoading = false;
  selectedCancelDate: Date = new Date();
  cancelMessage = '';
  selectedCancellation: CancellationModel = {} as CancellationModel;
  confirmModal?: NzModalRef;
  subjectId = 0;
  portfelId = 0;
  selectedInsureTypeId = 0;
  statusList$: Observable<any> = of([]);
  portfels$!: Observable<any>;
  subjects$!: Observable<any>;
  smsStatusList$!: Observable<SmsStatusListModel[]>;
  params$: Observable<Partial<CancellationModel>>;
  today = new Date();
  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, this.today) < 1;
  policySeries$: Observable<PolicySeriesModel[]>;
  insuredTypesEnum = {
    p: 1,
    c: 2,
  };
  rolesList = rolesList;
  constructor(
    private facade: Facade,
    private modal: NzModalService,
    private notification: NotificationService,
    private authFacade: authFacade
  ) {
    this.cancellations$ = this.facade.cancellations$;
    this.loading$ = this.facade.loading$;
    this.count$ = this.facade.count$;
    this.currentPage$ = this.facade.currentPage$;
    this.insuredTypes$ = this.facade.getInsuredTypes();
    this.statusList$ = this.facade.getStatusList();

    this.smsStatusList$ = this.facade.getSmsStatusList();

    this.policySeries$ = this.facade.getPolicySeries();
    this.params$ = this.facade.params$;
  }

  ngOnInit() {
    this.facade.getCustomerCancellations();
  }
  openCreateModal(cancellation: CancellationModel) {
    this.selectedInsureTypeId = cancellation.insureTypeId;
    this.selectedCancellation = cancellation;
    this.portfels$ = this.facade.getPortfels(this.selectedInsureTypeId);
    this.isCreateTaskVisible = true;
  }
  onPortfelChange() {
    this.subjects$ = this.facade.getSubjects(this.portfelId);
  }
  showDateModal(cancellation: CancellationModel): void {
    this.selectedCancellation = cancellation;
    this.selectedCancelDate = cancellation.debitorDate as unknown as Date;
    this.isDateVisible = true;
  }
  handleDateCancel(): void {
    this.isDateVisible = false;
    this.isDateOkLoading = false;
    this.cancelMessage = '';
  }
  handleCreateTaskCancel(): void {
    this.isCreateTaskVisible = false;
    this.isCreateTaskOkLoading = false;
    this.subjectId = 0;
    this.portfelId = 0;
  }
  handleCreateTaskOk() {
    this.isCreateTaskOkLoading = true;

    const body: CreateTaskModel = {
      cancellationId: this.selectedCancellation.id,
      subjectId: this.subjectId,
      portfelId: this.portfelId,
    };
    this.facade.createTask(body).subscribe({
      next: (v) => {
        if (v.code !== 2002) {
          this.notification.show('success', v.message);

          this.facade.getCustomerCancellations();
          this.handleCreateTaskCancel();
        }
      },
      error: (v) => {
        this.isCreateTaskOkLoading = false;
      },
    });
  }
  handleDateOk(): void {
    const msInDay = 24 * 60 * 60 * 1000;
    const dayCount =
      (this.selectedCancelDate.getTime() -
        new Date(this.selectedCancellation.debitorDate).getTime()) /
      msInDay;
    this.isDateOkLoading = true;
    const body: CancellationIncrease = {
      debitorWillCancelledId: this.selectedCancellation.id,
      dayCount,
      note: this.cancelMessage,
    };

    this.facade.cancellationIncrease(body).subscribe({
      next: (v) => {
        this.notification.show('success', v.message);

        this.facade.getCustomerCancellations();
        this.handleDateCancel();
      },
      error: (v) => {
        this.isDateOkLoading = false;
      },
    });
  }

  getInsuredType(type: 'c' | 'p'): string {
    return InsuredTypeEnum[type];
  }

  resetFilter(key: keyof Columns): void {
    this.columns[key].searchValue = '';
    this.columns[key].min = 0;
    this.columns[key].max = 0;
    this.columns[key].start = '';
    this.columns[key].end = '';
  }

  search(key: string): void {
    const searchParam = (this.columns as any)[key];
    searchParam.isSearchVisible = false;
    if (key === 'debitorDate' || key === 'policyDate' || key === 'debt') {
      if (this.columns[key].min && this.columns[key].max) {
        this.columns[
          key
        ].searchValue = `${this.columns[key].min}-${this.columns[key].max}`;
        this.facade.changeParams(`${key}From`, this.columns[key].min);
        this.facade.changeParams(`${key}To`, this.columns[key].max);
        return;
      } else {
        this.facade.removeParam(`${key}From`);
        this.facade.removeParam(`${key}To`);
      }
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
  downloadReport(): Observable<string> {
    return this.facade.downloadReport();
  }

  showApprove(id: number): void {
    const body: CancellationApprove = {
      cancellationId: id,
      note: '',
    };
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Təsdiqləmək istəyirsinizmi?',
      nzOnOk: () =>
        lastValueFrom(this.facade.cancellationApprove(body))
          .then((v) => {
            this.notification.show('success', v.message);

            this.facade.getCustomerCancellations();
          })
          .catch(() => {
            this.facade.getCustomerCancellations();
          }),
    });
  }
}
