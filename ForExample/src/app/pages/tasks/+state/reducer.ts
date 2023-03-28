import { Action, createReducer, on } from '@ngrx/store';
import { TasksState } from './state';
import { initialState } from './state';
import { Actions } from './actions';
import { TaskModel, TaskParams } from '../../../models/task.model';

export const reducer = createReducer(
  initialState,
  on(Actions.getTasks, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getTasksComplete, (state, { tasks }) => ({
    ...state,
    tasks: {
      ...tasks,
      result: tasks.result.map((v) => ({ ...v, expand: true })),
    },
    loading: false,
  })),
  on(Actions.getTasksError, (state, error) => ({
    ...state,
    loading: false,
    error,
  })),
  on(Actions.changeTasksParams, (state, parameter) => ({
    ...state,
    params: {
      ...state.params,
      [parameter.param]: parameter.value,
    },
  })),
  on(Actions.removeTasksParam, (state, { param }) => {
    const newParams: TaskParams = {
      ...state.params,
    };

    // @ts-ignore
    delete newParams[param];
    return {
      ...state,
      params: {
        ...newParams,
      },
    };
  })
);

export function reducerFactory(state: TasksState | undefined, actions: Action) {
  return reducer(state, actions);
}
