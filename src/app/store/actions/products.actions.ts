import { createAction, props } from '@ngrx/store';
import { ProductModel } from '@models/index';

export const enum ProductActionTypes {
  LOAD_PRODUCTS = '[Products] Load Products',
  LOAD_PRODUCTS_SUCCESS = '[Products API] Products Loaded Success',
  CREATE_PRODUCT = '[Products] Create Product',
  CREATE_PRODUCT_SUCCESS = '[Products] Create Product success',
  REMOVE_PRODUCT = '[Products] Remove Product',
}

export const loadProducts = createAction(ProductActionTypes.LOAD_PRODUCTS);
export const loadProductsSuccess = createAction(
  ProductActionTypes.LOAD_PRODUCTS_SUCCESS,
  props<{ products: any }>()
);
