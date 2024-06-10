import { useState } from "react";
import PropTypes from "prop-types";
export const RecipeCard = ({ recipeImage, recipeName, recipeCookingTime }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="w-[400px] h-auto  border shadow-xl cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`${
          isHovered ? "w-full opacity-50" : "opacity-0 w-1/2 "
        }  h-full absolute bg-black  transition-all duration-500`}
      ></div>
      <div className="w-full h-[300px]">
        <img
          src={recipeImage ? recipeImage : "/no-image.png"}
          className="object-cover h-full "
        />
      </div>
      <div className="flex flex-col px-5 py-5">
        <h3 className="text-2xl capitalize">{recipeName}</h3>
        <div className="flex gap-1">
          <p className="font-bold">Cooking Time:</p>
          <p>{recipeCookingTime} mins</p>
        </div>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipeImage: PropTypes.string,
  recipeName: PropTypes.string,
  recipeCookingTime: PropTypes.number,
};
