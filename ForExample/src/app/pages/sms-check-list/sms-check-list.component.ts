import { Component, OnInit } from '@angular/core';
import { filter, lastValueFrom, Observable } from 'rxjs';
import { SmsCheckListModel } from '../../models/sms-check-list.model';
import { Facade, SmstimeModel } from './+state/facade';
import { Columns } from './data/columns';
import { originalOrder } from '../../utils/originalOrder';
import * as moment from 'moment';
import { SmsStatusListModel } from '../../models/sms-status-list.model';
import { NotificationService } from '../../shared/notification.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { PolicySeriesModel } from '../../models/policy-series.model';
import { InsuredType } from '../../models/insured-type.model';
import { BranchModel } from '../../models/branch.model';
import { CommunicationTypesModel } from '../../models/communication-types.model';
import { rolesList } from '../../store/auth/roles/rolesList';
import { Facade as AuthFacade } from '../../store/auth/facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  templateUrl: './sms-check-list.component.html',
})
export class SmsCheckListComponent implements OnInit {
  smsCheckList$: Observable<SmsCheckListModel[]>;
  loading$: Observable<boolean>;
  count$: Observable<number>;
  currentPage$: Observable<number>;
  statusList$: Observable<SmsStatusListModel[]>;
  checkedItems: SmsCheckListModel[] = [];
  smsTime$: Observable<SmstimeModel[]>;
  columns = Columns;
  checked: any;
  originalOrder = originalOrder;
  isSmsVisible = false;
  isEditMessageVisible = false;
  isOkLoading = false;
  isSmsAddVisible = false;
  isSmsEditVisible = false;
  selectedSmsTime!: SmstimeModel;
  editDate!: Date;
  newSmsTime = '';
  editMessageText = '';
  editMessageId = 0;
  deleteModal?: NzModalRef;
  policySeries$: Observable<PolicySeriesModel[]>;
  insuredTypes$: Observable<InsuredType[]>;
  branches$: Observable<BranchModel[]>;
  communicationTypes$: Observable<CommunicationTypesModel[]>;
  insuredTypesEnum = {
    p: 1,
    c: 2,
  };
  rolesList = rolesList;
  date = null;
  constructor(
    private facade: Facade,
    private modal: NzModalService,
    private notification: NotificationService,
    private authFacade: AuthFacade
  ) {
    this.smsCheckList$ = this.facade.smsCheckList$;
    this.loading$ = this.facade.loading$;
    this.count$ = this.facade.count$;
    this.currentPage$ = this.facade.currentPage$;
    this.statusList$ = this.facade.getStatusList();
    this.policySeries$ = this.facade.getPolicySeries();
    this.insuredTypes$ = this.facade.getInsuredTypes();
    this.branches$ = this.facade.getBranches().pipe(filter((v) => !!v));
    this.communicationTypes$ = this.facade.getCommunicationTypes();
    this.smsTime$ = this.facade.smsTime$;
  }

