import { useEffect, useState } from "react";
import axios from "axios";
import { RecipeCard } from "../pageComponents/home/recipe-card/recipe-card";

export const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const getRecipes = async () => {
    const res = await axios.get("http://localhost:3001/recipes");
    setRecipes(res.data);
  };
  useEffect(() => {
    getRecipes();
  }, []);

  const getFilteredRecipes = () => {
    if (!query) {
      return recipes;
    }
    return recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
  };
  const filteredRecipes = getFilteredRecipes();
  return (
    <div className="w-full px-5 py-10 flex flex-col justify-between items-center gap-10">
      <div className="w-full flex justify-center max-w-[2000px]">
        <input
          type="text"
          name="search"
          placeholder="Enter a recipe name"
          id="search"
          onChange={(event) => setQuery(event.target.value)}
          className="pl-5 py-3 border-[3px] rounded-full focus:outline-none focus:border-blue-500 w-3/4 xl:w-1/2 border-black"
        />
      </div>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 max-w-[2000px] gap-5">
          {filteredRecipes && filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipeImage={recipe.imageUrl}
                recipeName={recipe.name}
                recipeCookingTime={recipe.cookingTime}
              />
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};
