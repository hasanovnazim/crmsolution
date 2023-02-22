import { createAction, props } from '@ngrx/store';
import { httpActionTypeGenerator } from 'src/app/shared/actionTypeGenerator';
import { UserModel } from '../../../models/user.model';

const getUsers = createAction(httpActionTypeGenerator('Users', 'GET').start);
const getUsersComplete = createAction(
  httpActionTypeGenerator('Users', 'GET').complete,
  props<{ users: UserModel[] }>()
);
const getUsersError = createAction(
  httpActionTypeGenerator('Users', 'GET').error
);

export const Actions = {
  getUsers,
  getUsersComplete,
  getUsersError,
};
