import { Component, OnDestroy, OnInit } from '@angular/core';
import { Facade, SmstimeModel } from './+state/facade';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from '../../shared/notification.service';
import { Facade as AuthFacade } from '../../store/auth/facade';
import { filter, Observable } from 'rxjs';
import { Columns } from './data/columns';
import * as moment from 'moment';
import { SmsCheckListModel } from '../../models/sms-check-list.model';
import { SmsStatusListModel } from '../../models/sms-status-list.model';
import { PolicySeriesModel } from '../../models/policy-series.model';
import { InsuredType } from '../../models/insured-type.model';
import { BranchModel } from '../../models/branch.model';
import { CommunicationTypesModel } from '../../models/communication-types.model';
import { originalOrder } from 'src/app/utils/originalOrder';
import { rolesList } from 'src/app/store/auth/roles/rolesList';

@Component({
  selector: 'app-failed-notifications',
  template: `
    <div style="margin-bottom: 20px" class="flex-wide">
      <nz-breadcrumb nzSeparator=">">
        <nz-breadcrumb-item
          ><a routerLink="/debitor"
            ><i nz-icon nzType="home" nzTheme="outline"></i></a
        ></nz-breadcrumb-item>
        <nz-breadcrumb-item
          ><a routerLink="/sms-check-list"
            >Bildiriş Təsdiq</a
          ></nz-breadcrumb-item
        >
        <nz-breadcrumb-item>Xətalı bildirişlər</nz-breadcrumb-item>
      </nz-breadcrumb>
      <div>
        <button
          nz-button
          (click)="approveSms()"
          *ngIf="checkedItems.length"
          style="margin-left: 20px"
        >
          Yenidən göndər
        </button>
      </div>
    </div>
    <ng-container *ngIf="!(loading$ | async)">
      <ng-container *ngIf="smsCheckList$ | async as data">
        <app-sms-table
          [isFailedNotification]="true"
          [listOfData]="data"
          [count]="(count$ | async)!"
          [currentPage]="(currentPage$ | async)!"
          [columns]="columns"
          [statusList]="(statusList$ | async)!"
          [policySeries]="(policySeries$ | async)!"
          [insuredTypes]="(insuredTypes$ | async)!"
          [branches]="(branches$ | async)!"
          [communicationTypes]="(communicationTypes$ | async)!"
          (onEditMessage)="editMessage($event)"
          (checkedItems)="itemsChecked($event)"
          (searchKey)="search($event)"
          (resetKey)="resetFilter($event)"
          (pageChange)="pageChange($event)"
          (pageSizeChange)="pageSizeChange($event)"
        ></app-sms-table> </ng-container
    ></ng-container>
    <nz-skeleton *ngIf="loading$ | async" [nzActive]="true"></nz-skeleton>
    <nz-modal
      [(nzVisible)]="isEditMessageVisible"
      (nzOnCancel)="closeSmsModal()"
      [nzOkLoading]="isOkLoading"
      (nzOnOk)="editMessageSubmit()"
      nzTitle="Göndəriləcək mesaj redaktə"
    >
      <div *nzModalContent>
        <p>
          Göndəriləcək mesaj:
          <textarea
            style="margin-top: 10px"
            nz-input
            [(ngModel)]="editMessageText"
            [nzAutosize]="{ minRows: 2, maxRows: 6 }"
          ></textarea>
        </p>
      </div>
    </nz-modal>
  `,
  styles: [],
})
export class FailedNotificationsComponent implements OnInit, OnDestroy {
  smsCheckList$: Observable<SmsCheckListModel[]>;
  loading$: Observable<boolean>;
  count$: Observable<number>;
  currentPage$: Observable<number>;
  statusList$: Observable<SmsStatusListModel[]>;
  checkedItems: SmsCheckListModel[] = [];
  columns = Columns;
  policySeries$: Observable<PolicySeriesModel[]>;
  insuredTypes$: Observable<InsuredType[]>;
  branches$: Observable<BranchModel[]>;
  communicationTypes$: Observable<CommunicationTypesModel[]>;
  insuredTypesEnum = {
    p: 1,
    c: 2,
  };
  rolesList = rolesList;
  isOkLoading = false;
  isEditMessageVisible = false;
  editMessageText = '';
  editMessageId = 0;
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
  }

  ngOnInit() {
    this.facade.getCustomerFailedNotifications();

    if (this.authFacade.isRoleCorrect(rolesList.SMSTIME_GET)) {
      this.facade.getSmsTime();
    }
  }
  ngOnDestroy() {
    this.facade.changeParams('errorOnSent', '');
  }

  itemsChecked(items: SmsCheckListModel[]) {
    this.checkedItems = items;
  }
  approveSms() {
    const data = this.checkedItems.map((v) => v.id);
    this.facade.resendFailedMessages(data).subscribe({
      next: (v) => {
        if (v.code !== 2002) {
          this.notification.show('success', v.message);
          this.facade.getCustomerSmsCheckList();
        }
      },
    });
  }
  editMessage({ id, message }: { id: number; message: string }) {
    this.isEditMessageVisible = true;
    this.editMessageText = message;
    this.editMessageId = id;
  }
  closeSmsModal() {
    this.isEditMessageVisible = false;
    this.isOkLoading = false;
    this.editMessageText = '';
    this.editMessageId = 0;
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
}
