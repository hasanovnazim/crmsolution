import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeaturesEnum } from '../../../store/features.enum';
import { CampaignListState, CustomerCategoryRefundState, CustomerCategoryState, DiscountTypeState, EventHistoryState, InsuredTypesState, PresentsState, SalesCampaignState, SeriesState } from './state';

export const campaignList = createSelector(
  createFeatureSelector(FeaturesEnum.CAMPAIGNLIST_STATE),
  (state: CampaignListState) => state.campaignList
);
export const salesCampaign = createSelector(
  createFeatureSelector(FeaturesEnum.SALESCAMPAIGN_STATE),
  (state: SalesCampaignState) => state.salesCampaign
);
export const insuredTypes = createSelector(
  createFeatureSelector(FeaturesEnum.INSUREDTYPES_STATE),
  (state: InsuredTypesState ) => state.insuredTypes
);
export const series = createSelector(
  createFeatureSelector(FeaturesEnum.SERIES_STATE),
  (state: SeriesState ) => state.series
);
export const customerCategory = createSelector(
  createFeatureSelector(FeaturesEnum.CUSTOMERCATEGORY_STATE),
  (state: CustomerCategoryState ) => state.customerCategory
);
export const customerCategoryRefund = createSelector(
  createFeatureSelector(FeaturesEnum.CUSTOMERCATEGORYREFUND_STATE),
  (state: CustomerCategoryRefundState ) => state.customerCategoryRefund
);
export const eventHistory = createSelector(
  createFeatureSelector(FeaturesEnum.EVENTHISTORY_STATE),
  (state: EventHistoryState ) => state.eventHistory
);
export const discountType = createSelector(
  createFeatureSelector(FeaturesEnum.DISCOUNTTPYE_STATE),
  (state: DiscountTypeState ) => state.discountType
);
export const presents = createSelector(
  createFeatureSelector(FeaturesEnum.PRESENTS_STATE),
  (state: PresentsState ) => state.presents
);

export const loading = createSelector(
  createFeatureSelector(FeaturesEnum.CAMPAIGNLIST_STATE),
  (state: CampaignListState | SalesCampaignState | InsuredTypesState | SeriesState | CustomerCategoryState | CustomerCategoryRefundState | EventHistoryState | DiscountTypeState | PresentsState) => state.loading
);
export const error = createSelector(
  createFeatureSelector(FeaturesEnum.CAMPAIGNLIST_STATE),
  (state: CampaignListState | SalesCampaignState | InsuredTypesState | SeriesState | CustomerCategoryState | CustomerCategoryRefundState | EventHistoryState | DiscountTypeState | PresentsState) => state.error
);

export const Selectors = {
  campaignList,
  salesCampaign,
  insuredTypes,
  series,
  customerCategory,
  customerCategoryRefund,
  eventHistory,
  discountType,
  presents,
  loading,
  error,
};
