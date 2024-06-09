import { FormGroup } from "../form-group/form-group";
import PropTypes from "prop-types";

export const Form = ({
  handleSubmit,
  usernameValue,
  passwordValue,
  handleChange,
  label,
}) => {
  return (
    <div className="flex justify-center items-center px-5">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 border shadow-2xl bg-white w-[650px] h-min py-10 px-5 mt-10"
      >
        <h2 className="text-3xl font-bold">{label}</h2>
        <FormGroup
          htmlFor="username"
          value={usernameValue}
          title="Username"
          type="text"
          onChange={handleChange}
          placeholder="Username"
        />
        <FormGroup
          htmlFor="password"
          value={passwordValue}
          title="Password"
          type="text"
          onChange={handleChange}
          placeholder="Password"
          isPassword={true}
        />
        <button className="w-full py-3 bg-blue-500 text-white rounded-full hover:bg-black transition-colors duration-500">
          {label}
        </button>
      </form>
    </div>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  usernameValue: PropTypes.string,
  passwordValue: PropTypes.string,
  label: PropTypes.string,
};
