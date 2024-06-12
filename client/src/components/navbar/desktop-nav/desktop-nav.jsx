import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const DesktopNav = ({ navLinks, location }) => {
  return (
    <ul className="hidden md:flex gap-7 items-center">
      {navLinks.map((navLink) => (
        <li
          key={navLink.href}
          className={`${
            location.pathname === navLink.href && "border-b-2 border-blue-500"
          } `}
        >
          <Link to={navLink.href}>{navLink.title}</Link>
        </li>
      ))}
    </ul>
  );
};

DesktopNav.propTypes = {
  navLinks: PropTypes.arrayOf(PropTypes.object),
  location: PropTypes.object,
};
export default DesktopNav;
