import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeaturesEnum } from '../../../store/features.enum';
import { TasksState } from './state';

export const tasks = createSelector(
  createFeatureSelector(FeaturesEnum.Tasks),
  (state: TasksState) => state.tasks.result
);
export const count = createSelector(
  createFeatureSelector(FeaturesEnum.Tasks),
  (state: TasksState) => state.tasks.count
);
export const params = createSelector(
  createFeatureSelector(FeaturesEnum.Tasks),
  (state: TasksState) => state.params
);
export const currentPage = createSelector(
  createFeatureSelector(FeaturesEnum.Tasks),
  (state: TasksState) => state.pagination
);
export const loading = createSelector(
  createFeatureSelector(FeaturesEnum.Tasks),
  (state: TasksState) => state.loading
);
export const error = createSelector(
  createFeatureSelector(FeaturesEnum.Tasks),
  (state: TasksState) => state.error
);

export const Selectors = {
  tasks,
  params,
  count,
  loading,
  error,
  currentPage,
};
