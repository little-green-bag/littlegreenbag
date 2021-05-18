import { Action, createReducer, on } from '@ngrx/store';
import { ProductModel } from '../../models/index';
import * as CartActions from '../actions/cart.actions';

// export interface CartState {
//   cart: ProductModel[];
// }

export const initialCartState: CartState = {
  cart: [],
};

export const cartsReducer = createReducer(
  initialCartState
  // on(CartActions.addItem, (state, { product }) => ({ ...state, product }))
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
