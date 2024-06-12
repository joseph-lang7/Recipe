import { FormGroup } from "../../../../components/form-group/form-group";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { onSubmit } from "./auth-service";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [, setCookies] = useCookies(["access_token"]);
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const formSubmission = async (data) => {
    await onSubmit(data, setInvalidCredentials, navigate, setCookies);
  };
  return (
    <div className="flex justify-center items-center px-5">
      <form
        onSubmit={handleSubmit(formSubmission)}
        className="flex flex-col gap-5 border shadow-2xl bg-white w-[650px] h-min py-10 px-5 mt-10"
        noValidate
      >
        <h2 className="text-3xl font-bold">Login</h2>
        {invalidCredentials && (
          <p className="text-red-500">Incorrect username or password.</p>
        )}
        <FormGroup
          htmlFor="username"
          title="Username"
          type="text"
          register={register("username", {
            required: { value: true, message: "Username is required." },
          })}
          placeholder="Username"
          errorMessage={errors.username?.message}
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
        <div>
          <h3>
            Here are login credentials for testing the site, or feel free to
            make an account!
          </h3>
          <div className="flex gap-2">
            <p>
              username: <span className="text-blue-500">admin</span>
            </p>
            <p>
              password: <span className="text-blue-500">password</span>
            </p>
          </div>
        </div>
        <Link to="/auth/register" className="underline hover:no-underline">
          Don&apos;t have an account? Create one
        </Link>
        <button className="w-full py-3 bg-blue-500 text-white rounded-full hover:bg-black transition-colors duration-500">
          Login
        </button>
      </form>
    </div>
  );
};
