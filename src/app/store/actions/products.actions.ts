import { createAction, props } from '@ngrx/store';
import { ProductModel } from '@models/index';

export const enum ProductActionTypes {
  LOAD_PRODUCTS = '[Products] Load Products',
  LOAD_PRODUCTS_SUCCESS = '[Products API] Products Loaded Success',
  CREATE_PRODUCT = '[Products] Create Product',
  CREATE_PRODUCT_SUCCESS = '[Products] Create Product success',
  GET_PRODUCT = '[Products] Get Product',
  GET_PRODUCT_SUCCESS = '[Products] Get Product Success',
}

export const loadProducts = createAction(ProductActionTypes.LOAD_PRODUCTS);
export const loadProductsSuccess = createAction(
  ProductActionTypes.LOAD_PRODUCTS_SUCCESS,
  props<{ products: any }>()
);
export const getProduct = createAction(
  ProductActionTypes.GET_PRODUCT,
  props<{ id: string }>()
);
export const getProductSuccess = createAction(
  ProductActionTypes.GET_PRODUCT_SUCCESS,
  props<{ product: ProductModel }>()
);
