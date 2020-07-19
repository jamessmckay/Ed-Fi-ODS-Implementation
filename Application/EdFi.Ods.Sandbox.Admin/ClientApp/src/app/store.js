import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import recipeReducer from '../features/recipe/recipeSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    recipeFeature: recipeReducer,
  },
  // enhancer: composeWithDevTools()
});
