import { Link } from "react-router-dom";
export const Navbar = () => {
  const navLinks = [
    { href: "/", title: "Home" },
    { href: "/create-recipe", title: "Create Recipe" },
    { href: "/saved-recipes", title: "Saved Recipes" },
    { href: "/auth", title: "Login" },
  ];
  return (
    <div className="w-full bg-black h-[100px] text-white flex justify-center items-center">
      <div className="flex max-w-[1500px] w-full justify-between">
        <ul className="flex gap-2">
          {navLinks.map((navLink) => (
            <li key={navLink.href}>
              <Link to={navLink.href}>{navLink.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
