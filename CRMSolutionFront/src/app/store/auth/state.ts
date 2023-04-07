import { UserModel } from '../../models/user.model';
import { Role } from './roles/rolesList';

export interface AuthState {
  token: string;
  roles: Role[];
  user: UserModel;
  error?: any;
}
export const initialState: AuthState = {
  token: '',
  roles: [],
  user: {} as UserModel,
};
