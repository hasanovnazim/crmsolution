import { Data } from '../../../models/response.model';
import { SmsCheckListModel } from '../../../models/sms-check-list.model';

export interface SmsCheckListState {
  loading: boolean;
  smsCheckList: Data<SmsCheckListModel>;
  params: Partial<SmsCheckListModel>;
  pagination: number;
  error: any;
}
export const initialState: SmsCheckListState = {
  loading: true,
  smsCheckList: { result: [], count: 0 },
  params: {
    limit: 10,
    offset: 0,
  },
  pagination: 1,
  error: null,
};
