import { Component, OnInit } from '@angular/core';
import { Facade } from './+state/facade';
import { Observable, of } from 'rxjs';
import { Envelope, NotificationsModel } from '../../models/notifications.model';
import { Columns } from './data/columns';
import { MessageTypesModel } from '../../models/message-types.model';
import { NotificationService } from '../../shared/notification.service';
import { CommunicationTypesModel } from '../../models/communication-types.model';
import { PolicySeriesModel } from '../../models/policy-series.model';
import { rolesList } from '../../store/auth/roles/rolesList';

@Component({
  templateUrl: './communication-channels.component.html',
})
export default class CommunicationChannelsComponent implements OnInit {
  notificationsHistory$: Observable<NotificationsModel[]>;
  loading$: Observable<boolean>;
  count$: Observable<number>;
  currentPage$: Observable<number>;
  checkedItems: NotificationsModel[] = [];
  isSendMessageModalVisible = false;
  isSendMessageOkLoading = false;
  messageTypes$: Observable<MessageTypesModel[]>;
  communicationTypes$: Observable<CommunicationTypesModel[]>;
  selectedMessageType = 1;
  envelopeNumber = '';
  columns = Columns;
  params$: Observable<Partial<NotificationsModel>>;
  rolesList = rolesList;
  constructor(
    private facade: Facade,
    private notification: NotificationService
  ) {
    this.notificationsHistory$ = this.facade.customerNotifications$;
    this.loading$ = this.facade.loading$;
    this.count$ = this.facade.count$;
    this.currentPage$ = this.facade.currentPage$;
    this.messageTypes$ = this.facade.getMessageTypes();
    this.communicationTypes$ = this.facade.getCommunicationTypes();

    this.params$ = this.facade.params$;
  }

  ngOnInit() {
    this.facade.getCustomerNotifications();
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
    if (key === 'notificationDate' || key === 'policyDate') {
      this.facade.changeParams(`${key}From`, this.columns[key].start);
      this.facade.changeParams(`${key}To`, this.columns[key].end);
      return;
    }
    this.facade.changeParams(key, searchParam.searchValue);
  }

  itemsChecked(items: NotificationsModel[]) {
    this.checkedItems = items;
  }

  pageChange(page: number) {
    this.facade.changePage(page);
  }
  pageSizeChange(size: number) {
    this.facade.changeParams('limit', size);
  }

  toggleSendMessageModalVisible(): void {
    this.isSendMessageModalVisible = !this.isSendMessageModalVisible;
  }

  sendMessage() {
    const body: Envelope = {
      policyList: this.checkedItems.map((item) => ({
        policyId: item.policyId,
        insureTypeId: item.insureTypeId,
      })),
      envelopeNumber: Number(this.envelopeNumber),
      messageType: this.selectedMessageType,
    };
    this.isSendMessageOkLoading = true;
    this.facade.sendMessage(body).subscribe({
      next: (v) => {
        this.toggleSendMessageModalVisible();
        this.notification.show('success', 'Success');
        this.facade.getCustomerNotifications();
        this.isSendMessageOkLoading = false;
        this.selectedMessageType = 1;
        this.envelopeNumber = '';
        const file = new Blob([v.body], { type: 'application/pdf' });

        var downloadURL = window.URL.createObjectURL(file);
        var link = document.createElement('a');
        link.href = downloadURL;
        const contentDisposition = v.headers.get('Content-Disposition');
        link.download = decodeURIComponent(
          contentDisposition
            .split(';')[2]
            .replace("filename*=UTF-8''", '')
            .replace('"', '')
            .replace('"', '')
            .trim()
        );
        link.click();
      },
      error: () => {
        this.isSendMessageOkLoading = false;
      },
    });
  }
  downloadReport(): Observable<string> {
    return this.facade.downloadReport();
  }
}
