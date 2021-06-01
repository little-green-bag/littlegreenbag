import { AppState } from '../states/app.state';
import { createSelector } from '@ngrx/store';

export * from './products.selector';



// ______________________

export const _selectCart = (state: { app: AppState }) => {
  return state.app.cart;
};

export const selectCart = createSelector(_selectCart, (state) => {
  return state;
});

export const _selectSelectedProduct = (state: { app: AppState }) => {
  return state.app.selectedProduct;
};

export const selectSelectedProduct = createSelector(
  _selectSelectedProduct,
  (state) => {
    return state;
  }
);

export const _selectLoading = (state: { app: AppState }) => {
  return state.app.loading;
};

export const selectLoading = createSelector(
  _selectLoading,
  (state) => {
    return state;
  }
);

export const _selectSelectedProductImages = (state: { app: AppState }) => {
  return state.app.selectedProduct.images;
};

export const selectSelectedProductImages = createSelector(
  _selectSelectedProductImages,
  (state) => {
    return state;
  }
);

export const _selectUserData = (state: { app: AppState }) => {
  return state.app.user;
};

export const selectUserData = createSelector(
  _selectUserData,
  (state) => {
    return state;
  }
);