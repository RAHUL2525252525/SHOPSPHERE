import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

import { logoutUser } from "../../services/authService";

import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const cartContext = useContext(CartContext);
  const wishlistContext = useContext(WishlistContext);

  const cartItems = cartContext?.cartItems || [];
  const wishlistItems = wishlistContext?.wishlistItems || [];

  const isLoggedIn = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Hide Navbar on auth pages
  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password"
  ) {
    return null;
  }

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to={isLoggedIn ? "/dashboard" : "/"}>
          🛒 ShopSphere
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/dashboard">Home</Link>

        <Link to="/products">Products</Link>

        {isLoggedIn && (
          <>
            <Link to="/wishlist">
              ❤️ Wishlist ({wishlistItems.length})
            </Link>

            <Link to="/cart">
              🛒 Cart ({cartItems.length})
            </Link>

            <Link to="/orders">Orders</Link>

            <Link to="/profile">Profile</Link>

            {role === "ADMIN" && (
              <Link to="/admin">
                Admin
              </Link>
            )}
          </>
        )}
      </div>

      <div className="nav-actions">
        {isLoggedIn ? (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link
            className="login-btn"
            to="/login"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;