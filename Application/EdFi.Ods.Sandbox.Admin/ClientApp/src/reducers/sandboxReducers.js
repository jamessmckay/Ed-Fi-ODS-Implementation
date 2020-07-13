import { ACTION_TYPES } from '../constants/action_types';

const initialState = {
  sandboxes: [],
};

export const sandboxReducers = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH:
      return {
        ...state,
        sandboxes: [...action.payload],
      };

    default:
      return state;
  }
};
