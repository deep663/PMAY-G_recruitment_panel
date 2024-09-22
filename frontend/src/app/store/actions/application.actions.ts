import { createAction, props } from '@ngrx/store';
import { Application } from '../../models/application.model';

export const loadApplication = createAction('[Application] Load Application', props<{ application: Application }>());
export const updateApplication = createAction('[Application] Update Application', props<{ application: Application }>());
