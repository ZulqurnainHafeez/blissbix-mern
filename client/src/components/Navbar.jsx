import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Logged-in user
  const [user, setUser] = useState(null);

  const inputRef = useRef(null);

  // =====================================================
  // CHECK LOGIN USER
  // =====================================================

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Invalid saved user:", error);
          localStorage.removeItem("user");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();

    // Update navbar when login/logout happens
    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  // =====================================================
  // SEARCH FOCUS
  // =====================================================

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    }
  }, [searchOpen]);

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const value = search.trim();

    if (!value) return;

    window.location.href =
      `/shop?search=${encodeURIComponent(value)}`;

    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  // =====================================================
  // MOBILE MENU
  // =====================================================

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // =====================================================
  // ACCOUNT
  // =====================================================

  const handleAccountClick = () => {
    setMobileMenuOpen(false);
    setSearchOpen(false);

    if (user) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);

    setMobileMenuOpen(false);

    navigate("/login");
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <header className="site-header">

      {/* =====================================================
          HEADER MAIN
      ===================================================== */}

      <div className="header-main">

        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          className={`mobile-menu-toggle ${
            mobileMenuOpen ? "is-open" : ""
          }`}
          aria-label={
            mobileMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={mobileMenuOpen}
          onClick={() =>
            setMobileMenuOpen((current) => !current)
          }
        >
          <span></span>
          <span></span>
          <span></span>
        </button>


        {/* LEFT SIDE */}

        <div className="header-left">

          {/* SEARCH */}

          <div
            className={`header-search ${
              searchOpen ? "is-open" : ""
            }`}
          >

            <button
              type="button"
              className="search-toggle"
              aria-label="Open search"
              aria-expanded={searchOpen}
              onClick={() =>
                setSearchOpen((current) => !current)
              }
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />

                <line
                  x1="16.5"
                  y1="16.5"
                  x2="21"
                  y2="21"
                />
              </svg>
            </button>


            {searchOpen && (
              <form
                className="search-form"
                onSubmit={handleSearchSubmit}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  placeholder="Search"
                  aria-label="Search products"
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />
              </form>
            )}

          </div>

        </div>


        {/* ===================================================
            LOGO
        =================================================== */}

        <Link
          to="/"
          className="site-logo"
          onClick={closeMobileMenu}
        >
          <span className="logo-main">
            Bliss<span>bix</span>
          </span>

          <span className="logo-sub">
            COSMETICS
          </span>
        </Link>


        {/* ===================================================
            RIGHT ACTIONS
        =================================================== */}

        <div className="header-actions">

          {/* MOBILE SEARCH */}

          <button
            type="button"
            className="mobile-search-button"
            aria-label="Search"
            onClick={() =>
              setSearchOpen((current) => !current)
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />

              <line
                x1="16.5"
                y1="16.5"
                x2="21"
                y2="21"
              />
            </svg>
          </button>


          {/* =================================================
              ACCOUNT
          ================================================= */}

          <button
            type="button"
            className="header-action account-button"
            aria-label="Account"
            onClick={handleAccountClick}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="8"
                r="4"
              />

              <path
                d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7"
              />
            </svg>

            <span>
              {user?.name || "Account"}
            </span>
          </button>


          {/* =================================================
              WISHLIST
          ================================================= */}

          <Link
            to="/wishlist"
            className="header-action wishlist-action"
            aria-label="Wishlist"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path
                d="M20.8 8.7c0 5.5-8.8 10.2-8.8 10.2S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"
              />
            </svg>

            <span>
              Wishlist
            </span>
          </Link>


          {/* =================================================
              CART
          ================================================= */}

          <Link
            to="/cart"
            className="header-action"
            aria-label="Cart"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path
                d="M6 8h12l1 12H5L6 8Z"
              />

              <path
                d="M9 8a3 3 0 0 1 6 0"
              />
            </svg>

            <span>
              Cart
            </span>
          </Link>

        </div>

      </div>


      {/* =====================================================
          DESKTOP NAVIGATION
      ===================================================== */}

      <nav
        className={`header-navigation ${
          mobileMenuOpen ? "mobile-open" : ""
        }`}
      >

        <div className="navigation-inner">

          <NavLink
            to="/"
            end
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            onClick={closeMobileMenu}
          >
            Shop
          </NavLink>

          <NavLink
            to="/wishlist"
            onClick={closeMobileMenu}
          >
            Wishlist
          </NavLink>

          <NavLink
            to="/cart"
            onClick={closeMobileMenu}
          >
            Cart
          </NavLink>

        </div>

      </nav>


      {/* =====================================================
          MOBILE SEARCH
      ===================================================== */}

      {searchOpen && (
        <form
          className="mobile-search-form"
          onSubmit={handleSearchSubmit}
        >

          <div className="mobile-search-inner">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />

              <line
                x1="16.5"
                y1="16.5"
                x2="21"
                y2="21"
              />
            </svg>


            <input
              ref={inputRef}
              type="text"
              value={search}
              placeholder="Search products..."
              aria-label="Search products"
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />


            {search && (
              <button
                type="button"
                className="search-clear"
                aria-label="Clear search"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}

          </div>

        </form>
      )}

    </header>
  );
}

export default Navbar;