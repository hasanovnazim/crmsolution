import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Columns } from '../data/columns';
import * as moment from 'moment';
import { originalOrder } from 'src/app/utils/originalOrder';
import { SmsCheckListModel } from '../../../models/sms-check-list.model';
import { SmsStatusListModel } from '../../../models/sms-status-list.model';
import { BinaryEnum } from '../../../enums/binary.enum';
import { Facade } from '../+state/facade';
import { PolicySeriesModel } from '../../../models/policy-series.model';
import { CommunicationTypesModel } from '../../../models/communication-types.model';
import { BranchModel } from '../../../models/branch.model';
import { InsuredType } from '../../../models/insured-type.model';

@Component({
  selector: 'app-sms-table',
  template: `
    <nz-table
      #rowSelectionTable
      [nzShowPagination]="false"
      [nzFrontPagination]="false"
      nzShowSizeChanger
      [nzData]="listOfData"
      (nzCurrentPageDataChange)="onCurrentPageDataChange($event)"
    >
      <thead>
        <tr>
          <th
            [nzChecked]="checked"
            [nzIndeterminate]="indeterminate"
            (nzCheckedChange)="onAllChecked($event)"
          ></th>
          <ng-container *ngFor="let col of columns | keyvalue: originalOrder">
            <th
              [nzCustomFilter]="!col.value.hasNotFilter"
              *ngIf="col.value.name !== 'errorMessage' || isFailedNotification"
            >
              {{ col.value.displayName }}
              <nz-filter-trigger
                [(nzVisible)]="col.value.isSearchVisible"
                [nzActive]="col.value.searchValue.length > 0"
                [nzDropdownMenu]="filter"
              >
                <i nz-icon nzType="search"></i>
              </nz-filter-trigger>

              <nz-dropdown-menu #filter="nzDropdownMenu">
                <div class="ant-table-filter-dropdown">
                  <form (submit)="search(col.value.name)" class="search-box">
                    <input
                      *ngIf="col.value.isText"
                      type="text"
                      nz-input
                      placeholder="Search name"
                      [(ngModel)]="col.value.searchValue"
                      [name]="col.value.name"
                    />
                    <nz-range-picker
                      *ngIf="col.value.isDate"
                      [(ngModel)]="col.value.searchValue"
                      [name]="col.value.name"
                      (ngModelChange)="onDateFilter($event, col.value.name)"
                    ></nz-range-picker>
                    <div class="min-max" *ngIf="col.value.isRange">
                      <label
                        >Min
                        <input
                          type="number"
                          nz-input
                          placeholder="Min"
                          [(ngModel)]="col.value.min"
                          [name]="col.value.name + 'min'"
                      /></label>

                      <label>
                        Max
                        <input
                          type="number"
                          nz-input
                          placeholder="Max"
                          [(ngModel)]="col.value.max"
                          [name]="col.value.name + 'max'"
                        />
                      </label>
                    </div>
                    <nz-select
                      nzShowSearch
                      [(ngModel)]="col.value.searchValue"
                      [name]="col.value.name"
                      [nzShowArrow]="true"
                      *ngIf="col.value.name === 'branchCode'"
                      (ngModelChange)="search('branchCode')"
                    >
                      <nz-option
                        *ngFor="let b of branches"
                        [nzLabel]="b.branchName"
                        [nzValue]="b.branchCode"
                      ></nz-option>
                    </nz-select>
                    <nz-select
                      nzShowSearch
                      [(ngModel)]="col.value.searchValue"
                      [name]="col.value.name"
                      [nzShowArrow]="true"
                      *ngIf="col.value.name === 'policySeries'"
                      (ngModelChange)="search('policySeries')"
                    >
                      <nz-option
                        *ngFor="let b of policySeries"
                        [nzLabel]="b.code"
                        [nzValue]="b.code"
                      ></nz-option>
                    </nz-select>
                    <nz-select
                      nzShowSearch
                      [(ngModel)]="col.value.searchValue"
                      [name]="col.value.name"
                      [nzShowArrow]="true"
                      *ngIf="col.value.name === 'communicationTypeId'"
                      (ngModelChange)="search('communicationTypeId')"
                    >
                      <nz-option
                        *ngFor="let b of communicationTypes"
                        [nzLabel]="b.name"
                        [nzValue]="b.id"
                      ></nz-option>
                    </nz-select>
                    <nz-select
                      nzShowSearch
                      [(ngModel)]="col.value.searchValue"
                      [name]="col.value.name"
                      [nzShowArrow]="true"
                      *ngIf="col.value.name === 'insureTypeId'"
                      (ngModelChange)="search('insureTypeId')"
                    >
                      <nz-option
                        *ngFor="let b of insuredTypes"
                        [nzLabel]="b.description"
                        [nzValue]="b.type"
                      ></nz-option>
                    </nz-select>
                    <nz-select
                      nzShowSearch
                      [(ngModel)]="col.value.searchValue"
                      [name]="col.value.name"
                      [nzShowArrow]="true"
                      *ngIf="col.value.name === 'hasProblem'"
                      (ngModelChange)="search('hasProblem')"
                    >
                      <nz-option
                        [nzLabel]="'Bəli'"
                        [nzValue]="true"
                      ></nz-option>
                      <nz-option
                        [nzLabel]="'Xeyr'"
                        [nzValue]="false"
                      ></nz-option>
                    </nz-select>
                    <button
                      nz-button
                      nzSize="small"
                      nzType="primary"
                      (click)="search(col.value.name)"
                      class="search-button"
                      type="submit"
                    >
                      Search
                    </button>
                    <button
                      nz-button
                      nzSize="small"
                      (click)="resetFilter(col.value.name)"
                    >
                      Reset
                    </button>
                  </form>
                </div>
              </nz-dropdown-menu>
            </th>
          </ng-container>
        </tr>
      </thead>
      <tbody>
        <tr
          *ngFor="let data of rowSelectionTable.data"
          [ngClass]="{ 'has-problem': data.hasProblem }"
        >
          <td
            [nzChecked]="setOfCheckedId.has(data.id)"
            (nzCheckedChange)="onItemChecked(data.id, $event)"
          ></td>
          <td>{{ data.policySeries }}</td>
          <td>{{ data.policyNumber }}</td>
          <td>
            <a [href]="data.protechUrl" target="_blank">{{
              data.fullPolicyNumber
            }}</a>
          </td>
          <td>{{ data.policyDate | date: 'dd.MM.yyyy' }}</td>
          <td>{{ getBranchName(data.branchCode, branches!) }}</td>
          <td>{{ data.debt }}</td>
          <td
            *ngIf="isFailedNotification"
            nz-tooltip
            [nzTooltipTitle]="data.errorMessage"
          >
            {{ data.errorMessage }}
          </td>
          <td>{{ data.dayCount }}</td>
          <td>
            {{
              getCommunicationName(
                data.communicationTypeId,
                communicationTypes!
              )
            }}
          </td>
          <td nz-tooltip [nzTooltipTitle]="data.insuredName">
            {{ data.insuredName && data.insuredName?.substring(0, 30) + '...' }}
          </td>
          <td>
            {{ getInsuredTypeName(data.insuredType, insuredTypes!) }}
          </td>
          <td>
            {{ getStatus(statusList, data.approveStatus) }}
          </td>
          <td
            nz-tooltip
            [nzTooltipTitle]="data.message"
            style="cursor: pointer"
            (click)="editMessage(data.id, data.message)"
          >
            {{ data.message && data.message?.substring(0, 30) + '...' }}
          </td>
          <td>{{ data.phone }}</td>
          <td>{{ data.email }}</td>
          <td>{{ binaryEnum[data.hasProblem] }}</td>
        </tr>
      </tbody>
    </nz-table>
    <nz-pagination
      [nzPageIndex]="currentPage"
      [nzTotal]="count"
      (nzPageIndexChange)="onPageChange($event)"
      (nzPageSizeChange)="onPageSizeChange($event)"
      nzShowQuickJumper
      nzShowSizeChanger
      style="margin-top: 20px;"
    ></nz-pagination>
  `,
  styles: [
    `
      .has-problem {
        background: #ffe5e5;
      }
    `,
  ],
})
export class SmsTableComponent {
  checked = false;
  indeterminate = false;
  @Output() onEditMessage = new EventEmitter<{ id: number; message: string }>();
  @Output() checkedItems = new EventEmitter<SmsCheckListModel[]>();
  @Output() searchKey = new EventEmitter<string>();
  @Output() resetKey = new EventEmitter<keyof Columns>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Input() isFailedNotification: boolean = false;
  @Input() page: number = 0;
  @Input() pageSize: number = 0;
  @Input() currentPage: number = 0;
  @Input() count: number = 0;
  @Input() statusList: SmsStatusListModel[] = [];
  @Input() listOfData: readonly SmsCheckListModel[] = [];
  @Input() columns: Columns = {} as Columns;
  listOfCurrentPageData: readonly SmsCheckListModel[] = [];
  setOfCheckedId = new Set<number>();
  originalOrder = originalOrder;
  binaryEnum = BinaryEnum;
  @Input() branches: BranchModel[] = [];
  @Input() communicationTypes: CommunicationTypesModel[] = [];
  @Input() policySeries: PolicySeriesModel[] = [];
  @Input() insuredTypes: InsuredType[] = [];

