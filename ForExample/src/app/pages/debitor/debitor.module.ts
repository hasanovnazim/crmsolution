import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebitorComponent } from './debitor.component';
import { DebitorRoutingModule } from './debitor-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ApiService } from 'src/app/store/api.service';
import { StoreModule } from '@ngrx/store';
import { FeaturesEnum } from '../../store/features.enum';
import { reducer } from './+state/reducer';
import { Facade } from './+state/facade';
import { Effects } from './+state/effects';
import { EffectsModule } from '@ngrx/effects';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IconsProviderModule } from '../../icons-provider.module';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DebitorDetailsComponent } from './debitor-details/debitor-details.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommentsComponent } from './comments/comments.component';
import { ExcelDownloadService } from '../../shared/excell-report/excel-download.service';
import { ExcellDownloadModule } from '../../shared/excell-report/excell-download.module';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { DownloadFileModule } from '../../shared/download-file/download-file.module';
import { RolesModule } from '../../store/auth/roles/roles.module';

@NgModule({
  declarations: [DebitorComponent, DebitorDetailsComponent, CommentsComponent],
  imports: [
    DebitorRoutingModule,
    CommonModule,
    NzTableModule,
    NzTabsModule,
    StoreModule.forFeature(FeaturesEnum.DEBITORS_STATE, reducer),
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
    NzDropDownModule,
    NzCheckboxModule,
    ExcellDownloadModule,
    DownloadFileModule,
    RolesModule,
  ],
  exports: [DebitorComponent],
  providers: [ApiService, Facade, ExcelDownloadService],
})
export class DebitorModule {}
