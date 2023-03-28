import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeaturesEnum } from '../../../store/features.enum';
import { SmsCheckListState } from './state';

export const smsCheckList = createSelector(
  createFeatureSelector(FeaturesEnum.SMS_CHECK_LIST),
  (state: SmsCheckListState) => state.smsCheckList.result
);
export const count = createSelector(
  createFeatureSelector(FeaturesEnum.SMS_CHECK_LIST),
  (state: SmsCheckListState) => state.smsCheckList.count
);
export const params = createSelector(
  createFeatureSelector(FeaturesEnum.SMS_CHECK_LIST),
  (state: SmsCheckListState) => state.params
);
export const currentPage = createSelector(
  createFeatureSelector(FeaturesEnum.SMS_CHECK_LIST),
  (state: SmsCheckListState) => state.pagination
);
export const loading = createSelector(
  createFeatureSelector(FeaturesEnum.SMS_CHECK_LIST),
  (state: SmsCheckListState) => state.loading
);
export const error = createSelector(
  createFeatureSelector(FeaturesEnum.SMS_CHECK_LIST),
  (state: SmsCheckListState) => state.error
);

export const Selectors = {
  smsCheckList,
  params,
  count,
  loading,
  error,
  currentPage,
};
