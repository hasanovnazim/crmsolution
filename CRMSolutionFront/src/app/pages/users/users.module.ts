import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
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

@NgModule({
  declarations: [UsersComponent],
  imports: [
    UsersRoutingModule,
    CommonModule,
    NzTableModule,
    StoreModule.forFeature(FeaturesEnum.USERS_STATE, reducer),
    EffectsModule.forFeature([Effects]),
    NzSkeletonModule,
    NzTypographyModule,
  ],
  exports: [UsersComponent],
  providers: [ApiService, Facade],
})
export class UsersModule {}
