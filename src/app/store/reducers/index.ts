import { createReducer, on } from '@ngrx/store';
import {
  loadProductsSuccess,
  getProductSuccess,
  addProductImage,
  removeProductImage
} from '../actions/products.actions';
import { initialAppState } from './../states/app.state';
import { startSpinner, stopSpinner } from '@store/actions/spinner.actions';
import { resetProductCreateObject, setProductCreateObject, updateProductCreateObject } from '@store/actions/create-product.actions';
import { setUserData } from '@actions/user.actions';

const _appReducer = createReducer(
  initialAppState,
  on(loadProductsSuccess, (state, { products }) => {
    return { ...state, products };
  }),

  on(getProductSuccess, (state, { product }) => {
    return { ...state, selectedProduct: product };
  }),
  on(addProductImage, (state, image) => {
    const currentImages = state.selectedProduct.images;
    const updatedImages = [...currentImages, { name: image.name, url: image.url }];
    return { ...state, selectedProduct: { ...state.selectedProduct, images: updatedImages } }
  }),
  on(removeProductImage, (state, image) => {
    const currentImages = state.selectedProduct.images;
    const updatedImages = currentImages.filter(i => {
      return i.url !== image.url;
    });
    return { ...state, selectedProduct: { ...state.selectedProduct, images: updatedImages.length ? updatedImages : [] } }
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
  }),
  on(setProductCreateObject, (state, props) => {
    return { ...state, selectedProduct: props }
  }),
  on(setUserData, (state, user) => {
    return { ...state, user }
  })
);

export function appReducer(state, action) {
  return _appReducer(state, action);
};