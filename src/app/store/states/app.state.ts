import { ProductModel } from '@models/index';

export interface UserModel {

}

export interface AppState {
  loading: boolean;
  cart: ProductModel[];
  user: UserModel

  products: ProductModel[];
  selectedProduct: ProductModel;
}

export const initialAppState: AppState = {
  loading: null,
  user: null,
  cart: [],

  products: [],
  selectedProduct: new ProductModel({}),
};
