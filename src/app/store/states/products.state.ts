import { ProductModel } from '@models/index';

export interface AppState {
  products: ProductModel[];
  selectedProduct: ProductModel;
  cart: ProductModel[];
  loading: boolean;
  user: {}
}

export const initialAppState: AppState = {
  products: [],
  selectedProduct: new ProductModel({}),
  cart: [],
  loading: null,
  user: null
};
