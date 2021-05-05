import { ProductModel } from '@models/product.model';

export interface AppState {
  products: ReadonlyArray<ProductModel>;
  cart: ReadonlyArray<ProductModel>;
}
