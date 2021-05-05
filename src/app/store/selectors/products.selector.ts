import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductModel } from '@models/product.model';
import { AppState } from './app.state';

export const selectProducts = createSelector(
  (state: AppState) => state.products,
  (products: Array<ProductModel>) => products
);

export const selectCart = createFeatureSelector<
  AppState,
  ReadonlyArray<string>
>('cart');
