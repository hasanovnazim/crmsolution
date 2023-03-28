import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import CustomerContactsComponent from './customer-contacts.component';
import { CustomerContactsRoutingModule } from './customer-contacts-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { IconsProviderModule } from '../../icons-provider.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { StoreModule } from '@ngrx/store';
import { FeaturesEnum } from '../../store/features.enum';
import { reducer } from './+state/reducer';
import { ApiService } from '../../store/api.service';
import { Facade } from './+state/facade';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './+state/effects';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ExcelDownloadService } from '../../shared/excell-report/excel-download.service';
import { ExcellDownloadModule } from '../../shared/excell-report/excell-download.module';
import { RolesModule } from '../../store/auth/roles/roles.module';

@NgModule({
  declarations: [CustomerContactsComponent],
  imports: [
    CommonModule,
    CustomerContactsRoutingModule,
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
    FormsModule,
    StoreModule.forFeature(FeaturesEnum.CUSTOMER_CONTACTS_STATE, reducer),
    EffectsModule.forFeature([Effects]),
    ExcellDownloadModule,
    RolesModule,
  ],
  exports: [CustomerContactsComponent],
  providers: [ApiService, Facade, ExcelDownloadService],
})
export class CustomerContactsModule {}
