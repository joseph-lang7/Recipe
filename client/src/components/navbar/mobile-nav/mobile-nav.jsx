import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const MobileNav = ({ navLinks, cookies, isOpen, logout, setOpen }) => {
  return (
    <ul
      className={`${
        isOpen ? "translate-y-0" : "translate-y-[-100%]"
      } w-screen h-screen flex flex-col md:hidden gap-10 items-center justify-center bg-white text-black transition-all duration-500 inset-0 fixed z-30`}
    >
      {navLinks?.map((navLink) => (
        <li key={navLink.href} className="text-3xl">
          <Link
            onClick={() => {
              setOpen(false);
            }}
            to={navLink.href}
          >
            {navLink.title}
          </Link>
        </li>
      ))}
      <li>
        {cookies.access_token ? (
          <Link onClick={() => [logout(), setOpen(false)]} className="text-3xl">
            Logout
          </Link>
        ) : (
          <Link
            onClick={() => {
              setOpen(false);
            }}
            className="text-3xl"
            to="/auth/login"
          >
            Login
          </Link>
        )}
      </li>
    </ul>
  );
};

MobileNav.propTypes = {
  navLinks: PropTypes.arrayOf(PropTypes.object),
  isOpen: PropTypes.bool,
  cookies: PropTypes.object,
  logout: PropTypes.func,
  setOpen: PropTypes.func,
};
export default MobileNav;
