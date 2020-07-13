import { combineReducers } from 'redux';
import { sandboxReducer } from './sandboxReducer';

export const reducers = combineReducers({ sandboxes: sandboxReducer });
