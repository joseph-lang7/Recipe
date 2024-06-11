import { useEffect, useState } from "react";
import axios from "axios";
import { RecipeCard } from "../pageComponents/home/recipe-card/recipe-card";
import { SearchBar } from "../pageComponents/home/search-bar/search-bar";
import { useGetUserId } from "../hooks/useGetUserId";
export const SavedRecipesPage = () => {
  const userID = useGetUserId();
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getSavedRecipes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/recipes/savedRecipes/${userID}`
      );
      setSavedRecipes(res.data.savedRecipes);
      setIsLoading(false);
      console.log(savedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const getFilteredRecipes = () => {
    if (!query) {
      return savedRecipes;
    }
    return savedRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
  };
  const filteredRecipes = getFilteredRecipes();

  const handleSearchQuery = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    getSavedRecipes();
  }, []);

  return (
    <div className="w-full px-5 py-10 flex flex-col justify-between items-center gap-10">
      <h1 className="text-4xl font-bold">My Favorite Recipes</h1>
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
            <p>You have no saved recipes</p>
          )}
        </div>
      </div>
    </div>
  );
};
