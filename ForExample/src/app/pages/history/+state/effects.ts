import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../../store/api.service';
import { HttpParams } from '@angular/common/http';
import { Actions as historyHistoryActions } from './actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { ResponsePayload } from '../../../models/response.model';
import { Facade } from './facade';
import { HistoryModel } from '../../../models/history.model';

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private historyFacade: Facade
  ) {}

  onGetHistory = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(historyHistoryActions.getHistory),
        withLatestFrom(this.historyFacade.params$),
        switchMap(([action, params]) =>
          this.apiService
            .get<ResponsePayload<HistoryModel>>(
              'operationhistory?' + this.buildQueryParams(params)
            )
            .pipe(
              map((history) =>
                historyHistoryActions.getHistoryComplete({
                  history: history.data,
                })
              ),
              catchError((error: any) =>
                of(
                  historyHistoryActions.getHistoryError({
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
          historyHistoryActions.changeHistoryParams,
          historyHistoryActions.removeHistoryParam
        ),
        map(() => this.historyFacade.getCustomerHistory())
      ),
    { dispatch: false }
  );

  onPageChange = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(historyHistoryActions.changePagination),
        withLatestFrom(this.historyFacade.params$),
        map(([action, params]) =>
          historyHistoryActions.changeHistoryParams({
            param: 'offset',
            value: (action.page - 1) * (params.limit ?? 10),
          })
        )
      )
  );

  buildQueryParams(params: Partial<HistoryModel>): string {
    let httpParams = new HttpParams({ fromObject: params });
    return httpParams.toString();
  }
}
