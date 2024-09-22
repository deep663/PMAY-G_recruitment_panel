import { createReducer, on } from '@ngrx/store';
import { loadUser, updateUser } from '../actions/user.actions';
import { User } from '../../models/user.model';

export const initialState: User = {
  id: '',
  name: '',
  email: '',
  applicationIds: [],
};

export const userReducer = createReducer(
  initialState,
  on(loadUser, (state, { user }) => ({ ...state, ...user })),
  on(updateUser, (state, { user }) => ({ ...state, ...user })),
);
