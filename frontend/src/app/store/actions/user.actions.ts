import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loadUser = createAction('[User] Load User', props<{ user: User }>());
export const updateUser = createAction('[User] Update User', props<{ user: User }>());
