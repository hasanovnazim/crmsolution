import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Selectors } from './selectors';
import { ApiService } from '../../../store/api.service';
import { ExcelDownloadService } from '../../../shared/excell-report/excel-download.service';
import { Actions } from './actions';
import { SmsCheckListModel } from '../../../models/sms-check-list.model';
import { CancellationIncrease } from '../../../models/cancellation.model';
import { ResponsePayload } from '../../../models/response.model';
import { SmsStatusListModel } from '../../../models/sms-status-list.model';
import { InsuredType } from '../../../models/insured-type.model';
import { BranchModel } from '../../../models/branch.model';
import { CommunicationTypesModel } from '../../../models/communication-types.model';
import { PolicySeriesModel } from '../../../models/policy-series.model';

export interface SmstimeModel {
  id: number;
  smsDate: string;
}

@Injectable()
export class Facade {
  smsCheckList$: Observable<SmsCheckListModel[]> = this.store.pipe(
    select(Selectors.smsCheckList),
    filter((v) => !!v)
  );
  loading$: Observable<boolean> = this.store.pipe(select(Selectors.loading));
  count$: Observable<number> = this.store.pipe(select(Selectors.count));
  params$: Observable<Partial<SmsCheckListModel>> = this.store.pipe(
    select(Selectors.params)
  );
  currentPage$: Observable<number> = this.store.pipe(
    select(Selectors.currentPage)
  );
  error$: Observable<any> = this.store.pipe(
    select(Selectors.error),
    filter((v) => !!v)
  );
  private smstime = new BehaviorSubject<SmstimeModel[]>([]);
  smsTime$: Observable<SmstimeModel[]> = this.smstime.asObservable();

  constructor(
    private store: Store<any>,
    private api: ApiService,
    private excelService: ExcelDownloadService
  ) {}

  getCustomerSmsCheckList(): void {
    this.store.dispatch(Actions.getSmsCheckList());
  }

  getCustomerFailedNotifications(): void {
    this.store.dispatch(
      Actions.changeSmsCheckListParams({ param: 'errorOnSent', value: true })
    );
  }

  changeParams(param: string, value: number | string): void {
    if (!value) {
      this.removeParam(param);
      return;
    }
    this.store.dispatch(Actions.changeSmsCheckListParams({ param, value }));
  }

  changePage(page: number) {
    this.store.dispatch(Actions.changePagination({ page }));
  }

  removeParam(param: string): void {
    this.store.dispatch(Actions.removeSmsCheckListParam({ param }));
  }

  downloadReport(): Observable<string> {
    return this.excelService.downloadReport(
      'smschecklist/report',
      this.params$
    );
  }

  getStatusList(): Observable<SmsStatusListModel[]> {
    return this.api
      .get<ResponsePayload<SmsStatusListModel>>('smschecklist/statuslist')
      .pipe(map((v) => v.data.result));
  }
  cancel(body: number[]): Observable<any> {
    return this.api.post<ResponsePayload<any>>('smschecklist/cancell', body);
  }
  approve(body: number[]): Observable<any> {
    return this.api.post<ResponsePayload<any>>('smschecklist/approve', body);
  }
  resendFailedMessages(body: number[]): Observable<any> {
    return this.api.post<ResponsePayload<any>>(
      'smschecklist/resendFailedMessages',
      body
    );
  }
  approveAll(): Observable<any> {
    return this.api.post<ResponsePayload<any>>('smschecklist/approveAll', {});
  }
  cancelAll(): Observable<any> {
    return this.api.post<ResponsePayload<any>>('smschecklist/cancellAll', {});
  }
  editMessage({
    message,
    id,
  }: {
    id: number;
    message: string;
  }): Observable<any> {
    return this.api.put<ResponsePayload<any>>('smschecklist', { id, message });
  }

  getSmsTime() {
    this.api
      .get<ResponsePayload<SmstimeModel>>('smstime')
      .pipe(map((v) => v.data.result))
      .subscribe((v) => {
        this.smstime.next(v);
      });
  }

  addSmsTime(smsDate: string): Observable<any> {
    return this.api.post<ResponsePayload<any>>('smstime', { smsDate });
  }

  editSmsTime(smsTime: SmstimeModel): Observable<any> {
    return this.api.put<ResponsePayload<any>>('smstime', smsTime);
  }

  deleteSmsTime(id: number): Observable<any> {
    return this.api.delete<ResponsePayload<any>>('smstime/' + id);
  }
  getBranches(): Observable<BranchModel[]> {
    return this.api
      .get<ResponsePayload<BranchModel>>('branches')
      .pipe(map((v) => v.data.result));
  }
  getCommunicationTypes(): Observable<CommunicationTypesModel[]> {
    return this.api
      .get<ResponsePayload<CommunicationTypesModel>>('communicationtypes')
      .pipe(map((v) => v.data.result));
  }
  getPolicySeries(): Observable<PolicySeriesModel[]> {
    return this.api
      .get<ResponsePayload<PolicySeriesModel>>('policyseries?limit=1000000')
      .pipe(map((v) => v.data.result));
  }
  getInsuredTypes(): Observable<InsuredType[]> {
    return this.api
      .get<ResponsePayload<InsuredType>>('insuredTypes')
      .pipe(map((v) => v.data.result));
  }
}
