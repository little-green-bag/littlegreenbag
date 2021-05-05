import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ProductModel } from '@models/product.model';

export const selectProducts = createSelector(
  (state: AppState) => state.products,
  (products: Array<ProductModel>) => products
);

export const selectCart = createFeatureSelector<
  AppState,
  ReadonlyArray<string>
>('cart');
