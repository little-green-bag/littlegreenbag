import { createAction, props } from '@ngrx/store';

export enum ActionTypes {
  Add = '[Product] Add to cart',
  Remove = '[Product] Remove from cart',
  LoadItems = '[Products] Load items from server',
  LoadSuccess = '[Products] Load success',
}

export const AddToCart = createAction(ActionTypes.Add, props<{ Product }>());
export const GetItems = createAction(ActionTypes.LoadItems);
export const RemoveFromCart = createAction(
  ActionTypes.Remove,
  props<{ Product }>()
);
export const LoadItems = createAction(
  ActionTypes.LoadSuccess,
  props<{ Product }>()
);
