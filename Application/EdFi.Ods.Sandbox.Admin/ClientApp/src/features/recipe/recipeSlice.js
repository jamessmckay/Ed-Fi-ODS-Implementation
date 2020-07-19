import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  recipes: [],
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    getRecipes: (state) => {
      state.loading = true;
    },
    getRecipesSuccess: (state, { payload }) => {
      state.recipes = payload.meals;
      state.loading = false;
      state.hasErrors = false;
    },
    getRecipesFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  getRecipes,
  getRecipesSuccess,
  getRecipesFailure,
} = recipeSlice.actions;

export const selectRecipes = (state) => state.recipeFeature;

export default recipeSlice.reducer;

// Asynchronous thunk action
export function fetchRecipes() {
  return async (dispatch) => {
    dispatch(getRecipes());

    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
      const data = await response.json();
      console.log(data);

      dispatch(getRecipesSuccess(data));
    } catch (error) {
      dispatch(getRecipesFailure());
    }
  };
}
