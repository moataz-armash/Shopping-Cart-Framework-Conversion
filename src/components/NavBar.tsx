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
import { useCart } from "../hooks/cartContext";

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { cart, increaseQuantity, decreaseQuantity, total, removeFromCart } =
    useCart();
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
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
                    <Icon
                      className="cursor-pointer"
                      icon="fluent:cart-24-regular"
                      width="30"
                      height="30"
                      onClick={() => setOpenCart((v) => !v)}
                    />
                    {openCart && (
                      <section className="absolute z-10 mb-5 mt-3 w-72 -translate-x-1/3 translate-y-5 rounded-md border-tahiti bg-tahiti shadow-lg">
                        <div className="container mt-4 pt-4">
                          {cart.map((item) => (
                            <div className="m-auto mb-3 flex w-[90%] items-center justify-between rounded-md bg-white p-2 shadow">
                              {/* Product Name */}
                              <span className="text-sm font-bold text-tahiti">
                                {item.title}
                              </span>

                              {/* Quantity */}
                              <span className="text-xs font-bold text-tahiti">
                                {item.quantity}
                              </span>

                              {/* Controls */}
                              <div className="flex items-center space-x-4">
                                <button
                                  onClick={() =>
                                    decreaseQuantity &&
                                    decreaseQuantity(item.id)
                                  }
                                  className="text-md font-bold text-red-500 hover:opacity-70"
                                >
                                  -
                                </button>
                                <button
                                  onClick={() =>
                                    increaseQuantity &&
                                    increaseQuantity(item.id)
                                  }
                                  className="text-md font-bold text-green-600 hover:opacity-70"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="total d-flex m-auto mb-4 flex w-[90%] justify-between border-t border-solid border-white px-4 pt-2">
                          <h5 className="totalTitle mr-3 font-bold text-white">
                            Total
                          </h5>
                          <div className="totalPrice mr-2 bg-white px-2 py-0.5 font-bold text-tahiti">
                            {total} EGP
                          </div>
                        </div>
                        <button className="w-full bg-white p-2 font-bold text-tahiti">
                          View All Products
                        </button>
                      </section>
                    )}
                    {/* <NavBarLink to="/cart" icon="fluent:cart-24-regular" /> */}
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
