import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import { RecipeCard } from "../components/recipe-card/recipe-card";
import { SearchBar } from "../pageComponents/home/search-bar/search-bar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getFilteredRecipes } from "../functions/get-filtered-recipes";
import { Link } from "react-router-dom";
export const MyRecipes = () => {
  const userId = useGetUserId();
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  const getUserCreatedRecipes = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/recipes/myRecipes/${userId}`
      );
      setRecipes(res.data.createdRecipes);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserCreatedRecipes();
  }, []);

  const filteredRecipes = getFilteredRecipes(query, recipes);
  const handleSearchQuery = (event) => {
    setQuery(event.target.value);
  };
  return (
    <div className="w-full px-5 py-10 flex flex-col justify-between items-center gap-10">
      <h1 className="text-3xl md:text-4xl font-bold">My Recipes</h1>

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
                icons={true}
                recipeId={recipe._id}
              />
            ))
          ) : recipes.length === 0 ? (
            <div className="flex flex-col gap-2">
              <p>You haven&apos;t created any recipes</p>
              <Link
                className="underline hover:no-underline"
                to="/create-recipe"
              >
                Create one?
              </Link>
            </div>
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};
