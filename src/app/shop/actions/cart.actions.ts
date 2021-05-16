import { ProductModel } from '../../models/product.model';
import { createAction, props } from '@ngrx/store';

export const cartTypes = {
  addItem: '[Cart] Add Item',
  removeItem: '[Cart] Remove Item',
};

export const addItem = createAction(
  cartTypes.addItem,
  props<{ product: ProductModel }>()
);

export const removeItem = createAction(
  cartTypes.removeItem,
  props<{ product: ProductModel }>()
);
