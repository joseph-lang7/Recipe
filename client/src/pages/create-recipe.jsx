import { useState } from "react";
import { FormGroup } from "../components/form-group/form-group";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";
export const CreateRecipePage = () => {
  const userID = useGetUserId();
  const form = useForm();
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const formSubmission = async (data) => {
    try {
      await axios.post("http://localhost:3001/recipes", data);
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  const [ingredientCount, setIngredientCount] = useState(1);
  const [stepsCount, setStepsCount] = useState(1);
  const handleIngredientAdd = () => {
    setIngredientCount(ingredientCount + 1);
  };
  const handleIngredientSubtract = () => {
    setIngredientCount(ingredientCount - 1);
  };
  const handleStepAdd = () => {
    setStepsCount(stepsCount + 1);
  };
  const handleStepSubtract = () => {
    setStepsCount(stepsCount - 1);
  };

  return (
    <div className="flex justify-center items-center px-5">
      <form
        onSubmit={handleSubmit(formSubmission)}
        className="flex flex-col gap-10 border shadow-2xl bg-white w-[650px] h-min py-10 px-5 mt-10"
        noValidate
      >
        <h2 className="text-3xl font-bold">Create Recipe</h2>
        <FormGroup
          htmlFor="name"
          title="Name"
          type="text"
          register={register("name", {
            required: { value: true, message: "Name is required." },
          })}
          placeholder="Name"
          errorMessage={errors.name?.message}
        />
        <div className="flex flex-col gap-2 items-start">
          {[...Array(ingredientCount)].map((_, index) => (
            <div key={index} className="w-full">
              <FormGroup
                key={index}
                htmlFor={`ingredients[${index}]`}
                title={`Ingredient ${index + 1}`}
                type="text"
                register={register(`ingredients[${index}]`, {
                  required: {
                    value: true,
                    message: `Ingredient ${index + 1} is required.`,
                  },
                })}
                placeholder="Ingredient"
                errorMessage={errors.ingredients?.[index]?.message}
              />
            </div>
          ))}
          <div className="flex gap-2">
            <button
              onClick={handleIngredientAdd}
              className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-black transition-colors duration-500"
              type="button"
            >
              Add
            </button>
            {ingredientCount > 1 && (
              <button
                onClick={handleIngredientSubtract}
                className="px-5 py-2 bg-red-500 text-white rounded-full hover:bg-black transition-colors duration-500"
                type="button"
              >
                Remove
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start">
          {[...Array(stepsCount)].map((_, index) => (
            <div key={index} className="w-full">
              <FormGroup
                key={index}
                htmlFor={`steps[${index}]`}
                title={`Step ${index + 1}`}
                type="text"
                register={register(`steps[${index}]`, {
                  required: {
                    value: true,
                    message: `Step ${index + 1} is required.`,
                  },
                })}
                placeholder="Step"
                errorMessage={errors.steps?.[index]?.message}
              />
            </div>
          ))}
          <div className="flex gap-2">
            <button
              onClick={handleStepAdd}
              className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-black transition-colors duration-500"
              type="button"
            >
              Add
            </button>
            {stepsCount > 1 && (
              <button
                onClick={handleStepSubtract}
                className="px-5 py-2 bg-red-500 text-white rounded-full hover:bg-black transition-colors duration-500"
                type="button"
              >
                Remove
              </button>
            )}
          </div>
        </div>
        <FormGroup
          htmlFor="imageUrl"
          title="Image URL"
          type="text"
          register={register("imageUrl", {
            required: { value: true, message: "Image URL is required." },
          })}
          placeholder="Image URL"
          errorMessage={errors.imageUrl?.message}
        />
        <FormGroup
          htmlFor="cookingTime"
          title="Cooking Time (mins)"
          type="number"
          register={register("cookingTime", {
            required: { value: true, message: "Cooking time is required." },
          })}
          placeholder="Cooking time"
          errorMessage={errors.cookingTime?.message}
        />
        <div className="hidden">
          <label htmlFor="recipeOwner"></label>
          <input
            type="text"
            id="recipeOwner"
            defaultValue={userID}
            {...register("recipeOwner")}
          />
        </div>
        <button className="w-full py-3 bg-blue-500 text-white rounded-full hover:bg-black transition-colors duration-500">
          Create Recipe
        </button>
      </form>
    </div>
  );
};
