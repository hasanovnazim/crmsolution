import { createAction, props } from '@ngrx/store';
import { httpActionTypeGenerator } from '../../../shared/actionTypeGenerator';
import { Data } from '../../../models/response.model';
import { TaskModel } from '../../../models/task.model';

const getTasks = createAction(httpActionTypeGenerator('tasks', 'GET').start);
const getTasksComplete = createAction(
  httpActionTypeGenerator('tasks', 'GET').complete,
  props<{ tasks: Data<TaskModel> }>()
);
const getTasksError = createAction(
  httpActionTypeGenerator('tasks', 'GET').error,
  props<{ error: any }>()
);
const changeTasksParams = createAction(
  'tasks change param',
  props<{ param: string; value: string | number }>()
);
const removeTasksParam = createAction(
  'tasks remove param',
  props<{ param: string }>()
);

const changePagination = createAction(
  'tasks change Pagination',
  props<{ page: number }>()
);
export const Actions = {
  getTasks,
  getTasksComplete,
  getTasksError,
  changeTasksParams,
  removeTasksParam,
  changePagination,
};
