import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeaturesEnum } from '../../../store/features.enum';
import { NotificationsState } from './state';

export const notifications = createSelector(
  createFeatureSelector(FeaturesEnum.NOTIFICATIONS),
  (state: NotificationsState) => state.notifications.result
);
export const communicationSettings = createSelector(
  createFeatureSelector(FeaturesEnum.NOTIFICATIONS),
  (state: NotificationsState) => state.settings.result
);
export const count = createSelector(
  createFeatureSelector(FeaturesEnum.NOTIFICATIONS),
  (state: NotificationsState) => state.notifications.count
);
export const params = createSelector(
  createFeatureSelector(FeaturesEnum.NOTIFICATIONS),
  (state: NotificationsState) => state.params
);
export const currentPage = createSelector(
  createFeatureSelector(FeaturesEnum.NOTIFICATIONS),
  (state: NotificationsState) => state.pagination
);
export const settingsCount = createSelector(
  createFeatureSelector(FeaturesEnum.NOTIFICATIONS),
  (state: NotificationsState) => state.settings.count
);
export const settingsParams = createSelector(
  createFeatureSelector(FeaturesEnum.NOTIFICATIONS),
  (state: NotificationsState) => state.settingsParams
);
export const settingsCurrentPage = createSelector(
  createFeatureSelector(FeaturesEnum.NOTIFICATIONS),
  (state: NotificationsState) => state.settingsPagination
);
export const loading = createSelector(
  createFeatureSelector(FeaturesEnum.NOTIFICATIONS),
  (state: NotificationsState) => state.loading
);
export const error = createSelector(
  createFeatureSelector(FeaturesEnum.NOTIFICATIONS),
  (state: NotificationsState) => state.error
);

export const Selectors = {
  notifications,
  communicationSettings,
  params,
  count,
  loading,
  error,
  currentPage,
  settingsCount,
  settingsParams,
  settingsCurrentPage,
};
