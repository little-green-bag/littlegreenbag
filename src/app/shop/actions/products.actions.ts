import { ProductModel } from './../../models/product.model';
import { createAction, props } from '@ngrx/store';

export const productTypes = {
  loadProducts: '[Products] Load Products',
  loadProductsSuccess: '[Products API] Products Loaded Success',
};

export const loadProducts = createAction(
  productTypes.loadProducts,
  props<{ category: string }>()
);

export const loadProductsSuccess = createAction(
  productTypes.loadProductsSuccess,
  props<{ products }>()
);
