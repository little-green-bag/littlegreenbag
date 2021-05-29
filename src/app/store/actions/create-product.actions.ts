

import { createAction, props } from '@ngrx/store';

export const enum ProductCreateTypes {
  UPDATE_PRODUCT_CREATE_OBJECT = '[Product Create] Update Product Create Object',
  RESET_PRODUCT_CREATE_OBJECT = '[Product Reset] Reset Product Create Object',
}

export const updateProductCreateObject = createAction(
  ProductCreateTypes.UPDATE_PRODUCT_CREATE_OBJECT,
  props<{ key: string, value: string | number | string[] }>()
)
export const resetProductCreateObject = createAction(
  ProductCreateTypes.RESET_PRODUCT_CREATE_OBJECT,
)