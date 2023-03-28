import { Action, createReducer, on } from '@ngrx/store';
import { SmsCheckListState } from './state';
import { initialState } from './state';
import { Actions } from './actions';
import { SmsCheckListModel } from '../../../models/sms-check-list.model';

export const reducer = createReducer(
  initialState,
  on(Actions.getSmsCheckList, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getSmsCheckListComplete, (state, { smsCheckList }) => ({
    ...state,
    smsCheckList,
    loading: false,
  })),
  on(Actions.getSmsCheckListError, (state, error) => ({
    ...state,
    loading: false,
    error,
  })),
  on(Actions.changeSmsCheckListParams, (state, parameter) => ({
    ...state,
    params: {
      ...state.params,
      [parameter.param]: parameter.value,
    },
  })),
  on(Actions.changePagination, (state, { page }) => ({
    ...state,
    pagination: page,
  })),
  on(Actions.removeSmsCheckListParam, (state, { param }) => {
    const newParams: Partial<SmsCheckListModel> = {
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
  })
);

export function reducerFactory(
  state: SmsCheckListState | undefined,
  actions: Action
) {
  return reducer(state, actions);
}
