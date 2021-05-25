import { createReducer, on } from '@ngrx/store';
import {
  loadProductsSuccess,
  getProductSuccess,
  addProductImage,
} from '../actions/products.actions';
import { initialAppState } from './../states/products.state';
import { state } from '@angular/animations';
import { startSpinner, stopSpinner } from '@store/actions/spinner.actions';
import { updateProductCreateObject } from '@store/actions/create-product.actions';

const _appReducer = createReducer(
  initialAppState,
  on(loadProductsSuccess, (state, { products }) => {
    return { ...state, products };
  }),
  on(getProductSuccess, (state, { product }) => {
    console.log('product is ', product);
    return { ...state, selectedProduct: product };
  }),
  on(addProductImage, (state, { url }) => {
    const currentImages = state.selectedProduct.images;
    return { ...state, selectedProduct: { ...state.selectedProduct, images: [...currentImages, url] } }
  }),
  on(startSpinner, (state) => {
    return { ...state, loading: true }
  }),
  on(stopSpinner, (state) => {
    return { ...state, loading: false }
  }),
  on(updateProductCreateObject, (state, { product }) => {
    console.log('state to work with is', state);
    return { ...state, selectedProduct: product };
  })
);

export function appReducer(state, action) {
  return _appReducer(state, action);
};