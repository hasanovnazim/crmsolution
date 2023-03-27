import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfigState } from './state';
import { FeaturesEnum } from '../features.enum';

export const config = createSelector(
  createFeatureSelector(FeaturesEnum.CONFIG),
  (state: ConfigState) => state
);

export const Selectors = {
  config,
};
