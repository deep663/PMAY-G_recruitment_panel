import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../../models/user.model';

export const selectUser = createFeatureSelector<User>('user');

export const selectUserId = createSelector(
  selectUser,
  (state: User) => state.id
);

export const selectUserName = createSelector(
  selectUser,
  (state: User) => state.name
);

export const selectUserEmail = createSelector(
  selectUser,
  (state: User) => state.email
);

export const selectUserApplications = createSelector(
  selectUser,
  (state: User) => state.applicationIds
);
