import { Data } from '../../../models/response.model';
import { CustomerContactsModel } from '../../../models/customer-contacts.model';

export interface CustomerContactsState {
  loading: boolean;
  contacts: Data<CustomerContactsModel>;
  params: Partial<CustomerContactsModel>;
  pagination: number;
  error: any;
}

export const initialState: CustomerContactsState = {
  loading: true,
  contacts: { result: [], count: 0 },
  params: {
    limit: 10,
    offset: 0,
  },
  pagination: 1,
  error: null,
};
