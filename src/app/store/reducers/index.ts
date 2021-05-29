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
import { resetProductCreateObject, updateProductCreateObject } from '@store/actions/create-product.actions';

const _appReducer = createReducer(
  initialAppState,
  on(loadProductsSuccess, (state, { products }) => {
    return { ...state, products };
  }),
  on(getProductSuccess, (state, { product }) => {
    console.log('product is ', product);
    return { ...state, selectedProduct: product };
  }),
  on(addProductImage, (state, { image }) => {
    const currentImages = state.selectedProduct.images;
    return { ...state, selectedProduct: { ...state.selectedProduct, images: [...currentImages, image] } }
  }),
  on(removeProductImage, (state, { name }) => {
    const currentImages = state.selectedProduct.images;
    console.log('name to check is ', name);
    console.log('currentImages is ', currentImages);
    const newImages = currentImages.filter(i => i.name !== name);
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
  }),
  on(resetProductCreateObject, (state) => {
    return { ...state, selectedProduct: initialAppState.selectedProduct };
  })
);

export function appReducer(state, action) {
  return _appReducer(state, action);
};