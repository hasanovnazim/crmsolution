import { Action, createReducer, on } from '@ngrx/store';
import { Actions } from './actions';
import { ConfigState, initialState } from './state';

export const reducer = createReducer(
  initialState,
  on(Actions.getConfig, (state) => ({
    ...state,
  })),
  on(Actions.getConfigComplete, (state, config) => ({
    ...state,
    ...config,
  })),
  on(Actions.getConfigError, (state) => ({
    ...state,
    error: { error: 'some error' },
  }))
);

export function reducerFactory(
  state: ConfigState | undefined,
  actions: Action
) {
  return reducer(state, actions);
}
