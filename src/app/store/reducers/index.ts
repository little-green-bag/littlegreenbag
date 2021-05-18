import { createReducer, on } from '@ngrx/store';
import { loadProductsSuccess } from '../actions/products.actions';
import { initialAppState } from './../states/products.state';

const _appReducer = createReducer(
  initialAppState,
  on(loadProductsSuccess, (state, { products }) => {
    return { ...state, products };
  })
);

export function appReducer(state, action) {
  return _appReducer(state, action);
}
