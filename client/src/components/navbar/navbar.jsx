import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navLinks = [
    { href: "/", title: "Home" },
    { href: "/create-recipe", title: "Create Recipe" },
    { href: "/saved-recipes", title: "Saved Recipes" },
  ];

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth/login");
  };

  return (
    <div className="w-full bg-black h-[100px] text-white flex justify-center items-center">
      <div className="flex w-full max-w-[2000px] justify-between px-5 md:px-0 md:justify-around">
        <div className="flex items-center text-2xl md:text-3xl">RECIPE</div>
        <ul className="hidden md:flex gap-7 items-center">
          {navLinks.map((navLink) => (
            <li
              key={navLink.href}
              className={`${
                location.pathname === navLink.href &&
                "border-b-2 border-blue-500"
              } `}
            >
              <Link to={navLink.href}>{navLink.title}</Link>
            </li>
          ))}
        </ul>
        {cookies.access_token ? (
          <button
            onClick={logout}
            className="bg-white text-black px-5 py-2 rounded-full hover:bg-blue-500 transition-colors duration-500 hover:text-white"
          >
            Logout
          </button>
        ) : (
          <Link
            className="bg-white text-black px-5 py-2 rounded-full hover:bg-blue-500 transition-colors duration-500 hover:text-white"
            to="/auth/login"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
