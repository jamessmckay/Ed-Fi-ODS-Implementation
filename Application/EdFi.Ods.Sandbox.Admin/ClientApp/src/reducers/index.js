import { combineReducers } from 'redux';
import { sandboxReducers } from './sandboxReducers';

export const reducers = combineReducers({
  sandboxReducers,
});
