

import { createAction, props } from '@ngrx/store';
import { ProductModel } from '@models/index';

export const enum ProductCreateTypes {
  UPDATE_PRODUCT_CREATE_OBJECT = '[Product Create] Update Product Create Object',
}

export const updateProductCreateObject = createAction(
  ProductCreateTypes.UPDATE_PRODUCT_CREATE_OBJECT,
  props<{ key: string, value: string | number | string[] }>()
)