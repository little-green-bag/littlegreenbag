import * as EventActions from './actions';
import { Event } from '../models';
// Define state
export interface State {
  loading: boolean; // indicates loading while fetching data
  events: Event[];
}
// Define initial state
const initialState: State = {
  loading: false,
  events: [],
};
// reducer function
export function reducer(
  state = initialState,
  action: EventActions.Actions
): State {
  switch (action.type) {
    case EventActions.FETCH_EVENTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case EventActions.FETCH_EVENTS_SUCCESS: {
      return {
        loading: false,
        events: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
