import { Action, createReducer, on } from '@ngrx/store';
import { Actions } from './actions';
import { initialState, UsersState } from './state';

export const reducer = createReducer(
  initialState,
  on(Actions.getUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getUsersComplete, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),
  on(Actions.getUsersComplete, (state) => ({
    ...state,
    loading: false,
    error: { error: 'some error' },
  }))
);

export function reducerFactory(state: UsersState | undefined, actions: Action) {
  return reducer(state, actions);
}
