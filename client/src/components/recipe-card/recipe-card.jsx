import PropTypes from "prop-types";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

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
  const handleClick = () => {
    navigate(`/recipes/${recipeId}`);
  };
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="max-w-full max-h-full w-[400px] h-[450px] xl:w-[450px] border shadow-xl cursor-pointer relative hover:shadow-2xl hover:scale-105 transition-all duration-500 "
    >
      <div className="w-full h-[300px]">
        <img
          src={recipeImage ? recipeImage : "/no-image.png"}
          className="object-cover h-full "
        />
      </div>
      <div className="flex items-center justify-between relative">
        <button
          onClick={handleClick}
          className={`${
            isHovered
              ? "opacity-100 translate-y-2"
              : "opacity-0 translate-y-[-10px]"
          } absolute top-0 w-full flex justify-center hover:text-blue-500 transition-all duration-500 items-center`}
        >
          <p>Learn More</p>
          <div className="text-2xl">
            <IoIosArrowRoundForward />
          </div>
        </button>
        <div className="flex flex-col p-5 mt-3 text-xs sm:text-base gap-2">
          <h3 className="text-xl md:text-2xl capitalize">{recipeName}</h3>
          <div className="flex gap-1">
            <p className="font-bold">Cooking Time:</p>
            <p>{recipeCookingTime} mins</p>
          </div>
        </div>
        {icons &&
          userId &&
          (saved ? (
            <button className="text-2xl md:text-3xl text-pink-500 p-5">
              <FaHeart onClick={unSaveRecipe} />
            </button>
          ) : (
            <>
              {" "}
              <div className="text-2xl md:text-3xl hover:text-neutral-400 transitions-all duration-300 p-5">
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
