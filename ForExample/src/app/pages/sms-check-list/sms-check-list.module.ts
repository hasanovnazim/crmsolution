import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { StoreModule } from '@ngrx/store';
import { FeaturesEnum } from '../../store/features.enum';
import { reducer } from './+state/reducers';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './+state/effects';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IconsProviderModule } from '../../icons-provider.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ExcellDownloadModule } from '../../shared/excell-report/excell-download.module';
import { ApiService } from '../../store/api.service';
import { ExcelDownloadService } from '../../shared/excell-report/excel-download.service';
import { SmsCheckListComponent } from './sms-check-list.component';
import { Facade } from './+state/facade';
import { SmsCheckListRoutingModule } from './sms-check-list-routing.module';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SmsTableComponent } from './sms-table/sms-table.component';
import { RolesModule } from '../../store/auth/roles/roles.module';
import { FailedNotificationsComponent } from './failed-notifications.component';

@NgModule({
  declarations: [
    SmsCheckListComponent,
    SmsTableComponent,
    FailedNotificationsComponent,
  ],
  imports: [
    SmsCheckListRoutingModule,
    CommonModule,
    NzTableModule,
    NzTabsModule,
    StoreModule.forFeature(FeaturesEnum.SMS_CHECK_LIST, reducer),
    EffectsModule.forFeature([Effects]),
    NzSkeletonModule,
    NzTypographyModule,
    NzDropDownModule,
    IconsProviderModule,
    NzButtonModule,
    NzInputModule,
    FormsModule,
    NzPaginationModule,
    NzDatePickerModule,
    NzSelectModule,
    NzBreadCrumbModule,
    NzModalModule,
    NzToolTipModule,
    RolesModule,
    ExcellDownloadModule,
  ],
  exports: [SmsCheckListComponent],
  providers: [ApiService, ExcelDownloadService, Facade],
})
export class SmsCheckListModule {}
