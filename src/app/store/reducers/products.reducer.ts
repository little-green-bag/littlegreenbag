// import { LoadProductsSuccess } from './../actions/products.actions';
// import { Action, createReducer, on } from '@ngrx/store';
// import { ProductModel } from '@models/index';
// import * as ProductActions from '@actions/products.actions';

// export interface ProductState {
//   products: ProductModel[];
// }

// export const initialProductState: ProductState = {
//   products: [],
// };

// const productReducer = createReducer(
//   initialProductState,
//   on(LoadProductsSuccess(), (state, products) => {
//     return {
//       ...state,
//       ...products,
//     };
//   })
// );

// export function productsReducer(
//   state: ProductState | undefined,
//   action: Action
// ) {
//   return productReducer(state, action);
// }
