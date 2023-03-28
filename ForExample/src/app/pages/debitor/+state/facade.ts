import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  filter,
  map,
  Observable,
  of,
  skip,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { selectedTab, Selectors } from './selectors';
import { DebitorModel } from '../../../models/debitor.model';
import { Actions } from './actions';
import { PageModel } from '../../../models/page.model';
import { BranchModel } from '../../../models/branch.model';
import { PolicySeriesModel } from '../../../models/policy-series.model';
import { CurrenyModel } from '../../../models/curreny.model';
import { InsuredType } from '../../../models/insured-type.model';
import { DebitorDetails } from '../../../models/debitor-details.model';
import {
  AddComment,
  DebitorCommentsModel,
} from '../../../models/debitor-comments.model';
import { ResponsePayload } from '../../../models/response.model';
import { ApiService } from '../../../store/api.service';
import { ExcelDownloadService } from '../../../shared/excell-report/excel-download.service';
import { environment } from '../../../../environments/environment';
import { IfrsModel } from '../../../models/Ifrs.model';

@Injectable()
export class Facade {
  constructor(
    private store: Store<any>,
    private excelService: ExcelDownloadService,
    private api: ApiService
  ) {}

  debitors$: Observable<DebitorModel[]> = this.store.pipe(
    select(Selectors.debitors),
    filter((v) => !!v)
  );
  params$: Observable<Partial<DebitorModel>> = this.store.pipe(
    select(Selectors.params)
  );
  selectedTab$: Observable<number> = this.store.pipe(
    select(Selectors.selectedTab)
  );
  pages$: Observable<PageModel[]> = this.store.pipe(
    select(Selectors.pages),
    filter((v) => !!v)
  );
  selectedPage$: Observable<number> = this.pages$.pipe(
    withLatestFrom(this.params$),
    map(([pages, params]) => {
      return pages.findIndex((v) => v.id === params.pageId);
    }),
    filter((v) => !!v)
  );
  branches$: Observable<BranchModel[]> = this.store.pipe(
    select(Selectors.branches),
    filter((v) => !!v)
  );
  policySeries$: Observable<PolicySeriesModel[]> = this.store.pipe(
    select(Selectors.policySeries),
    filter((v) => !!v)
  );
  currencies$: Observable<CurrenyModel[]> = this.store.pipe(
    select(Selectors.currencies),
    filter((v) => !!v)
  );
  insuredTypes$: Observable<InsuredType[]> = this.store.pipe(
    select(Selectors.insuredTypes),
    filter((v) => !!v)
  );
  ifrs$: Observable<IfrsModel[]> = this.store.pipe(
    select(Selectors.ifrs),
    filter((v) => !!v)
  );
  debitorComments$: Observable<DebitorCommentsModel[]> = this.store.pipe(
    select(Selectors.debitorComments),
    filter((v) => !!v)
  );

  loading$: Observable<boolean> = this.store.pipe(select(Selectors.loading));
  count$: Observable<number> = this.store.pipe(select(Selectors.count));
  currentPage$: Observable<number> = this.store.pipe(
    select(Selectors.currentPage)
  );
  debitorDetails$: Observable<DebitorDetails[]> = this.store.pipe(
    select(Selectors.debitorDetails),
    filter((v) => !!v)
  );

  error$: Observable<any> = this.store.pipe(
    select(Selectors.error),
    filter((v) => !!v)
  );

  getDebitors(): void {
    this.store.dispatch(Actions.getDebitors());
  }
  getPages(): void {
    this.store.dispatch(Actions.getPages());
  }
  getApiFilters(key: string, value: string | number = ''): void {
    switch (key) {
      case 'branchName':
        this.store.dispatch(
          Actions.getBranchs({ branchName: value as string })
        );
        break;
      case 'policySeries':
        this.store.dispatch(
          Actions.getPolicySeries({ policySeries: value as string })
        );
        break;
      case 'currencyId':
        this.store.dispatch(
          Actions.getCurrencies({ currencyCode: value as string })
        );
        break;
      case 'insuredTypes':
        this.store.dispatch(Actions.getInsuredTypes());
        break;
      case 'ifrs':
        this.store.dispatch(Actions.getIfrs());
        break;
      default:
        return;
    }
  }

  changeDebitorTab(selectedTab: number): void {
    this.store.dispatch(Actions.changeDebitorTab({ selectedTab }));
  }
  changeParams(param: string, value: number | string | boolean): void {
    if (!value) {
      this.removeParam(param);
      return;
    }
    this.store.dispatch(Actions.changeDebitorParams({ param, value }));
  }

  removeParam(param: string): void {
    this.store.dispatch(Actions.removeDebitorParam({ param }));
  }
  removeAllParam(): void {
    this.store.dispatch(Actions.removeAllDebitorParam());
  }

  changePage(page: number) {
    this.store.dispatch(Actions.changePagination({ page }));
  }

  getDebitorDetails(insureTypeId: number, insuredId: number): void {
    this.store.dispatch(Actions.getDebitorDetails({ insureTypeId, insuredId }));
  }
  increaseDebitorCancellation(
    isInstallment: boolean,
    dayCount: number,
    installId: number,
    addId: number,
    policyId: number,
    insureTypeId: number
  ): void {
    this.store.dispatch(
      Actions.debitorCancellationIncrease({
        isInstallment,
        dayCount,
        installId,
        addId,
        policyId,
        insureTypeId,
      })
    );
  }

  downloadReport(): Observable<string> {
    return this.excelService.downloadReport('debitors/report', this.params$);
  }

  getDebitorComments(insureTypeId: number, policyId: number): void {
    this.store.dispatch(Actions.getDebitorComments({ insureTypeId, policyId }));
  }

  createComment(body: AddComment): Observable<any> {
    return this.api.post<ResponsePayload<any>>('comments', body);
  }

  invoiceDownloadUrl(invoiceId: number): string {
    return `${environment.baseUrl}/api/${environment.apiVersion}/debitordetails/invoice?InvoiceId=${invoiceId}`;
  }
}
