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
import { updateUpload } from '@actions/upload.actions';

const _appReducer = createReducer(
  initialAppState,
  on(loadProductsSuccess, (state, { products }) => {
    return { ...state, products };
  }),
  on(getProductSuccess, (state, { product }) => {
    return { ...state, selectedProduct: product };
  }),
  on(addProductImage, (state, { image }) => {
    const currentImages = state.selectedProduct.images;
    const updatedImages = [...currentImages, image];
    return { ...state, selectedProduct: { ...state.selectedProduct, images: updatedImages } }
  }),
  on(removeProductImage, (state, { image }) => {
    const currentImages = state.selectedProduct.images;
    if (image) {
      const newImages = currentImages.filter(i => i.url !== image.url);
      return { ...state, selectedProduct: { ...state.selectedProduct, images: [...newImages] } }
    } else {
      return { ...state };
    }
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