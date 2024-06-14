import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getRecipe = async (recipeId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/recipes/${recipeId}`
      );
      setRecipe(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getRecipe(recipeId);
  }, [recipeId]);

  return (
    <div className="w-screen flex justify-center">
      <button
        onClick={() => navigate(-1)}
        className="flex self-start mt-10 px-5 py-2 bg-blue-500 rounded-full text-white hover:bg-black transition-colors duration-500"
      >
        Go Back
      </button>
      {isLoading ? (
        <div className="w-[450px] h-[770px] lg:w-[750px] lg:h-[850px] py-10 mt-10 mx-5">
          <Skeleton height="100%" width="100%" />
        </div>
      ) : (
        <div className="border shadow-lg max-w-[800px] py-10 my-10 mx-5 relative">
          <div className="absolute right-[5%] top-[3%] text-lg font-bold">{`${recipe.cookingTime} min`}</div>
          <h2 className="text-3xl md:text-4xl capitalize text-center font-bold mb-5">
            {recipe.name}
          </h2>
          <div className="w-full">
            <img
              src={recipe.imageUrl}
              className="object-cover h-[300px] md:h-[500px] w-full"
            />
          </div>
          <div className="flex flex-col gap-5 md:gap-0 md:flex-row w-full justify-around mt-5 px-5">
            <div className="flex flex-col">
              <h3 className="text-xl">Ingredients:</h3>
              <div className="flex flex-col ml-3">
                {recipe?.ingredients?.map((ingredient, index) => (
                  <div key={index} className="flex gap-1">
                    <p className="capitalize">{`${
                      index + 1
                    }. ${ingredient}`}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl">Steps:</h3>
              <div className="flex flex-col ml-3">
                {recipe?.steps?.map((ingredient, index) => (
                  <div key={index} className="flex gap-1">
                    <p className="capitalize">{`${
                      index + 1
                    }. ${ingredient}`}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
