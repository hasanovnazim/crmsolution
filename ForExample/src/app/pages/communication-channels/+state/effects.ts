import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../../store/api.service';
import { HttpParams } from '@angular/common/http';
import { Actions as notificationsNotificationsActions } from './actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { ResponsePayload } from '../../../models/response.model';
import { Facade } from './facade';
import {
  CommunicationSettings,
  NotificationsModel,
} from '../../../models/notifications.model';

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private communicationFacade: Facade
  ) {}

  onGetNotifications = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(notificationsNotificationsActions.getNotifications),
        withLatestFrom(this.communicationFacade.params$),
        switchMap(([action, params]) =>
          this.apiService
            .get<ResponsePayload<NotificationsModel>>(
              'notificationhistory?' + this.buildQueryParams(params)
            )
            .pipe(
              map((notifications) =>
                notificationsNotificationsActions.getNotificationsComplete({
                  notifications: notifications.data,
                })
              ),
              catchError((error: any) =>
                of(
                  notificationsNotificationsActions.getNotificationsError({
                    ...error,
                  })
                )
              )
            )
        )
      )
  );
  onGetSettings = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(notificationsNotificationsActions.getNotificationsSettings),
        withLatestFrom(this.communicationFacade.settingsParams$),
        switchMap(([action, params]) =>
          this.apiService
            .get<ResponsePayload<CommunicationSettings>>(
              'communicationsettings?' + this.buildQueryParams(params)
            )
            .pipe(
              map((settings) =>
                notificationsNotificationsActions.getNotificationsSettingsComplete(
                  {
                    settings: settings.data,
                  }
                )
              ),
              catchError((error: any) =>
                of(
                  notificationsNotificationsActions.getNotificationsSettingsError(
                    {
                      ...error,
                    }
                  )
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
          notificationsNotificationsActions.changeNotificationsParams,
          notificationsNotificationsActions.removeNotificationsParam
        ),
        map(() => this.communicationFacade.getCustomerNotifications())
      ),
    { dispatch: false }
  );
  onSettingsParamChange = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(
          notificationsNotificationsActions.changeNotificationsSettingsParams,
          notificationsNotificationsActions.removeNotificationsSettingsParam
        ),
        map(() => this.communicationFacade.getCommunicationSettings())
      ),
    { dispatch: false }
  );

  onPageChange = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(notificationsNotificationsActions.changePagination),
        withLatestFrom(this.communicationFacade.params$),
        map(([action, params]) =>
          notificationsNotificationsActions.changeNotificationsParams({
            param: 'offset',
            value: (action.page - 1) * (params.limit ?? 10),
          })
        )
      )
  );
  onSettingsPageChange = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(notificationsNotificationsActions.changeSettingsPagination),
        withLatestFrom(this.communicationFacade.params$),
        map(([action, params]) =>
          notificationsNotificationsActions.changeNotificationsSettingsParams({
            param: 'offset',
            value: (action.page - 1) * (params.limit ?? 10),
          })
        )
      )
  );

  buildQueryParams(params: Partial<NotificationsModel>): string {
    let httpParams = new HttpParams({ fromObject: params });
    return httpParams.toString();
  }
}
