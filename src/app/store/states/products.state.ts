import { ProductModel } from '@models/index';

export interface AppState {
  products: ProductModel[];
  cart: ProductModel[];
}

export const initialAppState: AppState = {
  products: [],
  cart: [],
};
