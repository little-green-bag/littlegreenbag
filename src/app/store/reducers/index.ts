import { createReducer, on } from '@ngrx/store';
import {
  loadProductsSuccess,
  getProductSuccess,
} from '../actions/products.actions';
import { initialAppState } from './../states/products.state';

const _appReducer = createReducer(
  initialAppState,
  on(loadProductsSuccess, (state, { products }) => {
    return { ...state, products };
  }),
  on(getProductSuccess, (state, { product }) => {
    return { ...state, selectedProduct: product };
  })
);

export function appReducer(state, action) {
  return _appReducer(state, action);
}
