import { Action, createReducer, on } from '@ngrx/store';
import { ProductModel } from '../../models/index';
import * as ProductActions from '../actions/products.actions';

export interface State {
  products: ProductModel[];
}

export const initialState: State = {
  products: [],
};

const productsReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => ({ ...state })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => {
    console.log('state is ', state);
    console.log('payload is ', products);
    return {
      ...state,
      products,
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return productsReducer(state, action);
}
