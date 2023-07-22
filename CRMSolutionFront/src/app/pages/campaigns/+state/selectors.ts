import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeaturesEnum } from "../../../store/features.enum";
import { State } from "./state";

export const campaignList = createSelector(
  createFeatureSelector(FeaturesEnum.CAMPAIGN_STATE),
  (state: State) => state.campaignList
);
export const salesCampaign = createSelector(
  createFeatureSelector(FeaturesEnum.CAMPAIGN_STATE),
  (state: State) => state.salesCampaign
);
export const insuredTypes = createSelector(
  createFeatureSelector(FeaturesEnum.CAMPAIGN_STATE),
  (state: State) => state.insuredTypes
);
export const series = createSelector(
  createFeatureSelector(FeaturesEnum.CAMPAIGN_STATE),
  (state: State) => state.series
);
export const customerCategory = createSelector(
  createFeatureSelector(FeaturesEnum.CAMPAIGN_STATE),
  (state: State) => state.customerCategory
);
export const customerCategoryRefund = createSelector(
  createFeatureSelector(FeaturesEnum.CAMPAIGN_STATE),
  (state: State) => state.customerCategoryRefund
);
export const eventHistory = createSelector(
  createFeatureSelector(FeaturesEnum.CAMPAIGN_STATE),
  (state: State) => state.eventHistory
);
export const discountType = createSelector(
  createFeatureSelector(FeaturesEnum.CAMPAIGN_STATE),
  (state: State) => state.discountType
);
export const presents = createSelector(
  createFeatureSelector(FeaturesEnum.CAMPAIGN_STATE),
  (state: State) => state.presents
);
export const deleteCampaign = createSelector(
  createFeatureSelector(FeaturesEnum.DELETECAMPAIGN_STATE),
  (state: State) => state.campaignId
);

export const loading = createSelector(
  createFeatureSelector(FeaturesEnum.CAMPAIGN_STATE),
  (state: State) => state.loading
);
export const error = createSelector(
  createFeatureSelector(FeaturesEnum.CAMPAIGN_STATE),
  (state: State) => state.error
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
  deleteCampaign,
  loading,
  error,
};
