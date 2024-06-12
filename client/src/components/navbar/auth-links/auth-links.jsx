import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const AuthLinks = ({ cookies, logout }) => {
  return (
    <>
      {cookies.access_token ? (
        <button
          onClick={logout}
          className="bg-white text-black px-5 hidden lg:block py-2 rounded-full hover:bg-blue-500 transition-colors duration-500 hover:text-white"
        >
          Logout
        </button>
      ) : (
        <Link
          className="bg-white text-black px-5 hidden lg:block  py-2 rounded-full hover:bg-blue-500 transition-colors duration-500 hover:text-white"
          to="/auth/login"
        >
          Login
        </Link>
      )}
    </>
  );
};
AuthLinks.propTypes = {
  cookies: PropTypes.object,
  logout: PropTypes.func,
};
export default AuthLinks;
