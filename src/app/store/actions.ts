import { createAction, props } from '@ngrx/store';

export enum ActionTypes {
  Add = '[Product] Add to cart',
  Remove = '[Product] Remove from cart',
  LoadProducts = '[Products] Load products from server',
  LoadSuccess = '[Products] Load success',
}

export const AddToCart = createAction(ActionTypes.Add, props<{ Product }>());
export const GetProducts = createAction(ActionTypes.LoadProducts);
export const RemoveFromCart = createAction(
  ActionTypes.Remove,
  props<{ Product }>()
);
export const LoadProducts = createAction(
  ActionTypes.LoadSuccess,
  props<{ Product }>()
);
