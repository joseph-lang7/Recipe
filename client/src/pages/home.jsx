import { useEffect, useState } from "react";
import axios from "axios";
import { RecipeCard } from "../pageComponents/home/recipe-card/recipe-card";
import { SearchBar } from "../pageComponents/home/search-bar/search-bar";

export const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const getRecipes = async () => {
    const res = await axios.get("http://localhost:3001/recipes");
    setIsLoading(false);

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

  const handleSearchQuery = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="w-full px-5 py-10 flex flex-col justify-between items-center gap-10">
      <SearchBar handleChange={handleSearchQuery} />
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 max-w-[2000px] gap-5">
          {isLoading ? (
            <></>
          ) : filteredRecipes && filteredRecipes.length > 0 ? (
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
