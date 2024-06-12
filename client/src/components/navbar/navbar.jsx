import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Hamburger from "hamburger-react";
import { useGetUserId } from "../../hooks/useGetUserId";
import { MobileNav, Logo, DesktopNav, AuthLinks } from "./";
export const Navbar = () => {
  const userId = useGetUserId();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navLinks = [
    { href: "/", title: "Home" },
    { href: "/create-recipe", title: "Create Recipe" },
    { href: "/saved-recipes", title: "Saved Recipes" },
    { href: `/my-recipes/${userId}`, title: "My Recipes" },
  ];

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth/login");
  };

  return (
    <div className="w-full bg-black h-[100px] text-white flex justify-center items-center ">
      <div className="flex w-full max-w-[2000px] justify-between px-5 md:px-0 md:justify-around">
        <Logo />
        <DesktopNav navLinks={navLinks} location={location} />
        <MobileNav
          navLinks={navLinks}
          isOpen={isOpen}
          cookies={cookies}
          logout={logout}
          setOpen={setOpen}
        />
        <div className="flex gap-2">
          <div
            className={`${isOpen ? "text-black" : "text-white"} md:hidden z-50`}
          >
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>
          <AuthLinks cookies={cookies} logout={logout} />
        </div>
      </div>
    </div>
  );
};
