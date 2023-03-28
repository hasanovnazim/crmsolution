import { Action, createReducer, on } from '@ngrx/store';
import { HistoryState } from './state';
import { initialState } from './state';
import { Actions } from './actions';
import { HistoryModel } from '../../../models/history.model';

export const reducer = createReducer(
  initialState,
  on(Actions.getHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getHistoryComplete, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.getHistoryError, (state, error) => ({
    ...state,
    loading: false,
    error,
  })),
  on(Actions.changeHistoryParams, (state, parameter) => ({
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
  on(Actions.removeHistoryParam, (state, { param }) => {
    const newParams: Partial<HistoryModel> = {
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
  state: HistoryState | undefined,
  actions: Action
) {
  return reducer(state, actions);
}
