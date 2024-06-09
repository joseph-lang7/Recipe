import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const navigate = useNavigate();
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
      <div className="flex max-w-[1500px] w-full justify-between">
        <ul className="flex gap-2">
          {navLinks.map((navLink) => (
            <li key={navLink.href}>
              <Link to={navLink.href}>{navLink.title}</Link>
            </li>
          ))}
          {cookies.access_token ? (
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/auth/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
