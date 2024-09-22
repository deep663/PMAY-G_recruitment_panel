import { ActionReducerMap } from '@ngrx/store';
import { User } from '../models/user.model';
import { Application } from '../models/application.model';
import { userReducer } from './reducers/user.reducer';
import { applicationReducer } from './reducers/application.reducer';


export interface AppState {
  user: User;
  application: Application;
}

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  application: applicationReducer
};
