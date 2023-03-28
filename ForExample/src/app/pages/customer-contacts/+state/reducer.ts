import { Action, createReducer, on } from '@ngrx/store';
import { CustomerContactsState } from './state';
import { initialState } from './state';
import { Actions } from './actions';
import { CustomerContactsModel } from '../../../models/customer-contacts.model';

export const reducer = createReducer(
  initialState,
  on(Actions.getContacts, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getContactsComplete, (state, { contacts }) => ({
    ...state,
    contacts,
    loading: false,
  })),
  on(Actions.getContactsError, (state, error) => ({
    ...state,
    loading: false,
    error,
  })),
  on(Actions.changeContactsParams, (state, parameter) => ({
    ...state,
    params: {
      ...state.params,
      [parameter.param]: parameter.value,
    },
  })),
  on(Actions.removeContactsParam, (state, { param }) => {
    const newParams: Partial<CustomerContactsModel> = {
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
  state: CustomerContactsState | undefined,
  actions: Action
) {
  return reducer(state, actions);
}
