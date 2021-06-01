import { AppState } from '../states/app.state';
import { createSelector } from '@ngrx/store';

export const _selectProducts = (state: { app: AppState }) => {
  return state.app.products;
};

export const selectProducts = createSelector(_selectProducts, (state) => {
  return state;
});