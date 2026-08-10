import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          Blissbix
          <span>Cosmetics</span>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
        </div>

        {/* Search */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search cosmetics..."
          />
          <button type="button">🔍</button>
        </div>

        {/* Account */}
        <div className="navbar-account">
          <Link to="/login">Login</Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;