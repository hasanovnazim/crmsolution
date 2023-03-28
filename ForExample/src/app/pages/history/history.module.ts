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
import { HistoryComponent } from './history.component';
import { Facade } from './+state/facade';
import { HistoryRoutingModule } from './hitory-routing.module';
import { RolesModule } from '../../store/auth/roles/roles.module';

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    HistoryRoutingModule,
    CommonModule,
    NzTableModule,
    NzTabsModule,
    StoreModule.forFeature(FeaturesEnum.HISTORY, reducer),
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
    ExcellDownloadModule,
    RolesModule,
  ],
  exports: [HistoryComponent],
  providers: [ApiService, ExcelDownloadService, Facade],
})
export class HistoryModule {}
