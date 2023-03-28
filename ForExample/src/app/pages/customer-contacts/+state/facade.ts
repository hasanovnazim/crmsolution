import { Injectable } from '@angular/core';
import { Selectors } from './selectors';
import {
  CustomerAdd,
  CustomerContactsModel,
  CustomerEdit,
} from '../../../models/customer-contacts.model';
import { Actions } from './actions';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { ApiService } from '../../../store/api.service';
import { InsuredType } from '../../../models/insured-type.model';
import { ResponsePayload } from '../../../models/response.model';
import { ExcelDownloadService } from '../../../shared/excell-report/excel-download.service';
import { PolicySeriesModel } from '../../../models/policy-series.model';

@Injectable()
export class Facade {
  customerContacts$: Observable<CustomerContactsModel[]> = this.store.pipe(
    select(Selectors.contacts),
    filter((v) => !!v)
  );
  loading$: Observable<boolean> = this.store.pipe(select(Selectors.loading));
  count$: Observable<number> = this.store.pipe(select(Selectors.count));
  params$: Observable<Partial<CustomerContactsModel>> = this.store.pipe(
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

  getCustomerContacts(): void {
    this.store.dispatch(Actions.getContacts());
  }

  changeParams(param: string, value: number | string): void {
    if (!value) {
      this.removeParam(param);
      return;
    }
    this.store.dispatch(Actions.changeContactsParams({ param, value }));
  }

  changePage(page: number) {
    this.store.dispatch(Actions.changePagination({ page }));
  }

  removeParam(param: string): void {
    this.store.dispatch(Actions.removeContactsParam({ param }));
  }
  public addContact(body: CustomerAdd): Observable<any> {
    return this.api.post('contacts', body);
  }
  public editContact(body: CustomerEdit): Observable<any> {
    return this.api.put('contacts', body);
  }

  public getCommunicationDetails(policySeries: string): Observable<any> {
    return this.api.get('communicationsettings?policySeries=' + policySeries);
  }

  //TODO: Move getInsuredTypes to shared NGRX store
  public getInsuredTypes(): Observable<InsuredType[]> {
    return this.api
      .get<ResponsePayload<InsuredType>>('insuredTypes')
      .pipe(map((v) => v.data.result));
  }

  downloadReport(): Observable<string> {
    return this.excelService.downloadReport('contacts/report', this.params$);
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
}
