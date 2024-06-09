import { FormGroup } from "../form-group/form-group";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export const LoginForm = () => {
  const navigate = useNavigate();
  const [, setCookies] = useCookies(["access_token"]);
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      const { username, password } = data;
      const res = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      setCookies("access_token", res.data.token);
      window.localStorage.setItem("userID", res.data.userID);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center items-center px-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 border shadow-2xl bg-white w-[650px] h-min py-10 px-5 mt-10"
        noValidate
      >
        <h2 className="text-3xl font-bold">Login</h2>
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
        <button className="w-full py-3 bg-blue-500 text-white rounded-full hover:bg-black transition-colors duration-500">
          Login
        </button>
      </form>
    </div>
  );
};
