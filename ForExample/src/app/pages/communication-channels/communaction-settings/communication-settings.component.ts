import { Component, OnInit, ViewChild } from '@angular/core';
import { Facade } from '../+state/facade';
import { NotificationService } from '../../../shared/notification.service';
import { lastValueFrom, Observable } from 'rxjs';
import {
  CommunicationSettings,
  NotificationsModel,
} from '../../../models/notifications.model';
import { MessageTypesModel } from '../../../models/message-types.model';
import { CommunicationTypesModel } from '../../../models/communication-types.model';
import { BranchModel } from '../../../models/branch.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { PolicySeriesModel } from '../../../models/policy-series.model';
import { Columns } from './columns';
import { originalOrder } from '../../../utils/originalOrder';
import { NgForm } from '@angular/forms';
import { rolesList } from 'src/app/store/auth/roles/rolesList';

@Component({
  templateUrl: 'communication-settings.component.html',
})
export class CommunicationSettingsComponent implements OnInit {
  communicationSettings$: Observable<CommunicationSettings[]>;
  loading$: Observable<boolean>;
  count$: Observable<number>;
  currentPage$: Observable<number>;
  selectedSettingsItem: CommunicationSettings = {} as CommunicationSettings;
  isEditVisible = false;
  isAddVisible = false;
  isOkLoading = false;
  messageTypes$: Observable<MessageTypesModel[]>;
  communicationTypes$: Observable<CommunicationTypesModel[]>;
  branches$: Observable<BranchModel[]>;
  policySeries$: Observable<PolicySeriesModel[]>;
  deleteModal?: NzModalRef;
  params$: Observable<Partial<NotificationsModel>>;
  columns = Columns;
  originalOrder = originalOrder;
  @ViewChild('addSettingsForm') addSettingsForm!: NgForm;
  @ViewChild('editSettingsForm') editSettingsForm!: NgForm;
  rolesList = rolesList;
  constructor(
    private facade: Facade,
    private notification: NotificationService,
    private modal: NzModalService
  ) {
    this.messageTypes$ = this.facade.getMessageTypes();
    this.branches$ = this.facade.getBranches();
    this.communicationTypes$ = this.facade.getCommunicationTypes();
    this.communicationSettings$ = this.facade.communicationSettings$;
    this.loading$ = this.facade.loading$;
    this.count$ = this.facade.settingsCount$;
    this.currentPage$ = this.facade.settingsCurrentPage$;
    this.policySeries$ = this.facade.getPolicySeries();
    this.params$ = this.facade.params$;
  }

  ngOnInit() {
    this.facade.getCommunicationSettings();
  }

  search(key: string): void {
    const searchParam = (this.columns as any)[key];
    searchParam.isSearchVisible = false;
    if (key === 'dayCount') {
      this.facade.changeSettingsParams(`${key}From`, searchParam.min);
      this.facade.changeSettingsParams(`${key}To`, searchParam.max);
      return;
    }
    this.facade.changeSettingsParams(key, searchParam.searchValue);
  }
  resetFilter(key: keyof Columns): void {
    this.columns[key].searchValue = '';
    this.columns[key].min = 0;
    this.columns[key].max = 0;
    this.columns[key].start = '';
    this.columns[key].end = '';
  }

  pageChange(page: number) {
    this.facade.changeSettingsPage(page);
  }
  pageSizeChange(size: number) {
    this.facade.changeSettingsParams('limit', size);
  }

  showEdit(settingsItem: CommunicationSettings) {
    this.selectedSettingsItem = settingsItem;
    this.isEditVisible = true;
  }
  closeModals() {
    this.isEditVisible = false;
    this.isOkLoading = false;
    this.isAddVisible = false;
    this.selectedSettingsItem = {} as CommunicationSettings;
  }
  submitEdit() {
    this.isOkLoading = true;
    this.facade.editSettings(this.selectedSettingsItem).subscribe({
      next: (v) => {
        this.notification.show('success', 'Success');
        this.closeModals();
      },
      error: (v) => {
        this.isOkLoading = false;
      },
    });
  }
  submitAdd() {
    this.isOkLoading = true;
    const body = {
      policySeries: this.selectedSettingsItem.policySeries,
      branchCode: this.selectedSettingsItem.branchCode,
      communicationTypeId: this.selectedSettingsItem.communicationTypeId,
      messageTypeId: this.selectedSettingsItem.messageTypeId,
      dayCount: this.selectedSettingsItem.dayCount,
      communicationText: this.selectedSettingsItem.communicationText,
    };
    this.facade.addSettings(body).subscribe({
      next: (v) => {
        if (v.code !== 2002) {
          this.notification.show('success', 'Success');
          this.facade.getCommunicationSettings();
        }

        this.closeModals();
      },
      error: (v) => {
        this.isOkLoading = false;
      },
    });
  }
  submitDelete(id: number): void {
    this.deleteModal = this.modal.confirm({
      nzTitle: 'Əminsiniz?',
      nzOnOk: () =>
        lastValueFrom(this.facade.deleteSettings(id))
          .then((v) => {
            if (v.code !== 2002) {
              this.notification.show('success', v.message);

              this.facade.getCommunicationSettings();
            }
          })
          .catch(() => {
            this.facade.getCommunicationSettings();
          }),
    });
  }
}
