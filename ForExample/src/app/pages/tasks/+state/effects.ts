import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../../store/api.service';
import { HttpParams } from '@angular/common/http';
import { Actions as tasksTasksActions } from './actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { ResponsePayload } from '../../../models/response.model';
import { Facade } from './facade';
import { TaskModel } from '../../../models/task.model';
import { CancellationModel } from '../../../models/cancellation.model';

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private taskFacade: Facade
  ) {}

  onGetTasks = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(tasksTasksActions.getTasks),
        withLatestFrom(this.taskFacade.params$),
        switchMap(([action, params]) =>
          this.apiService
            .get<ResponsePayload<TaskModel>>(
              'task' + this.buildQueryParams(params)
            )
            .pipe(
              map((tasks) =>
                tasksTasksActions.getTasksComplete({
                  tasks: tasks.data,
                })
              ),
              catchError((error: any) =>
                of(
                  tasksTasksActions.getTasksError({
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
          tasksTasksActions.changeTasksParams,
          tasksTasksActions.removeTasksParam
        ),
        map(() => this.taskFacade.getTasks())
      ),
    { dispatch: false }
  );

  onPageChange = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(tasksTasksActions.changePagination),
        withLatestFrom(this.taskFacade.params$),
        map(([action, params]) =>
          tasksTasksActions.changeTasksParams({
            param: 'offset',
            value: (action.page - 1) * (params.limit ?? 10),
          })
        )
      )
  );

  buildQueryParams(params: Partial<CancellationModel>): string {
    let httpParams = new HttpParams({ fromObject: params });
    return `?${httpParams.toString()}`;
  }
}
