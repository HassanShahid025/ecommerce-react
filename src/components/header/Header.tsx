import { useState } from "react";
import "./header.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const logo = (
  <div className="logo">
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }: { isActive: boolean }) =>
  isActive ? "active" : "";

const cart = (
  <span className="cart">
    <NavLink to="/cart" className={activeLink}>
      Cart
      <FaShoppingCart size={20} />
      <p>0</p>
    </NavLink>
  </span>
);

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const navigate = useNavigate()

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successful");
        navigate("/")
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <ToastContainer />
      <header>
        <div className="header">
          {logo}
          <nav className={showMenu ? "show-nav" : "hide-nav"}>
            <div
              className={
                showMenu ? "nav-wrapper show-nav-wrapper" : "nav-wrapper"
              }
              onClick={hideMenu}
            ></div>
            <ul onClick={hideMenu}>
              <li className="logo-mobile">
                <Link to="/">{logo}</Link>
                <FaTimes size={22} color="#fffff" onClick={hideMenu} />
              </li>
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={activeLink}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div className="header-right" onClick={hideMenu}>
              <span className="links">
                <NavLink to="/login" className={activeLink}>
                  Login
                </NavLink>
                <NavLink to="/register" className={activeLink}>
                  Register
                </NavLink>
                <NavLink to="/order-history" className={activeLink}>
                  My Orders
                </NavLink>
                <NavLink to="/a" onClick={logoutUser}>
                  Logout
                </NavLink>
              </span>
              {cart}
            </div>
          </nav>

          <div className="menu-icon">
            {cart}
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
