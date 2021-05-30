import { ProductModel } from '@models/product.model';
import { createAction, props } from '@ngrx/store';

export const enum CartActionTypes {
  ADD_PRODUCT = 'ADD_PRODUCT',
  REMOVE_PRODUCT = 'REMOVE_PRODUCT',
}

export const addProduct = createAction(
  CartActionTypes.ADD_PRODUCT,
  props<{ payload: ProductModel }>()
)
export const removeProduct = createAction(
  CartActionTypes.REMOVE_PRODUCT,
  props<{ payload: ProductModel }>()
)