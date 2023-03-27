import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeaturesEnum } from '../../../store/features.enum';
import { UsersState } from './state';

export const users = createSelector(
  createFeatureSelector(FeaturesEnum.USERS_STATE),
  (state: UsersState) => state.users
);
export const loading = createSelector(
  createFeatureSelector(FeaturesEnum.USERS_STATE),
  (state: UsersState) => state.loading
);
export const error = createSelector(
  createFeatureSelector(FeaturesEnum.USERS_STATE),
  (state: UsersState) => state.error
);

export const Selectors = {
  users,
  loading,
  error,
};
