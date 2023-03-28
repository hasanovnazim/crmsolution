import { createAction, props } from '@ngrx/store';
import { httpActionTypeGenerator } from '../../../shared/actionTypeGenerator';
import { Data } from '../../../models/response.model';
import {
  CommunicationSettings,
  NotificationsModel,
} from '../../../models/notifications.model';

const getNotifications = createAction(
  httpActionTypeGenerator('notifications', 'GET').start
);
const getNotificationsComplete = createAction(
  httpActionTypeGenerator('notifications', 'GET').complete,
  props<{ notifications: Data<NotificationsModel> }>()
);
const getNotificationsError = createAction(
  httpActionTypeGenerator('notifications', 'GET').error,
  props<{ error: any }>()
);
const changeNotificationsParams = createAction(
  'notifications change param',
  props<{ param: string; value: string | number }>()
);
const removeNotificationsParam = createAction(
  'notifications remove param',
  props<{ param: string }>()
);

const changePagination = createAction(
  'notifications change Pagination',
  props<{ page: number }>()
);

const getNotificationsSettings = createAction(
  httpActionTypeGenerator('notifications settings', 'GET').start
);
const getNotificationsSettingsComplete = createAction(
  httpActionTypeGenerator('notifications settings', 'GET').complete,
  props<{ settings: Data<CommunicationSettings> }>()
);
const getNotificationsSettingsError = createAction(
  httpActionTypeGenerator('notifications settings', 'GET').error,
  props<{ error: any }>()
);
const changeNotificationsSettingsParams = createAction(
  'notifications setting change param',
  props<{ param: string; value: string | number }>()
);
const removeNotificationsSettingsParam = createAction(
  'notifications setting remove param',
  props<{ param: string }>()
);

const changeSettingsPagination = createAction(
  'notifications setting change Pagination',
  props<{ page: number }>()
);
export const Actions = {
  getNotifications,
  getNotificationsComplete,
  getNotificationsError,
  changeNotificationsParams,
  removeNotificationsParam,
  changePagination,
  getNotificationsSettings,
  getNotificationsSettingsComplete,
  getNotificationsSettingsError,
  changeNotificationsSettingsParams,
  removeNotificationsSettingsParam,
  changeSettingsPagination,
};
