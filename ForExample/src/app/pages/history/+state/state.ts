import { Data } from '../../../models/response.model';
import { HistoryModel } from '../../../models/history.model';

export interface HistoryState {
  loading: boolean;
  history: Data<HistoryModel>;
  params: Partial<HistoryModel>;
  pagination: number;
  error: any;
}
export const initialState: HistoryState = {
  loading: true,
  history: { result: [], count: 0 },
  params: {
    limit: 10,
    offset: 0,
  },
  pagination: 1,
  error: null,
};
