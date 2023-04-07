import { Action, createReducer, on } from '@ngrx/store';
import { Actions } from './actions';
import { initialState } from './state';

export const reducer = createReducer(
  initialState,
  on(Actions.getToken, (state) => ({
    ...state,
  })),
  on(Actions.getTokenComplete, (state, token) => ({
    ...state,
    ...token,
  })),
  on(Actions.getTokenError, (state) => ({
    ...state,
    error: { error: 'some error' },
  })),
  on(Actions.getUserData, (state) => ({
    ...state,
  })),
  on(Actions.getUserDataComplete, (state, user) => ({
    ...state,
    ...user,
  })),
  on(Actions.getUserDataError, (state) => ({
    ...state,
    error: { error: 'some error' },
  })),
  on(Actions.setRoles, (state, { roles }) => ({
    ...state,
    roles: [...roles],
  }))
);

export function reducerFactory(state: undefined, actions: Action) {
  return reducer(state, actions);
}