  constructor() {}

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(
    listOfCurrentPageData: readonly SmsCheckListModel[]
  ): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(({ id }) =>
      this.setOfCheckedId.has(id)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some(({ id }) =>
        this.setOfCheckedId.has(id)
      ) && !this.checked;
    this.checkedItems.emit(
      this.listOfCurrentPageData.filter(({ id }) => this.setOfCheckedId.has(id))
    );
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
  onPageSizeChange(size: number) {
    this.pageSizeChange.emit(size);
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.forEach(({ id }) =>
      this.updateCheckedSet(id, checked)
    );
    this.refreshCheckedStatus();
  }
  search(key: string) {
    this.searchKey.emit(key);
  }
  onDateFilter(result: Date[], colName: keyof Columns): void {
    this.columns[colName].start = moment(result[0]).format('DD.MM.YYYY');
    this.columns[colName].end = moment(result[1]).format('DD.MM.YYYY');
  }
  resetFilter(key: keyof Columns) {
    this.resetKey.emit(key);
  }

  getStatus(statusList: SmsStatusListModel[] = [], id: number): string {
    if (!statusList || !statusList.length) return '';
    return statusList.find((v) => v.id === id)!.name;
  }

  getBranchName(id: string, branches: BranchModel[]): string {
    if (!branches) return '';
    const branch = branches.find((v) => v.branchCode === id);
    if (!branch) return '';
    return branch!.branchName;
  }
  getCommunicationName(id: number, coms: CommunicationTypesModel[]): string {
    if (!coms) return '';
    return coms.find((v) => v.id === id)!.description;
  }
  getInsuredTypeName(id: string, insureds: InsuredType[]): string {
    if (!insureds) return '';
    return insureds.find((v) => v.type === id)!.description;
  }
  editMessage(id: number, message: string) {
    this.onEditMessage.emit({ id, message });
  }
}
