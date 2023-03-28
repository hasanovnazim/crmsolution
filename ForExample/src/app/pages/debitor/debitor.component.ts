import { Component, OnInit } from '@angular/core';
import { Facade } from './+state/facade';
import { DebitorModel } from '../../models/debitor.model';
import { Columns, columns } from './data/columns';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable, tap, withLatestFrom } from 'rxjs';
import { PageModel } from '../../models/page.model';
import * as moment from 'moment';
import { BranchModel } from '../../models/branch.model';
import { PolicySeriesModel } from '../../models/policy-series.model';
import { CurrenyModel } from '../../models/curreny.model';
import { InsuredType } from '../../models/insured-type.model';
import { InsuredTypeEnum } from './data/insuredType.enum';
import { IfrsModel } from '../../models/Ifrs.model';
import { rolesList } from '../../store/auth/roles/rolesList';
import { endOfMonth, subDays } from 'date-fns';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-debitor',
  templateUrl: './debitor.component.html',
  styleUrls: ['./debitor.component.scss'],
})
export class DebitorComponent implements OnInit {
  tabIndex = 0;
  columns = columns;
  loading$: Observable<boolean>;
  debitors$: Observable<DebitorModel[]>;
  count$: Observable<number>;
  currentPage$: Observable<number>;
  pages$: Observable<PageModel[]>;
  selectedPage$: Observable<number>;
  branches$: Observable<BranchModel[]>;
  policySeries$: Observable<PolicySeriesModel[]>;
  currencies$: Observable<CurrenyModel[]>;
  insuredTypes$: Observable<InsuredType[]>;
  ifrs$: Observable<IfrsModel[]>;
  insuredTypesEnum = {
    p: 1,
    c: 2,
  };
  HasNewPayment = false;
  Cancelled = false;
  IsChanged = false;
  params$: Observable<Partial<DebitorModel>>;
  rolesList = rolesList;
  ranges = {
    'Cari gün': [new Date(), new Date()],
    'Son 7 gün': [subDays(new Date(), 7), new Date()],
    'Son 30 gün': [subDays(new Date(), 30), new Date()],
  };
  constructor(private debitorsFacade: Facade) {
    this.loading$ = this.debitorsFacade.loading$;
    this.count$ = this.debitorsFacade.count$;
    this.debitors$ = this.debitorsFacade.debitors$;
    this.currentPage$ = this.debitorsFacade.currentPage$;
    this.pages$ = this.debitorsFacade.pages$;
    this.branches$ = this.debitorsFacade.branches$;
    this.policySeries$ = this.debitorsFacade.policySeries$;
    this.currencies$ = this.debitorsFacade.currencies$;
    this.insuredTypes$ = this.debitorsFacade.insuredTypes$;
    this.ifrs$ = this.debitorsFacade.ifrs$;
    this.params$ = this.debitorsFacade.params$;
    this.selectedPage$ = this.debitorsFacade.selectedTab$;
  }
  objectKeys = Object.keys;
  ngOnInit(): void {
    this.debitorsFacade.getPages();
    this.debitorsFacade.getApiFilters('branchName');
    this.debitorsFacade.getApiFilters('policySeries');
    this.debitorsFacade.getApiFilters('currencyId');
    this.debitorsFacade.getApiFilters('insuredTypes');
    this.debitorsFacade.getApiFilters('ifrs');
    this.debitorsFacade.getDebitors();
    this.selectedPage$
      .pipe(untilDestroyed(this), withLatestFrom(this.params$))
      .subscribe(([selectedTab, params]) => {
        this.tabIndex = selectedTab + 1;
        this.updateFiltersByPage(params);
      });
  }

  topFilterChange(value: boolean, key: string): void {
    this.debitorsFacade.changeParams(key, value);
  }

  resetFilter(key: keyof Columns): void {
    this.columns[key].searchValue = '';
    this.columns[key].min = 0;
    this.columns[key].max = 0;
    this.columns[key].start = '';
    this.columns[key].end = '';
    this.debitorsFacade.changeParams(key, '');
  }

  getInsuredType(type: 'c' | 'p'): string {
    return InsuredTypeEnum[type];
  }

