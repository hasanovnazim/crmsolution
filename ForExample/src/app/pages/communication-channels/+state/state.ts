import { Data } from '../../../models/response.model';
import {
  CommunicationSettings,
  NotificationsModel,
} from '../../../models/notifications.model';

export interface NotificationsState {
  loading: boolean;
  notifications: Data<NotificationsModel>;
  settings: Data<CommunicationSettings>;
  settingsParams: Partial<CommunicationSettings>;
  params: Partial<NotificationsModel>;
  pagination: number;
  settingsPagination: number;
  error: any;
}
export const initialState: NotificationsState = {
  loading: true,
  notifications: { result: [], count: 0 },
  settings: { result: [], count: 0 },
  settingsParams: {
    limit: 10,
    offset: 0,
  },
  params: {
    limit: 10,
    offset: 0,
  },
  pagination: 1,
  settingsPagination: 1,
  error: null,
};
