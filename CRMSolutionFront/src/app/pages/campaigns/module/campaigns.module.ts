import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CampaignsRoutingModule } from "./campaigns-routing.module";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { CampaignsComponent } from "../pages/list/campaigns.component";
import { CampaignsAddComponent } from "../pages/add/campaigns-add.component";
import { NzButtonModule } from "ng-zorro-antd/button";

import { ApiService } from "src/app/store/api.service";
import { StoreModule } from "@ngrx/store";
import { FeaturesEnum } from "../../../store/features.enum";
import { reducer } from "../+state/reducer";
import { Facade } from "../+state/facade";
import { Effects } from "../+state/effects";

import { EffectsModule } from "@ngrx/effects";
import { NzSkeletonModule } from "ng-zorro-antd/skeleton";
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzModalModule } from "ng-zorro-antd/modal";

import { NzIconModule } from "ng-zorro-antd/icon";
import { IconDefinition } from "@ant-design/icons-angular";
import {
  AccountBookFill,
  AlertFill,
  AlertOutline,
} from "@ant-design/icons-angular/icons";
const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill];

@NgModule({
  declarations: [CampaignsComponent, CampaignsAddComponent],
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    StoreModule.forFeature(FeaturesEnum.CAMPAIGN_STATE, reducer),
    EffectsModule.forFeature([Effects]),
    NzSkeletonModule,
    NzTypographyModule,
    NzIconModule.forRoot(icons),
    FormsModule,
    ReactiveFormsModule,
    NzGridModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTagModule,
    NzModalModule,
  ],
  exports: [NzTableModule, NzDividerModule, NzButtonModule],
  providers: [ApiService, Facade],
})
export class CampaignsModule {}
