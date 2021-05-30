import { createAction, props } from '@ngrx/store';
import { ImageModel, ProductModel } from '@models/index';

export const enum ProductActionTypes {
  LOAD_PRODUCTS = '[Products] Load Products',
  LOAD_PRODUCTS_SUCCESS = '[Products API] Load Products Success',
  CREATE_PRODUCT = '[Products] Create Product',
  CREATE_PRODUCT_SUCCESS = '[Products] Create Product success',
  GET_PRODUCT = '[Products] Get Product',
  GET_PRODUCT_SUCCESS = '[Products] Get Product Success',
  ADD_PRODUCT_IMAGE = '[Products] Add Product Image',
  REMOVE_PRODUCT_IMAGE = '[Products] Remove Product Image'
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
export const addProductImage = createAction(
  ProductActionTypes.ADD_PRODUCT_IMAGE,
  props<{ image: any }>()
)
export const removeProductImage = createAction(
  ProductActionTypes.REMOVE_PRODUCT_IMAGE,
  props<any>()
)