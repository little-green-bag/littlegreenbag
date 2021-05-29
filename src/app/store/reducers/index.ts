import { createReducer, on } from '@ngrx/store';
import {
  loadProductsSuccess,
  getProductSuccess,
  addProductImage,
  removeProductImage
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
    console.log('received url ', url);
    const currentImages = state.selectedProduct.images;
    return { ...state, selectedProduct: { ...state.selectedProduct, images: [...currentImages, url] } }
  }),
  on(removeProductImage, (state, { url }) => {
    console.log('received url ', url);
    const currentImages = state.selectedProduct.images;
    const newImages = currentImages.filter(i => i !== url);
    return { ...state, selectedProduct: { ...state.selectedProduct, images: [...newImages] } }
  }),
  on(startSpinner, (state) => {
    return { ...state, loading: true }
  }),
  on(stopSpinner, (state) => {
    return { ...state, loading: false }
  }),
  on(updateProductCreateObject, (state, { key, value }) => {
    let newState = { ...state.selectedProduct };
    newState[key] = value;
    return { ...state, selectedProduct: newState };
  })
);

export function appReducer(state, action) {
  return _appReducer(state, action);
};