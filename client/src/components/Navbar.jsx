import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="site-header">
      {/* Logo */}
      <Link to="/" className="site-logo">
        <span className="logo-mark">
          Bliss<span>bix</span>
        </span>
        <span className="logo-sub">COSMETICS</span>
      </Link>

      {/* Navigation */}
      <nav>
        <ul className="site-nav">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/shop">
              Shop
            </NavLink>
          </li>

          <li>
            <NavLink to="/wishlist">
              Wishlist
            </NavLink>
          </li>

          <li>
            <NavLink to="/cart">
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Right side */}
      <div className="header-right">
        <div className="header-search">
          <input
            type="text"
            placeholder="Search cosmetics..."
          />

          <button type="button" aria-label="Search">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        <Link to="/login" className="login-link">
          Login
        </Link>
      </div>
    </header>
  );
}

export default Navbar;