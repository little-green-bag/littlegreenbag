import { createAction,  } from '@ngrx/store';

export const enum SpinnerActionTypes {
  START_SPINNER = '[Spinner] Start Spinner',
  STOP_SPINNER = '[Spinner] Stop Spinner',
}

export const startSpinner = createAction(SpinnerActionTypes.START_SPINNER);
export const stopSpinner = createAction(SpinnerActionTypes.STOP_SPINNER);
