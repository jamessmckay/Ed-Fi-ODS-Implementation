import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import recipeReducer from '../features/recipe/recipeSlice';
import sandboxesReducer from '../slices/sandboxesSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    recipeFeature: recipeReducer,
    sandboxesReducer,
  },
  // enhancer: composeWithDevTools()
});
