

import { createAction, props } from '@ngrx/store';

export const enum ProductCreateTypes {
  UPDATE_PRODUCT_CREATE_OBJECT = '[Product Create] Update Product Create Object',
  RESET_PRODUCT_CREATE_OBJECT = '[Product Create] Reset Product Create Object',
  SET_PRODUCT_CREATE_OBJECT = '[Product Create] Set Product Create Object'
}

export const setProductCreateObject = createAction(
  ProductCreateTypes.SET_PRODUCT_CREATE_OBJECT,
  props<any>()
)
export const updateProductCreateObject = createAction(
  ProductCreateTypes.UPDATE_PRODUCT_CREATE_OBJECT,
  props<{ key: string, value: string | number | string[] }>()
)
export const resetProductCreateObject = createAction(
  ProductCreateTypes.RESET_PRODUCT_CREATE_OBJECT,
)