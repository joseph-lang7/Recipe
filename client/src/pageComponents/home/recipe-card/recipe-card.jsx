import PropTypes from "prop-types";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export const RecipeCard = ({
  recipeImage,
  recipeName,
  recipeCookingTime,
  saveRecipe,
  unSaveRecipe,
  saved,
}) => {
  return (
    <div className="w-[300px] sm:w-[400px] h-auto  border shadow-xl cursor-pointer relative">
      <div className="w-full h-[300px]">
        <img
          src={recipeImage ? recipeImage : "/no-image.png"}
          className="object-cover h-full "
        />
      </div>
      <div className="flex px-5 py-5 items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-2xl capitalize">{recipeName}</h3>
          <div className="flex gap-1">
            <p className="font-bold">Cooking Time:</p>
            <p>{recipeCookingTime} mins</p>
          </div>
        </div>
        {saved ? (
          <div className="text-3xl text-pink-500">
            <FaHeart onClick={unSaveRecipe} />
          </div>
        ) : (
          <>
            {" "}
            <div className="text-3xl ">
              <FaRegHeart onClick={saveRecipe} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipeImage: PropTypes.string,
  recipeName: PropTypes.string,
  recipeCookingTime: PropTypes.number,
  saveRecipe: PropTypes.func,
  unSaveRecipe: PropTypes.func,
  saved: PropTypes.bool,
};
