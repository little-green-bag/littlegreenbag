import { createReducer, on } from '@ngrx/store';

import { LoadItems } from '../actions';
import { ProductModel } from '@models/product.model';

export const initialState: ReadonlyArray<ProductModel> = [];

export const itemsReducer = createReducer(
  initialState,
  on(LoadItems, (state, { Product }) => [...Product])
);
