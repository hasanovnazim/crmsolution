import { CustomerCategoryModel } from 'src/app/models/customerCategory.model';
import { CustomerCategoryRefundModel } from 'src/app/models/customerCategoryRefund.model';
import { DiscountTypeModel } from 'src/app/models/discountType.model';
import { EventHistoryModel } from 'src/app/models/eventHistory.model';
import { InsuredTypesModel } from 'src/app/models/insuredTypes.model';
import { PresentsModel } from 'src/app/models/presents.model';
import { SeriesModel } from 'src/app/models/series.model';
import { CampaignListModel } from '../../../models/campaignList.model';
import { SalesCampaignModel } from '../../../models/salesCampaign.model';

export interface CampaignListState {
  loading: boolean;
  campaignList: CampaignListModel[];
  error: any;
}

export interface SalesCampaignState {
  loading: boolean;
  salesCampaign: SalesCampaignModel[];
  error: any;
}

export interface InsuredTypesState {
  loading: boolean;
  insuredTypes: InsuredTypesModel[];
  error: any;
}

export interface SeriesState {
  loading: boolean;
  series: SeriesModel[];
  error: any;
}

export interface CustomerCategoryState {
  loading: boolean;
  customerCategory: CustomerCategoryModel[];
  error: any;
}

export interface CustomerCategoryRefundState {
  loading: boolean;
  customerCategoryRefund: CustomerCategoryRefundModel[];
  error: any;
}

export interface EventHistoryState {
  loading: boolean;
  eventHistory: EventHistoryModel[];
  error: any;
}
export interface DiscountTypeState {
  loading: boolean;
  discountType: DiscountTypeModel[];
  error: any;
}

export interface PresentsState {
  loading: boolean;
  presents: PresentsModel[];
  error: any;
}

export const initialState: 
  CampaignListState | 
  SalesCampaignState | 
  InsuredTypesState | 
  SeriesState | 
  CustomerCategoryState |
  CustomerCategoryRefundState |
  EventHistoryState |
  DiscountTypeState | 
  PresentsState = {
  loading: true,
  campaignList: [],
  salesCampaign: [],
  insuredTypes: [],
  series: [],
  customerCategory: [],
  customerCategoryRefund: [],
  eventHistory: [],
  discountType: [],
  presents: [],
  error: null,
};