  searchByApi(value: string, searchKey: string): void {
    if (!value) this.resetFilter(searchKey as keyof Columns);
    if (!searchKey || value.length < 3) return;

    this.debitorsFacade.getApiFilters(searchKey, value);
  }

  search(key: string): void {
    const searchParam = (this.columns as any)[key];
    searchParam.isSearchVisible = false;
    if (
      key === 'lastEndDate' ||
      key === 'firstStartDate' ||
      key === 'DebitorDate' ||
      key === 'policyDate'
    ) {
      this.debitorsFacade.changeParams(`${key}From`, searchParam.start);
      this.debitorsFacade.changeParams(`${key}To`, searchParam.end);
      return;
    }

    if (
      key === 'paidSumAzn' ||
      key === 'paidEdSumAzn' ||
      key === 'paidSumCurr' ||
      key === 'policyDebtSum' ||
      key === 'policyDebtSumAzn' ||
      key === 'premium' ||
      key === 'premiumAzn' ||
      key === 'expiredDebtTotal' ||
      key === 'instSumTotalFw' ||
      key === 'expiredDebt30' ||
      key === 'expiredDebt60' ||
      key === 'expiredDebt90' ||
      key === 'expiredDebt180' ||
      key === 'expiredDebt181' ||
      key === 'instSum15Fw' ||
      key === 'instSum30Fw' ||
      key === 'instSum15Fw'
    ) {
      if (this.columns[key].min || this.columns[key].max) {
        this.columns[
          key
        ].searchValue = `${this.columns[key].min}-${this.columns[key].max}`;
        this.debitorsFacade.changeParams(`${key}From`, this.columns[key].min);
        this.debitorsFacade.changeParams(`${key}To`, this.columns[key].max);
        return;
      } else {
        this.debitorsFacade.removeParam(`${key}From`);
        this.debitorsFacade.removeParam(`${key}To`);
      }
    }
    this.debitorsFacade.changeParams(key, searchParam.searchValue);
  }
  getColumnsKeys = <T>(obj: T) => Object.keys(obj) as Array<keyof T>;
  selectPage(id: number) {
    this.tabIndex = id;
    this.debitorsFacade.changeDebitorTab(id);
  }
  pageChange(page: number) {
    this.debitorsFacade.changePage(page);
  }
  pageSizeChange(size: number) {
    this.debitorsFacade.changeParams('limit', size);
  }
  onDateFilter(result: Date[], colName: keyof Columns): void {
    this.columns[colName].start = moment(result[0]).format('DD.MM.YYYY');
    this.columns[colName].end = moment(result[1]).format('DD.MM.YYYY');
    if (colName === 'DebitorDate') {
      this.search('DebitorDate');
    }
  }

  downloadReport(): Observable<string> {
    return this.debitorsFacade.downloadReport();
  }

  removeAllParams() {
    this.getColumnsKeys(this.columns).forEach((v) => {
      this.columns[v].searchValue = '';
    });
    this.debitorsFacade.removeAllParam();
  }

  private updateFiltersByPage(params: Partial<DebitorModel>): void {
    this.getColumnsKeys(this.columns).forEach((k) => {
      const isMinMaxParam = Object.keys(params).find(
        (v) => v.includes('From') && v.includes(k)
      );
      const isDateRange = Object.keys(params).find(
        (v) => v.includes('Date') && v.includes(k)
      );
      if (k in params || isMinMaxParam) {
        let searchValue = isMinMaxParam
          ? `${k}From=${(params as any)[k + 'From']} - ${k}From=${
              (params as any)[k + 'To']
            }`
          : (params[k] as string);
        const min = isMinMaxParam ? Number((params as any)[k + 'From']) : 0;
        const max = isMinMaxParam ? Number((params as any)[k + 'To']) : 0;
        const start = isDateRange ? new Date((params as any)[k + 'From']) : '';
        const end = isDateRange ? new Date((params as any)[k + 'To']) : '';
        if (isDateRange) {
          searchValue = [start, end] as any;
        }
        this.columns[k] = {
          ...this.columns[k],
          searchValue,
          min,
          max,
          start: start as string,
          end: end as string,
        };
      } else {
        this.columns[k] = {
          ...this.columns[k],
          searchValue: '',
          min: 0,
          max: 0,
          start: '',
          end: '',
        };
      }
    });
  }
}
