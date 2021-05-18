import { ProductModel } from '@models/index';

export interface AppState {
  products: ProductModel[];
  selectedProduct: ProductModel;
  cart: ProductModel[];
}

export const initialAppState: AppState = {
  products: [],
  selectedProduct: null,
  cart: [],
};
