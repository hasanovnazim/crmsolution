import { Data } from '../../../models/response.model';
import { TaskModel, TaskParams } from '../../../models/task.model';

export interface TasksState {
  loading: boolean;
  tasks: Data<TaskModel>;
  params: TaskParams;
  pagination: number;
  error: any;
}
export const initialState: TasksState = {
  loading: true,
  tasks: { result: [], count: 0 },
  params: {
    limit: 10,
    offset: 0,
  },
  pagination: 1,
  error: null,
};