  ngOnInit() {
    this.facade.getCustomerSmsCheckList();

    if (this.authFacade.isRoleCorrect(rolesList.SMSTIME_GET)) {
      this.facade.getSmsTime();
    }
  }
  editMessage({ id, message }: { id: number; message: string }) {
    this.isEditMessageVisible = true;
    this.editMessageText = message;
    this.editMessageId = id;
  }
  openSmsEdit(smsTime: SmstimeModel) {
    const { smsDate } = smsTime;
    this.isSmsEditVisible = true;
    this.editDate = new Date(
      new Date(smsDate).setMinutes(
        new Date(smsDate).getMinutes() + new Date(smsDate).getTimezoneOffset()
      )
    );
    this.selectedSmsTime = smsTime;
  }
  closeSmsModal() {
    this.isSmsEditVisible = false;
    this.isSmsAddVisible = false;
    this.isEditMessageVisible = false;
    this.isOkLoading = false;
    this.selectedSmsTime = { id: 0, smsDate: '' };
    this.newSmsTime = '';
    this.editMessageText = '';
    this.editMessageId = 0;
  }
  addSmsTime() {
    this.isOkLoading = true;
    this.facade.addSmsTime(this.newSmsTime).subscribe({
      next: (v) => {
        if (v.code !== 2002) {
          this.notification.show('success', v.message);
        }
        this.facade.getSmsTime();
        this.closeSmsModal();
      },
      error: (v) => {
        this.isOkLoading = false;
      },
    });
  }
  editSmsTime() {
    const id = this.selectedSmsTime.id;
    this.isOkLoading = true;
    const smsDate = this.editDate.toISOString();
    this.facade.editSmsTime({ smsDate, id }).subscribe({
      next: (v) => {
        if (v.code !== 2002) {
          this.notification.show('success', v.message);
        }

        this.facade.getSmsTime();
        this.closeSmsModal();
      },
      error: (v) => {
        this.isOkLoading = false;
      },
    });
  }
  editMessageSubmit() {
    this.isOkLoading = true;
    this.facade
      .editMessage({
        message: this.editMessageText,
        id: this.editMessageId,
      })
      .subscribe({
        next: (v) => {
          if (v.code !== 2002) {
            this.notification.show('success', v.message);
          }

          this.facade.getCustomerSmsCheckList();
          this.closeSmsModal();
        },
        error: (v) => {
          this.isOkLoading = false;
        },
      });
  }
  deleteSmsTime(id: number) {
    this.deleteModal = this.modal.confirm({
      nzTitle: 'Əminsiniz?',
      nzOnOk: () =>
        lastValueFrom(this.facade.deleteSmsTime(id))
          .then((v) => {
            if (v.code !== 2002) {
              this.notification.show('success', v.message);
              this.facade.getSmsTime();
            }
          })
          .catch(() => {}),
    });
  }

  search(key: string): void {
    const searchParam = (this.columns as any)[key];
    searchParam.isSearchVisible = false;
    if (key === 'policyDate' || key === 'debitorDate') {
      this.facade.changeParams(`${key}From`, searchParam.start);
      this.facade.changeParams(`${key}To`, searchParam.end);
      return;
    }
    if (key === 'insureTypeId') {
      this.facade.changeParams(
        key,
        this.insuredTypesEnum[searchParam.searchValue as 'p' | 'c']
      );
      return;
    }
    this.facade.changeParams(key, searchParam.searchValue.toString());
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

  approveAll() {
    this.facade.approveAll().subscribe({
      next: (v) => {
        if (v.code !== 2002) {
          this.notification.show('success', v.message);
          this.facade.getCustomerSmsCheckList();
        }
      },
    });
  }
  cancelAll() {
    this.facade.cancelAll().subscribe({
      next: (v) => {
        if (v.code !== 2002) {
          this.notification.show('success', v.message);
          this.facade.getCustomerSmsCheckList();
        }
      },
    });
  }

  cancelSms() {
    const data = this.checkedItems.map((v) => v.id);
    this.facade.cancel(data).subscribe({
      next: (v) => {
        if (v.code !== 2002) {
          this.notification.show('success', v.message);
          this.facade.getCustomerSmsCheckList();
        }
      },
    });
  }
  approveSms() {
    const data = this.checkedItems.map((v) => v.id);
    this.facade.approve(data).subscribe({
      next: (v) => {
        if (v.code !== 2002) {
          this.notification.show('success', v.message);
          this.facade.getCustomerSmsCheckList();
        }
      },
    });
  }
  itemsChecked(items: SmsCheckListModel[]) {
    this.checkedItems = items;
  }
  showSMSpopup() {
    this.isSmsVisible = true;
  }
  downloadReport(): Observable<string> {
    return this.facade.downloadReport();
  }
  onCreateDateFilterChange(result: Date): void {
    this.facade.changeParams(`createDate`, result.toISOString());
  }
}
