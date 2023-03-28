import { createAction, props } from '@ngrx/store';
import { httpActionTypeGenerator } from '../../../shared/actionTypeGenerator';
import { Data } from '../../../models/response.model';
import { CancellationModel } from '../../../models/cancellation.model';

const getCancellations = createAction(
  httpActionTypeGenerator('cancellations', 'GET').start
);
const getCancellationsComplete = createAction(
  httpActionTypeGenerator('cancellations', 'GET').complete,
  props<{ cancellations: Data<CancellationModel> }>()
);
const getCancellationsError = createAction(
  httpActionTypeGenerator('cancellations', 'GET').error,
  props<{ error: any }>()
);
const changeCancellationsParams = createAction(
  'cancellations change param',
  props<{ param: string; value: string | number }>()
);
const removeCancellationsParam = createAction(
  'cancellations remove param',
  props<{ param: string }>()
);

const changePagination = createAction(
  'cancellations change Pagination',
  props<{ page: number }>()
);
export const Actions = {
  getCancellations,
  getCancellationsComplete,
  getCancellationsError,
  changeCancellationsParams,
  removeCancellationsParam,
  changePagination,
};
