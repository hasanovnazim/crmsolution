import { createAction, props } from '@ngrx/store';
import { httpActionTypeGenerator } from '../../../shared/actionTypeGenerator';
import { Data } from '../../../models/response.model';
import { SmsCheckListModel } from '../../../models/sms-check-list.model';

const getSmsCheckList = createAction(
  httpActionTypeGenerator('smsCheckList', 'GET').start
);
const getSmsCheckListComplete = createAction(
  httpActionTypeGenerator('smsCheckList', 'GET').complete,
  props<{ smsCheckList: Data<SmsCheckListModel> }>()
);
const getSmsCheckListError = createAction(
  httpActionTypeGenerator('smsCheckList', 'GET').error,
  props<{ error: any }>()
);
const changeSmsCheckListParams = createAction(
  'smsCheckList change param',
  props<{ param: string; value: string | number | boolean }>()
);
const removeSmsCheckListParam = createAction(
  'smsCheckList remove param',
  props<{ param: string }>()
);

const changePagination = createAction(
  'smsCheckList change Pagination',
  props<{ page: number }>()
);
export const Actions = {
  getSmsCheckList,
  getSmsCheckListComplete,
  getSmsCheckListError,
  changeSmsCheckListParams,
  removeSmsCheckListParam,
  changePagination,
};
