// see https://medium.com/dev-genius/async-api-fetching-with-redux-toolkit-2020-8623ff9da267

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipes, selectRecipes } from "./recipeSlice";

export const Recipe = () => {
  const dispatch = useDispatch();
  const { recipes, loading, hasErrors } = useSelector(selectRecipes);

  // dispatch our thunk when component first mounts
  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  // error handling & map successful query data
  const renderRecipes = () => {
    if (loading) return <p>Loading recipes...</p>;
    if (hasErrors) return <p>Cannot display recipes...</p>;

    return recipes.map((recipe) => (
      <div key={recipe.idMeal} className="tile">
        <h2>{recipe.strMeal}</h2>
        <img src={recipe.strMealThumb} alt="" />
      </div>
    ));
  };

  return (
    <section>
      <h1>Recipes</h1>
      <div className="content">{renderRecipes()}</div>
    </section>
  );
};
