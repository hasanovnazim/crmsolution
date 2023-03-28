import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeaturesEnum } from '../../../store/features.enum';
import { CancellationsState } from './state';

export const cancellations = createSelector(
  createFeatureSelector(FeaturesEnum.CANCELLATION),
  (state: CancellationsState) => state.cancellations.result
);
export const count = createSelector(
  createFeatureSelector(FeaturesEnum.CANCELLATION),
  (state: CancellationsState) => state.cancellations.count
);
export const params = createSelector(
  createFeatureSelector(FeaturesEnum.CANCELLATION),
  (state: CancellationsState) => state.params
);
export const currentPage = createSelector(
  createFeatureSelector(FeaturesEnum.CANCELLATION),
  (state: CancellationsState) => state.pagination
);
export const loading = createSelector(
  createFeatureSelector(FeaturesEnum.CANCELLATION),
  (state: CancellationsState) => state.loading
);
export const error = createSelector(
  createFeatureSelector(FeaturesEnum.CANCELLATION),
  (state: CancellationsState) => state.error
);

export const Selectors = {
  cancellations,
  params,
  count,
  loading,
  error,
  currentPage,
};
