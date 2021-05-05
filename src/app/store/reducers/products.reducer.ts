import { createReducer, on } from '@ngrx/store';

import { LoadProducts } from '../actions';
import { ProductModel } from '@models/product.model';

export const initialState: ReadonlyArray<ProductModel> = [];

export const productsReducer = createReducer(
  initialState,
  on(LoadProducts, (state, { Product }) => [...Product])
);
