import { FormGroup } from "../../form-group/form-group";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onSubmit, checkUsernameExistence } from "./auth-service";
export const RegisterForm = () => {
  const [usernameExists, setUsernameExists] = useState(false);
  const navigate = useNavigate();
  const form = useForm();
  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const usernameValue = watch("username");

  useEffect(() => {
    if (usernameValue) {
      checkUsernameExistence(usernameValue, setUsernameExists);
    }
  }, [usernameValue]);

  const formSubmission = async (data) => {
    await onSubmit(data, navigate, setUsernameExists);
  };

  return (
    <div className="flex justify-center items-center px-5">
      <form
        onSubmit={handleSubmit(formSubmission)}
        className="flex flex-col gap-5 border shadow-2xl bg-white w-[650px] h-min py-10 px-5 mt-10"
        noValidate
      >
        <h2 className="text-3xl font-bold">Register</h2>
        <FormGroup
          htmlFor="username"
          title="Username"
          type="text"
          register={register("username", {
            required: { value: true, message: "Username is required." },
          })}
          placeholder="Username"
          errorMessage={
            usernameExists
              ? "Username already exists."
              : errors.username?.message
          }
        />
        <FormGroup
          htmlFor="password"
          title="Password"
          type="text"
          register={register("password", {
            required: { value: true, message: "Password is required." },
          })}
          placeholder="Password"
          errorMessage={errors.password?.message}
        />
        <button className="w-full py-3 bg-blue-500 text-white rounded-full hover:bg-black transition-colors duration-500">
          Register
        </button>
      </form>
    </div>
  );
};
