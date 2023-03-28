import { Injectable } from '@angular/core';
import { Selectors } from './selectors';
import { Actions } from './actions';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import {
  CommunicationSettings,
  Envelope,
  NotificationsModel,
} from '../../../models/notifications.model';
import { ApiService } from '../../../store/api.service';
import { MessageTypesModel } from '../../../models/message-types.model';
import { ResponsePayload } from '../../../models/response.model';
import { CommunicationTypesModel } from '../../../models/communication-types.model';
import { ExcelDownloadService } from '../../../shared/excell-report/excel-download.service';
import { BranchModel } from '../../../models/branch.model';
import { PolicySeriesModel } from '../../../models/policy-series.model';

@Injectable()
export class Facade {
  customerNotifications$: Observable<NotificationsModel[]> = this.store.pipe(
    select(Selectors.notifications),
    filter((v) => !!v)
  );
  communicationSettings$: Observable<CommunicationSettings[]> = this.store.pipe(
    select(Selectors.communicationSettings),
    filter((v) => !!v)
  );
  loading$: Observable<boolean> = this.store.pipe(select(Selectors.loading));
  count$: Observable<number> = this.store.pipe(select(Selectors.count));
  params$: Observable<Partial<NotificationsModel>> = this.store.pipe(
    select(Selectors.params)
  );
  currentPage$: Observable<number> = this.store.pipe(
    select(Selectors.currentPage)
  );
  settingsCount$: Observable<number> = this.store.pipe(
    select(Selectors.settingsCount)
  );
  settingsParams$: Observable<Partial<CommunicationSettings>> = this.store.pipe(
    select(Selectors.settingsParams)
  );
  settingsCurrentPage$: Observable<number> = this.store.pipe(
    select(Selectors.settingsCurrentPage)
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

  getCustomerNotifications(): void {
    this.store.dispatch(Actions.getNotifications());
  }
  getCommunicationSettings(): void {
    this.store.dispatch(Actions.getNotificationsSettings());
  }

  changeParams(param: string, value: number | string): void {
    if (!value) {
      this.removeParam(param);
      return;
    }
    this.store.dispatch(Actions.changeNotificationsParams({ param, value }));
  }

  changePage(page: number) {
    this.store.dispatch(Actions.changePagination({ page }));
  }

  removeParam(param: string): void {
    this.store.dispatch(Actions.removeNotificationsParam({ param }));
  }
  //TODO: fix his shitty code
  changeSettingsParams(param: string, value: number | string): void {
    if (!value) {
      this.removeSettingsParam(param);
      return;
    }
    this.store.dispatch(
      Actions.changeNotificationsSettingsParams({ param, value })
    );
  }

  changeSettingsPage(page: number) {
    this.store.dispatch(Actions.changeSettingsPagination({ page }));
  }

  removeSettingsParam(param: string): void {
    this.store.dispatch(Actions.removeNotificationsSettingsParam({ param }));
  }

  getMessageTypes(): Observable<MessageTypesModel[]> {
    return this.api
      .get<ResponsePayload<MessageTypesModel>>('messagetypes')
      .pipe(map((v) => v.data.result));
  }

  getCommunicationTypes(): Observable<CommunicationTypesModel[]> {
    return this.api
      .get<ResponsePayload<CommunicationTypesModel>>('communicationtypes')
      .pipe(map((v) => v.data.result));
  }
  getBranches(): Observable<BranchModel[]> {
    return this.api
      .get<ResponsePayload<BranchModel>>('branches?limit=1000000')
      .pipe(map((v) => v.data.result));
  }
  getPolicySeries(value: string = ''): Observable<PolicySeriesModel[]> {
    let param = '';
    if (value) param = `&Code=${value}`;
    return this.api
      .get<ResponsePayload<PolicySeriesModel>>(
        'policyseries?limit=1000000' + param
      )
      .pipe(map((v) => v.data.result));
  }
  sendMessage(body: Envelope): Observable<any> {
    return this.api.post<ResponsePayload<any>>(
      'notificationhistory/envelope',
      body,
      { responseType: 'blob', observe: 'response' }
    );
  }
  editSettings(body: Partial<CommunicationSettings>): Observable<any> {
    return this.api.put<ResponsePayload<any>>('communicationsettings', body);
  }
  addSettings(body: Partial<CommunicationSettings>): Observable<any> {
    return this.api.post<ResponsePayload<any>>(
      'communicationsettings/bulk',
      body
    );
  }
  deleteSettings(id: number): Observable<any> {
    return this.api.delete<ResponsePayload<any>>('communicationsettings/' + id);
  }

  downloadReport(): Observable<string> {
    return this.excelService.downloadReport(
      'notificationhistory/report',
      this.params$
    );
  }
}
