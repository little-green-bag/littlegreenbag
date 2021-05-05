import { createReducer, on } from '@ngrx/store';
import { AddToCart, RemoveFromCart } from '../actions';

export const initialState: ReadonlyArray<string> = [];

export const cartReducer = createReducer(
  initialState,
  on(RemoveFromCart, (state, { Product }) =>
    state.filter((id) => id !== Product.id)
  ),
  on(AddToCart, (state, { Product }) => {
    console.log('Product to add is ', Product);
    if (state.indexOf(Product.id) > -1) return state;
    return [...state, Product];
  })
);
