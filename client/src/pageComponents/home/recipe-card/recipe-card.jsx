import PropTypes from "prop-types";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export const RecipeCard = ({
  recipeImage,
  recipeName,
  recipeCookingTime,
  saveRecipe,
  unSaveRecipe,
  saved,
  icons,
  userId,
  recipeId,
}) => {
  const navigate = useNavigate();
  const handleClick = async (recipeId) => {
    navigate(`recipes/${recipeId}`);
  };
  return (
    <div
      onClick={() => handleClick(recipeId)}
      className="w-full h-auto  border shadow-xl cursor-pointer relative hover:shadow-2xl hover:scale-105 transition-all duration-500 "
    >
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
        {icons &&
          userId &&
          (saved ? (
            <div className="text-3xl text-pink-500">
              <FaHeart onClick={unSaveRecipe} />
            </div>
          ) : (
            <>
              {" "}
              <div className="text-3xl hover:text-neutral-400 transitions-all duration-300">
                <FaRegHeart onClick={saveRecipe} />
              </div>
            </>
          ))}
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
  icons: PropTypes.bool,
  userId: PropTypes.string,
  recipeId: PropTypes.string,
};
