import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../../store/api.service';
import { HttpParams } from '@angular/common/http';
import { Actions as smsCheckListSmsCheckListActions } from './actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { ResponsePayload } from '../../../models/response.model';
import { Facade } from './facade';
import { SmsCheckListModel } from '../../../models/sms-check-list.model';

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private smsCheckListFacade: Facade
  ) {}

  onGetSmsCheckList = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(smsCheckListSmsCheckListActions.getSmsCheckList),
        withLatestFrom(this.smsCheckListFacade.params$),
        switchMap(([action, params]) =>
          this.apiService
            .get<ResponsePayload<SmsCheckListModel>>(
              'smschecklist?' + this.buildQueryParams(params)
            )
            .pipe(
              map((smsCheckList) =>
                smsCheckListSmsCheckListActions.getSmsCheckListComplete({
                  smsCheckList: smsCheckList.data,
                })
              ),
              catchError((error: any) =>
                of(
                  smsCheckListSmsCheckListActions.getSmsCheckListError({
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
          smsCheckListSmsCheckListActions.changeSmsCheckListParams,
          smsCheckListSmsCheckListActions.removeSmsCheckListParam
        ),
        map(() => this.smsCheckListFacade.getCustomerSmsCheckList())
      ),
    { dispatch: false }
  );

  onPageChange = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(smsCheckListSmsCheckListActions.changePagination),
        withLatestFrom(this.smsCheckListFacade.params$),
        map(([action, params]) =>
          smsCheckListSmsCheckListActions.changeSmsCheckListParams({
            param: 'offset',
            value: (action.page - 1) * (params.limit ?? 10),
          })
        )
      )
  );

  buildQueryParams(params: Partial<SmsCheckListModel>): string {
    let httpParams = new HttpParams({ fromObject: params });
    return httpParams.toString();
  }
}
