import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  /* =========================
     LOAD WISHLIST
  ========================= */

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    try {
      const savedWishlist =
        JSON.parse(
          localStorage.getItem("blissbix-wishlist")
        ) || [];

      setWishlist(savedWishlist);
    } catch (error) {
      console.error(
        "Error loading wishlist:",
        error
      );

      setWishlist([]);
    }
  };

  /* =========================
     REMOVE ITEM
  ========================= */

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.productId !== productId
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "blissbix-wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  /* =========================
     CLEAR WISHLIST
  ========================= */

  const clearWishlist = () => {
    setWishlist([]);

    localStorage.removeItem(
      "blissbix-wishlist"
    );
  };

  /* =========================
     EMPTY
  ========================= */

  if (wishlist.length === 0) {
    return (
      <main className="wishlist-page">

        <div className="wishlist-empty">

          <div className="wishlist-empty-icon">
            ♡
          </div>

          <p className="wishlist-label">
            BLISSBIX COSMETICS
          </p>

          <h1>Your Wishlist</h1>

          <p className="wishlist-empty-text">
            Your wishlist is currently empty.
          </p>

          <Link
            to="/shop"
            className="wishlist-shop-button"
          >
            Explore Products
          </Link>

        </div>

      </main>
    );
  }

  /* =========================
     WISHLIST PAGE
  ========================= */

  return (
    <main className="wishlist-page">

      <div className="wishlist-container">

        <div className="wishlist-header">

          <div>
            <p className="wishlist-label">
              BLISSBIX COSMETICS
            </p>

            <h1>Your Wishlist</h1>

            <span>
              {wishlist.length}{" "}
              {wishlist.length === 1
                ? "product"
                : "products"}{" "}
              saved
            </span>
          </div>

          <button
            type="button"
            className="clear-wishlist"
            onClick={clearWishlist}
          >
            Clear Wishlist
          </button>

        </div>

        <div className="wishlist-grid">

          {wishlist.map((item) => (
            <div
              className="wishlist-card"
              key={item.productId}
            >

              {/* IMAGE */}

              <Link
                to={`/product/${item.productId}`}
                className="wishlist-image"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                ) : (
                  <span>💄</span>
                )}
              </Link>

              {/* INFO */}

              <div className="wishlist-info">

                <p className="wishlist-category">
                  {item.category}
                </p>

                <Link
                  to={`/product/${item.productId}`}
                  className="wishlist-name"
                >
                  {item.name}
                </Link>

                <strong className="wishlist-price">
                  Rs.{" "}
                  {Number(
                    item.price
                  ).toLocaleString()}
                </strong>

                <div className="wishlist-actions">

                  <Link
                    to={`/product/${item.productId}`}
                    className="wishlist-view"
                  >
                    View Product
                  </Link>

                  <button
                    type="button"
                    className="wishlist-remove"
                    onClick={() =>
                      removeFromWishlist(
                        item.productId
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </main>
  );
}

export default Wishlist;