import { Action, createReducer, on } from '@ngrx/store';
import { ProductModel } from '../../models/index';
import * as CartActions from '../actions/cart.actions';

export interface CartState {
  cart: ProductModel[];
}

export const initialState: CartState = {
  cart: [],
};

export const cartsReducer = createReducer(
  initialState,
  on(CartActions.addItem, (state, { product }) => ({ ...state, product }))
  //   on(ProductActions.loadProductsSuccess, (state, { products }) => {
  //     console.log('state is ', state);
  //     console.log('payload is ', products);
  //     return {
  //       ...state,
  //       products,
  //     };
  //   })
);

export function cartReducer(state: CartState | undefined, action: Action) {
  return cartsReducer(state, action);
}
