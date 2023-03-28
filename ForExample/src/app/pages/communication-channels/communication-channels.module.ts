import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import CommunicationChannelsComponent from './communication-channels.component';
import { CommunicationChannelsRoutingModule } from './communication-channels-routing.module';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { FeaturesEnum } from '../../store/features.enum';
import { reducer } from './+state/reducer';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './+state/effects';
import { ApiService } from '../../store/api.service';
import { Facade } from './+state/facade';
import { NotificationTableComponent } from './notification-table/notification-table.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ExcelDownloadService } from '../../shared/excell-report/excel-download.service';
import { ExcellDownloadModule } from '../../shared/excell-report/excell-download.module';
import { CommunicationSettingsComponent } from './communaction-settings/communication-settings.component';
import { RolesModule } from '../../store/auth/roles/roles.module';

@NgModule({
  declarations: [
    CommunicationChannelsComponent,
    NotificationTableComponent,
    CommunicationSettingsComponent,
  ],
  imports: [
    CommonModule,
    CommunicationChannelsRoutingModule,
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
    NzRadioModule,
    NzDatePickerModule,
    FormsModule,
    StoreModule.forFeature(FeaturesEnum.NOTIFICATIONS, reducer),
    EffectsModule.forFeature([Effects]),
    ExcellDownloadModule,
    ReactiveFormsModule,
    RolesModule,
  ],
  exports: [CommunicationChannelsComponent],
  providers: [ApiService, Facade, ExcelDownloadService],
})
export class CommunicationChannelsModule {}
