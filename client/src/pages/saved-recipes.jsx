import { useEffect, useState } from "react";
import axios from "axios";
import { RecipeCard } from "../components/recipe-card/recipe-card";
import { SearchBar } from "../pageComponents/home/search-bar/search-bar";
import { useGetUserId } from "../hooks/useGetUserId";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getFilteredRecipes } from "../functions/get-filtered-recipes";
export const SavedRecipesPage = () => {
  const userID = useGetUserId();
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getSavedRecipes = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/recipes/savedRecipes/${userID}`
      );
      setSavedRecipes(res.data.savedRecipes);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const filteredRecipes = getFilteredRecipes(query, savedRecipes);

  const handleSearchQuery = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    getSavedRecipes();
  }, []);

  return (
    <div className="w-full px-5 py-10 flex flex-col justify-between items-center gap-10">
      <h1 className="text-4xl text-center font-bold">My Favorite Recipes</h1>
      <SearchBar handleChange={handleSearchQuery} />
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 max-w-[2000px] gap-5">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="w-[400px] h-[450px] xl:w-[450px]">
                <Skeleton height="100%" width="100%" />
              </div>
            ))
          ) : filteredRecipes && filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipeImage={recipe.imageUrl}
                recipeName={recipe.name}
                recipeCookingTime={recipe.cookingTime}
                recipeId={recipe._id}
              />
            ))
          ) : (
            <p>You have no favorite recipes</p>
          )}
        </div>
      </div>
    </div>
  );
};
