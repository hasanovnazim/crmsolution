import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeaturesEnum } from '../../../store/features.enum';
import { CustomerContactsState } from './state';

export const contacts = createSelector(
  createFeatureSelector(FeaturesEnum.CUSTOMER_CONTACTS_STATE),
  (state: CustomerContactsState) => state.contacts.result
);
export const count = createSelector(
  createFeatureSelector(FeaturesEnum.CUSTOMER_CONTACTS_STATE),
  (state: CustomerContactsState) => state.contacts.count
);
export const params = createSelector(
  createFeatureSelector(FeaturesEnum.CUSTOMER_CONTACTS_STATE),
  (state: CustomerContactsState) => state.params
);
export const currentPage = createSelector(
  createFeatureSelector(FeaturesEnum.CUSTOMER_CONTACTS_STATE),
  (state: CustomerContactsState) => state.pagination
);
export const loading = createSelector(
  createFeatureSelector(FeaturesEnum.CUSTOMER_CONTACTS_STATE),
  (state: CustomerContactsState) => state.loading
);
export const error = createSelector(
  createFeatureSelector(FeaturesEnum.CUSTOMER_CONTACTS_STATE),
  (state: CustomerContactsState) => state.error
);

export const Selectors = {
  contacts,
  params,
  count,
  loading,
  error,
  currentPage,
};
