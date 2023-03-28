import { createAction, props } from '@ngrx/store';
import { httpActionTypeGenerator } from '../../shared/actionTypeGenerator';
import { Role } from './roles/rolesList';

const getToken = createAction(
  httpActionTypeGenerator('Token', 'get').start,
  props<{ sessionId: string }>()
);
const getTokenComplete = createAction(
  httpActionTypeGenerator('Token', 'get').complete,
  props<{ token: string }>()
);
const getTokenError = createAction(
  httpActionTypeGenerator('Token', 'get').error,
  props<{ error: any }>()
);
const setRoles = createAction('[Roles] Set Roles', props<{ roles: Role[] }>());
const getUserData = createAction(
  httpActionTypeGenerator('User Data', 'get').start
);
const getUserDataComplete = createAction(
  httpActionTypeGenerator('User Data', 'get').complete,
  props<{ user: any }>()
);
const getUserDataError = createAction(
  httpActionTypeGenerator('User Data', 'get').error,
  props<{ error: any }>()
);

export const Actions = {
  getToken,
  getTokenComplete,
  getTokenError,
  getUserData,
  getUserDataComplete,
  getUserDataError,
  setRoles,
};
