import { createReducer, on } from '@ngrx/store';
import { loadApplication, updateApplication } from '../actions/application.actions';
import { Application } from '../../models/application.model';

export const initialState: Application = {
  applicationId: '',
  selectedPost: '',
};

export const applicationReducer = createReducer(
  initialState,
  on(loadApplication, (state, { application }) => ({ ...state, ...application })),
  on(updateApplication, (state, { application }) => ({ ...state, ...application })),
);
