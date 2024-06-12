import PropTypes from "prop-types";
const Logo = ({ isOpen }) => {
  return (
    <h3
      className={`${
        isOpen ? "text-black" : "text-white"
      } flex items-center text-2xl md:text-3xl z-50 transition-colors duration-500`}
    >
      RECIPE
    </h3>
  );
};
Logo.propTypes = {
  isOpen: PropTypes.object,
};
export default Logo;
