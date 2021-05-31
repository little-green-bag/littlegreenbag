

import { createAction, props } from '@ngrx/store';

export const enum UserDataTypes {
  SET_USER_DATA = '[User Data] Set User Data',
  GET_USER_DATA = '[User Data] Get User Data',
}

export const setUserData = createAction(
  UserDataTypes.SET_USER_DATA,
  props<any>()
)