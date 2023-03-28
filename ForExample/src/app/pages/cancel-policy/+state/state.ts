import { Data } from '../../../models/response.model';
import { CancellationModel } from '../../../models/cancellation.model';

export interface CancellationsState {
  loading: boolean;
  cancellations: Data<CancellationModel>;
  params: Partial<CancellationModel>;
  pagination: number;
  error: any;
}
export const initialState: CancellationsState = {
  loading: true,
  cancellations: { result: [], count: 0 },
  params: {
    limit: 10,
    offset: 0,
  },
  pagination: 1,
  error: null,
};
