import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeaturesEnum } from '../../../store/features.enum';
import { HistoryState } from './state';

export const history = createSelector(
  createFeatureSelector(FeaturesEnum.HISTORY),
  (state: HistoryState) => state.history.result
);
export const count = createSelector(
  createFeatureSelector(FeaturesEnum.HISTORY),
  (state: HistoryState) => state.history.count
);
export const params = createSelector(
  createFeatureSelector(FeaturesEnum.HISTORY),
  (state: HistoryState) => state.params
);
export const currentPage = createSelector(
  createFeatureSelector(FeaturesEnum.HISTORY),
  (state: HistoryState) => state.pagination
);
export const loading = createSelector(
  createFeatureSelector(FeaturesEnum.HISTORY),
  (state: HistoryState) => state.loading
);
export const error = createSelector(
  createFeatureSelector(FeaturesEnum.HISTORY),
  (state: HistoryState) => state.error
);

export const Selectors = {
  history,
  params,
  count,
  loading,
  error,
  currentPage,
};
