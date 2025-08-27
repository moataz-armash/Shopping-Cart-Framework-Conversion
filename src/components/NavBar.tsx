/**
 * https://floatui.com/components/navbars
 * https://icon-sets.iconify.design/
 */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import NavBarLink from "./NavBarLink";
import logo from "../assets/images/14603825_5484736.jpg";
import { useAuth } from "../hooks/authContext";

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const userName = localStorage.getItem("userName") || user?.userName;

  const navigationRegister = [
    { label: "Sign In", path: "/login" },
    { label: "Sign up", path: "/register" },
  ];

  const navigationAuthed = [
    { icon: "fluent:cart-24-regular", path: "/cart" }, // icon only
    { label: "Logout", path: "#" }, // text only, triggers logout
  ];

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [location.pathname]);

  // Optional: prevent body scroll when menu is open (mobile)
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleItemClick = (item: { label?: string; path: string }) => {
    if (item.label === "Logout") {
      logout();
      return; // don't navigate
    }
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-tahiti text-white shadow-lg backdrop-blur-md">
      <div className="page max-w-5xl">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} width={100} height={40} alt="Logo" />
          </Link>

          {/* Greeting (desktop) */}
          {isAuthenticated && (
            <p className="hidden text-white/90 md:block">Welcome {userName}</p>
          )}

          {/* Right side (desktop) */}
          <div className="hidden md:flex md:items-center md:gap-2">
            <ul className="flex items-center gap-2">
              {!isAuthenticated &&
                navigationRegister.map((item) => (
                  <li key={item.path}>
                    <NavBarLink to={item.path} label={item.label} />
                  </li>
                ))}

              {isAuthenticated && (
                <>
                  {/* Cart (icon only) */}
                  <li>
                    <NavBarLink to="/cart" icon="fluent:cart-24-regular" />
                  </li>
                  {/* Logout (button) */}
                  <li>
                    <button
                      onClick={() =>
                        handleItemClick({ label: "Logout", path: "#" })
                      }
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10"
                    >
                      <Icon icon="lucide:log-out" width="20" height="20" />
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="rounded-md p-2 text-white/90 outline-none focus:ring md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? (
              <Icon icon="lucide:x" width="24" height="24" />
            ) : (
              <Icon icon="lucide:menu" width="24" height="24" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`
          overflow-hidden bg-tahiti/95 backdrop-blur transition-[max-height,opacity]
          duration-300 ease-out md:hidden
          ${open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="page pb-4">
          {/* {isAuthenticated && (
            <p className="mb-3 text-center text-white/90">Welcome {userName}</p>
          )} */}

          <ul className="flex flex-col items-center gap-1">
            {!isAuthenticated &&
              navigationRegister.map((item) => (
                <li key={item.path} onClick={() => setOpen(false)}>
                  <NavBarLink to={item.path} label={item.label} />
                </li>
              ))}

            {isAuthenticated && (
              <>
                {/* Cart (icon only) */}
                <li onClick={() => setOpen(false)}>
                  <NavBarLink to="/cart" icon="fluent:cart-24-regular" />
                </li>

                {/* Logout (button) */}
                <li>
                  <button
                    onClick={() => {
                      handleItemClick({ label: "Logout", path: "#" });
                      setOpen(false);
                    }}
                    className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-white/10"
                  >
                    <Icon icon="lucide:log-out" width="20" height="20" />
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
