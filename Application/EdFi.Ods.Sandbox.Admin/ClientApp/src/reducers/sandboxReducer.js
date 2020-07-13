import { ACTION_TYPES } from '../constants/action_types';

const initialState = {
  data: [],
};

export const sandboxReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH:
      return Object.assign({}, state, {
        data: state.data.concat(action.payload),
      });

    default:
      return state;
  }
};
