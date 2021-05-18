import { ProductModel } from '@models/index';
import { AppState } from '../states/products.state';
import { createSelector } from '@ngrx/store';

export const _selectCart = (state: { app: AppState }) => {
  return state.app.cart;
};

export const selectCart = createSelector(_selectCart, (state) => {
  return state;
});

export const _selectProducts = (state: { app: AppState }) => {
  return state.app.products;
};

export const selectProducts = createSelector(_selectProducts, (state) => {
  return state;
});
