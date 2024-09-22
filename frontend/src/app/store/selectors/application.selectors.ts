import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Application } from '../../models/application.model';

export const selectApplication = createFeatureSelector<Application>('application');

export const selectSelectedPost = createSelector(
  selectApplication,
  (state: Application) => state.selectedPost
);

export const selectApplicationId = createSelector(
  selectApplication,
  (state: Application) => state.applicationId
);
