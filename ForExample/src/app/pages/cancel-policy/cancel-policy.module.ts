import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import CancelPolicyComponent from './cancel-policy.component';
import { CancelPolicyRoutingModule } from './cancel-policy-routing.module';
import { ApiService } from '../../store/api.service';
import { Facade } from './+state/facade';
import { ExcelDownloadService } from '../../shared/excell-report/excel-download.service';
import { StoreModule } from '@ngrx/store';
import { FeaturesEnum } from '../../store/features.enum';
import { reducer } from './+state/reducer';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './+state/effects';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { IconsProviderModule } from '../../icons-provider.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ExcellDownloadModule } from '../../shared/excell-report/excell-download.module';
import { RolesModule } from '../../store/auth/roles/roles.module';

@NgModule({
  declarations: [CancelPolicyComponent],
  imports: [
    CommonModule,
    CancelPolicyRoutingModule,
    NzTableModule,
    NzSkeletonModule,
    NzDropDownModule,
    NzTypographyModule,
    IconsProviderModule,
    NzBreadCrumbModule,
    NzModalModule,
    NzPaginationModule,
    NzButtonModule,
    NzInputModule,
    NzInputModule,
    NzCardModule,
    NzSelectModule,
    NzDatePickerModule,
    FormsModule,
    StoreModule.forFeature(FeaturesEnum.CANCELLATION, reducer),
    EffectsModule.forFeature([Effects]),
    ExcellDownloadModule,
    RolesModule,
  ],
  exports: [CancelPolicyComponent],
  providers: [ApiService, Facade, ExcelDownloadService],
})
export class CancelPolicyModule {}
