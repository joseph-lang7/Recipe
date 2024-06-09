import PropTypes from "prop-types";

export const FormGroup = ({
  htmlFor,
  title,
  type,
  register,
  placeholder,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      <label htmlFor={htmlFor}>{title}</label>
      <input
        type={type}
        id={htmlFor}
        {...register}
        className="border pl-3 py-2 rounded-sm w-full focus:outline-none focus:shadow-lg focus:border-blue-500"
        placeholder={placeholder}
      />
      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
};

FormGroup.propTypes = {
  htmlFor: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  register: PropTypes.object,
};
