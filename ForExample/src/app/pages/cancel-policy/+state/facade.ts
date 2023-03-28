import { Injectable } from '@angular/core';
import { Selectors } from './selectors';
import { Actions } from './actions';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import {
  CancellationApprove,
  CancellationIncrease,
  CancellationModel,
} from '../../../models/cancellation.model';
import { ApiService } from '../../../store/api.service';
import { MessageTypesModel } from '../../../models/message-types.model';
import { ResponsePayload } from '../../../models/response.model';
import { CommunicationTypesModel } from '../../../models/communication-types.model';
import { ExcelDownloadService } from '../../../shared/excell-report/excel-download.service';
import { InsuredType } from '../../../models/insured-type.model';
import { CreateTaskModel } from '../../../models/task.model';
import { SmsStatusListModel } from '../../../models/sms-status-list.model';
import { PolicySeriesModel } from '../../../models/policy-series.model';

@Injectable()
export class Facade {
  cancellations$: Observable<CancellationModel[]> = this.store.pipe(
    select(Selectors.cancellations),
    filter((v) => !!v)
  );
  loading$: Observable<boolean> = this.store.pipe(select(Selectors.loading));
  count$: Observable<number> = this.store.pipe(select(Selectors.count));
  params$: Observable<Partial<CancellationModel>> = this.store.pipe(
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

  getCustomerCancellations(): void {
    this.store.dispatch(Actions.getCancellations());
  }

  changeParams(param: string, value: number | string): void {
    if (!value) {
      this.removeParam(param);
      return;
    }
    this.store.dispatch(Actions.changeCancellationsParams({ param, value }));
  }

  changePage(page: number) {
    this.store.dispatch(Actions.changePagination({ page }));
  }

  removeParam(param: string): void {
    this.store.dispatch(Actions.removeCancellationsParam({ param }));
  }

  getInsuredTypes(): Observable<InsuredType[]> {
    return this.api
      .get<ResponsePayload<InsuredType>>('insuredTypes')
      .pipe(map((v) => v.data.result));
  }

  downloadReport(): Observable<string> {
    return this.excelService.downloadReport(
      'cancellation/report',
      this.params$
    );
  }

  createTask(body: CreateTaskModel): Observable<any> {
    return this.api.post<ResponsePayload<any>>('task', body);
  }
  getStatusList(): Observable<any> {
    return this.api.get<ResponsePayload<any>>('task/status');
  }
  getPortfels(insureTypeId: number): Observable<any> {
    return this.api
      .get<ResponsePayload<any>>('task/portfels?InsureTypeId=' + insureTypeId)
      .pipe(map((v) => v.data.result));
  }
  getSubjects(portfelId: number): Observable<any> {
    return this.api
      .get<ResponsePayload<any>>('task/subjects?PortfelId=' + portfelId)
      .pipe(map((v) => v.data.result));
  }
  cancellationIncrease(body: CancellationIncrease): Observable<any> {
    return this.api.post<ResponsePayload<any>>('cancellation/increase', body);
  }
  cancellationApprove(body: CancellationApprove): Observable<any> {
    return this.api.post<ResponsePayload<any>>('cancellation/approve', body);
  }
  getSmsStatusList(): Observable<SmsStatusListModel[]> {
    return this.api
      .get<ResponsePayload<SmsStatusListModel>>('smschecklist/statuslist')
      .pipe(map((v) => v.data.result));
  }
  getPolicySeries(): Observable<PolicySeriesModel[]> {
    return this.api
      .get<ResponsePayload<PolicySeriesModel>>('policyseries?limit=1000000')
      .pipe(map((v) => v.data.result));
  }
}
