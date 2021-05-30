import { createAction, props } from '@ngrx/store';

export const enum UploadTypes {
  UPDATE_UPLOAD = '[Upload] Update Upload',
}

export const updateUpload = createAction(
  UploadTypes.UPDATE_UPLOAD,
  props<any>()
)