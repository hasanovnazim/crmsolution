import { createAction, props } from '@ngrx/store';
import { httpActionTypeGenerator } from '../../../shared/actionTypeGenerator';
import { Data } from '../../../models/response.model';
import { CustomerContactsModel } from '../../../models/customer-contacts.model';

const getContacts = createAction(
  httpActionTypeGenerator('contacts', 'GET').start
);
const getContactsComplete = createAction(
  httpActionTypeGenerator('contacts', 'GET').complete,
  props<{ contacts: Data<CustomerContactsModel> }>()
);
const getContactsError = createAction(
  httpActionTypeGenerator('contacts', 'GET').error,
  props<{ error: any }>()
);
const changeContactsParams = createAction(
  'contacts change param',
  props<{ param: string; value: string | number }>()
);
const removeContactsParam = createAction(
  'contacts remove param',
  props<{ param: string }>()
);

const changePagination = createAction(
  'contacts change Pagination',
  props<{ page: number }>()
);
export const Actions = {
  getContacts,
  getContactsComplete,
  getContactsError,
  changeContactsParams,
  removeContactsParam,
  changePagination,
};
