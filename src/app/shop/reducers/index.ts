import { ProductModel } from './../../models/product.model';
import { combineReducers } from '@ngrx/store';
import { productsReducer } from './products.reducer';
import { cartReducer } from './cart.reducer';

interface State {
  products: ProductModel[];
  cart: ProductModel[];
}

export const initialState: State = {
  products: [],
  cart: [],
};

export const reducers = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});
