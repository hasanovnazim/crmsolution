import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../../store/api.service';
import { HttpParams } from '@angular/common/http';
import { CustomerContactsModel } from '../../../models/customer-contacts.model';
import { Actions as customerContactsActions } from './actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { ResponsePayload } from '../../../models/response.model';
import { Facade } from './facade';

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private customerFacade: Facade
  ) {}

  onGetCustomerContacts = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(customerContactsActions.getContacts),
        withLatestFrom(this.customerFacade.params$),
        switchMap(([action, params]) =>
          this.apiService
            .get<ResponsePayload<CustomerContactsModel>>(
              'contacts?' + this.buildQueryParams(params)
            )
            .pipe(
              map((contacts) =>
                customerContactsActions.getContactsComplete({
                  contacts: contacts.data,
                })
              ),
              catchError((error: any) =>
                of(customerContactsActions.getContactsError({ ...error }))
              )
            )
        )
      )
  );

  onParamChange = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(
          customerContactsActions.changeContactsParams,
          customerContactsActions.removeContactsParam
        ),
        map(() => this.customerFacade.getCustomerContacts())
      ),
    { dispatch: false }
  );

  onPageChange = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(customerContactsActions.changePagination),
        withLatestFrom(this.customerFacade.params$),
        map(([action, params]) =>
          customerContactsActions.changeContactsParams({
            param: 'offset',
            value: (action.page - 1) * (params.limit ?? 10),
          })
        )
      )
  );

  buildQueryParams(params: Partial<CustomerContactsModel>): string {
    let httpParams = new HttpParams({ fromObject: params });
    return httpParams.toString();
  }
}
