import { createAction, props } from '@ngrx/store';
import { httpActionTypeGenerator } from '../../../shared/actionTypeGenerator';
import { Data } from '../../../models/response.model';
import { HistoryModel } from '../../../models/history.model';

const getHistory = createAction(
  httpActionTypeGenerator('history', 'GET').start
);
const getHistoryComplete = createAction(
  httpActionTypeGenerator('history', 'GET').complete,
  props<{ history: Data<HistoryModel> }>()
);
const getHistoryError = createAction(
  httpActionTypeGenerator('history', 'GET').error,
  props<{ error: any }>()
);
const changeHistoryParams = createAction(
  'history change param',
  props<{ param: string; value: string | number }>()
);
const removeHistoryParam = createAction(
  'history remove param',
  props<{ param: string }>()
);

const changePagination = createAction(
  'history change Pagination',
  props<{ page: number }>()
);
export const Actions = {
  getHistory,
  getHistoryComplete,
  getHistoryError,
  changeHistoryParams,
  removeHistoryParam,
  changePagination,
};
