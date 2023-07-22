import { Action, createReducer, on } from "@ngrx/store";
import { Actions } from "./actions";
import { initialState, State } from "./state";

export const reducer = createReducer(
  initialState,
  on(Actions.getCampaignList, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getCampaignListComplete, (state, { campaignList }) => ({
    ...state,
    campaignList,
    loading: false,
  })),
  on(Actions.getCampaignListComplete, (state) => ({
    ...state,
    loading: false,
    error: { error: "some error" },
  })),

  on(Actions.getSalesCampaign, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getSalesCampaignComplete, (state, { salesCampaign }) => ({
    ...state,
    salesCampaign,
    loading: false,
  })),
  on(Actions.getSalesCampaignComplete, (state) => ({
    ...state,
    loading: false,
    error: { error: "some error" },
  })),

  on(Actions.getInsuredTypes, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getInsuredTypesComplete, (state, { insuredTypes }) => ({
    ...state,
    insuredTypes,
    loading: false,
  })),
  on(Actions.getInsuredTypesComplete, (state) => ({
    ...state,
    loading: false,
    error: { error: "some error" },
  })),

  on(Actions.getSeries, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getSeriesComplete, (state, { series }) => ({
    ...state,
    series,
    loading: false,
  })),
  on(Actions.getSeriesComplete, (state) => ({
    ...state,
    loading: false,
    error: { error: "some error" },
  })),

  on(Actions.getCustomerCategory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getCustomerCategoryComplete, (state, { customerCategory }) => ({
    ...state,
    customerCategory,
    loading: false,
  })),
  on(Actions.getCustomerCategoryComplete, (state) => ({
    ...state,
    loading: false,
    error: { error: "some error" },
  })),

  on(Actions.getCustomerCategoryRefund, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    Actions.getCustomerCategoryRefundComplete,
    (state, { customerCategoryRefund }) => ({
      ...state,
      customerCategoryRefund,
      loading: false,
    })
  ),
  on(Actions.getCustomerCategoryRefundComplete, (state) => ({
    ...state,
    loading: false,
    error: { error: "some error" },
  })),

  on(Actions.getEventHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getEventHistoryComplete, (state, { eventHistory }) => ({
    ...state,
    eventHistory,
    loading: false,
  })),
  on(Actions.getEventHistoryComplete, (state) => ({
    ...state,
    loading: false,
    error: { error: "some error" },
  })),

  on(Actions.getDiscountType, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getDiscountTypeComplete, (state, { discountType }) => ({
    ...state,
    discountType,
    loading: false,
  })),
  on(Actions.getDiscountTypeComplete, (state) => ({
    ...state,
    loading: false,
    error: { error: "some error" },
  })),

  on(Actions.getPresents, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getPresentsComplete, (state, { presents }) => ({
    ...state,
    presents,
    loading: false,
  })),
  on(Actions.getPresentsComplete, (state) => ({
    ...state,
    loading: false,
    error: { error: "some error" },
  })),
  on(Actions.deleteCampaign, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteCampaignComplete, (state, { campaignId }) => ({
    ...state,
    campaignId,
    loading: false,
  })),
  on(Actions.deleteCampaignComplete, (state) => ({
    ...state,
    loading: false,
    error: { error: 'some error' },
  })),
);

export function reducerFactory(state: State, actions: Action) {
  return reducer(state, actions);
}
