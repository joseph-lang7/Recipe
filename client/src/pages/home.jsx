import { useEffect, useState } from "react";
import axios from "axios";
import { RecipeCard } from "../pageComponents/home/recipe-card/recipe-card";
export const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const getRecipes = async () => {
    const res = await axios.get("http://localhost:3001/recipes");
    setRecipes(res.data);
  };
  useEffect(() => {
    getRecipes();
  }, []);
  return (
    <div className="w-full px-5 py-10 flex justify-between">
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-3 2xl:grid-cols-4 max-w-[2000px] gap-5">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipeImage={recipe.imageUrl}
              recipeName={recipe.name}
              recipeCookingTime={recipe.cookingTime}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
