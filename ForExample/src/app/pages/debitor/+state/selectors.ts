import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeaturesEnum } from '../../../store/features.enum';
import { DebitorsState } from './state';
import { PolicySeriesModel } from '../../../models/policy-series.model';

export const debitors = createSelector(
  createFeatureSelector(FeaturesEnum.DEBITORS_STATE),
  (state: DebitorsState) => state.debitors.result
);
export const count = createSelector(
  createFeatureSelector(FeaturesEnum.DEBITORS_STATE),
  (state: DebitorsState) => state.debitors.count
);
export const selectedTab = createSelector(
  createFeatureSelector(FeaturesEnum.DEBITORS_STATE),
  (state: DebitorsState) => state.selectedTab
);
export const params = createSelector(
  createFeatureSelector(FeaturesEnum.DEBITORS_STATE),
  selectedTab,
  (state: DebitorsState, selectedTab: number) =>
    state.paramsPerPage[selectedTab]
);

export const pages = createSelector(
  createFeatureSelector(FeaturesEnum.DEBITORS_STATE),
  (state: DebitorsState) => state.pages.result
);

export const branches = createSelector(
  createFeatureSelector(FeaturesEnum.DEBITORS_STATE),
  (state: DebitorsState) => state.branches.result
);
export const policySeries = createSelector(
  createFeatureSelector(FeaturesEnum.DEBITORS_STATE),
  (state: DebitorsState) => state.policySeries.result
);
export const currencies = createSelector(
  createFeatureSelector(FeaturesEnum.DEBITORS_STATE),
  (state: DebitorsState) => state.currency.result
);
export const insuredTypes = createSelector(
  createFeatureSelector(FeaturesEnum.DEBITORS_STATE),
  (state: DebitorsState) => state.insuredType.result
);
export const ifrs = createSelector(
  createFeatureSelector(FeaturesEnum.DEBITORS_STATE),
  (state: DebitorsState) => state.ifrs.result
);
export const debitorComments = createSelector(
  createFeatureSelector(FeaturesEnum.DEBITORS_STATE),
  (state: DebitorsState) => state.comments.result
);

export const loading = createSelector(
  createFeatureSelector(FeaturesEnum.DEBITORS_STATE),
  (state: DebitorsState) => state.loading
);
export const currentPage = createSelector(
  createFeatureSelector(FeaturesEnum.DEBITORS_STATE),
  (state: DebitorsState) => state.pagination
);
export const error = createSelector(
  createFeatureSelector(FeaturesEnum.DEBITORS_STATE),
  (state: DebitorsState) => state.error
);
export const debitorDetails = createSelector(
  createFeatureSelector(FeaturesEnum.DEBITORS_STATE),
  (state: DebitorsState) => state.debitorDetails.result
);

export const Selectors = {
  debitors,
  pages,
  loading,
  count,
  error,
  params,
  selectedTab,
  currentPage,
  branches,
  policySeries,
  currencies,
  insuredTypes,
  debitorDetails,
  debitorComments,
  ifrs,
};
