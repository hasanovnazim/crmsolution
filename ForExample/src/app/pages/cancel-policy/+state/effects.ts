import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../../store/api.service';
import { HttpParams } from '@angular/common/http';
import { Actions as cancellationsCancellationsActions } from './actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { ResponsePayload } from '../../../models/response.model';
import { Facade } from './facade';
import { CancellationModel } from '../../../models/cancellation.model';

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private cancellationFacade: Facade
  ) {}

  onGetCancellations = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(cancellationsCancellationsActions.getCancellations),
        withLatestFrom(this.cancellationFacade.params$),
        switchMap(([action, params]) =>
          this.apiService
            .get<ResponsePayload<CancellationModel>>(
              'cancellation?' + this.buildQueryParams(params)
            )
            .pipe(
              map((cancellations) =>
                cancellationsCancellationsActions.getCancellationsComplete({
                  cancellations: cancellations.data,
                })
              ),
              catchError((error: any) =>
                of(
                  cancellationsCancellationsActions.getCancellationsError({
                    ...error,
                  })
                )
              )
            )
        )
      )
  );

  onParamChange = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(
          cancellationsCancellationsActions.changeCancellationsParams,
          cancellationsCancellationsActions.removeCancellationsParam
        ),
        map(() => this.cancellationFacade.getCustomerCancellations())
      ),
    { dispatch: false }
  );

  onPageChange = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(cancellationsCancellationsActions.changePagination),
        withLatestFrom(this.cancellationFacade.params$),
        map(([action, params]) =>
          cancellationsCancellationsActions.changeCancellationsParams({
            param: 'offset',
            value: (action.page - 1) * (params.limit ?? 10),
          })
        )
      )
  );

  buildQueryParams(params: Partial<CancellationModel>): string {
    let httpParams = new HttpParams({ fromObject: params });
    return httpParams.toString();
  }
}
