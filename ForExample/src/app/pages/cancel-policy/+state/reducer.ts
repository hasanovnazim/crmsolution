import { Action, createReducer, on } from '@ngrx/store';
import { CancellationsState } from './state';
import { initialState } from './state';
import { Actions } from './actions';
import { CancellationModel } from '../../../models/cancellation.model';

export const reducer = createReducer(
  initialState,
  on(Actions.getCancellations, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getCancellationsComplete, (state, { cancellations }) => ({
    ...state,
    cancellations,
    loading: false,
  })),
  on(Actions.getCancellationsError, (state, error) => ({
    ...state,
    loading: false,
    error,
  })),
  on(Actions.changeCancellationsParams, (state, parameter) => ({
    ...state,
    params: {
      ...state.params,
      [parameter.param]: parameter.value,
    },
  })),
  on(Actions.removeCancellationsParam, (state, { param }) => {
    const newParams: Partial<CancellationModel> = {
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
  on(Actions.changePagination, (state, { page }) => ({
    ...state,
    pagination: page,
  }))
);

export function reducerFactory(
  state: CancellationsState | undefined,
  actions: Action
) {
  return reducer(state, actions);
}
