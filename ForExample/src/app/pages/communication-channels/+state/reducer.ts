import { Action, createReducer, on } from '@ngrx/store';
import { NotificationsState } from './state';
import { initialState } from './state';
import { Actions } from './actions';
import { NotificationsModel } from '../../../models/notifications.model';

export const reducer = createReducer(
  initialState,
  on(Actions.getNotifications, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getNotificationsComplete, (state, { notifications }) => ({
    ...state,
    notifications,
    loading: false,
  })),
  on(Actions.getNotificationsError, (state, error) => ({
    ...state,
    loading: false,
    error,
  })),
  on(Actions.getNotificationsSettings, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getNotificationsSettingsComplete, (state, { settings }) => ({
    ...state,
    settings,
    loading: false,
  })),
  on(Actions.getNotificationsSettingsError, (state, error) => ({
    ...state,
    loading: false,
    error,
  })),
  on(Actions.changePagination, (state, { page }) => ({
    ...state,
    pagination: page,
  })),
  on(Actions.changeSettingsPagination, (state, { page }) => ({
    ...state,
    settingsPagination: page,
  })),
  on(Actions.changeNotificationsParams, (state, parameter) => ({
    ...state,
    params: {
      ...state.params,
      [parameter.param]: parameter.value,
    },
  })),
  on(Actions.removeNotificationsParam, (state, { param }) => {
    const newParams: Partial<NotificationsModel> = {
      ...state.params,
    };

    // @ts-ignore
    delete newParams[param];
    return {
      ...state,
      params: {
        ...newParams,
      },
    };
  }),
  on(Actions.changeNotificationsSettingsParams, (state, parameter) => ({
    ...state,
    settingsParams: {
      ...state.settingsParams,
      [parameter.param]: parameter.value,
    },
  })),
  on(Actions.removeNotificationsSettingsParam, (state, { param }) => {
    const newParams: Partial<NotificationsModel> = {
      ...state.settingsParams,
    };

    // @ts-ignore
    delete newParams[param];
    return {
      ...state,
      settingsParams: {
        ...newParams,
      },
    };
  })
);

export function reducerFactory(
  state: NotificationsState | undefined,
  actions: Action
) {
  return reducer(state, actions);
}
