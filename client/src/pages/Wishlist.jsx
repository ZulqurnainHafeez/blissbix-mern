import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./Wishlist.css";

function Wishlist() {
  const { addToCart } = useCart();
  const {
    wishlistItems: wishlist,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const moveToCart = (item) => {
    addToCart(
      {
        _id: item.productId,
        name: item.name,
        price: item.price,
        images: item.image ? [item.image] : [],
        stock: item.stock || 1,
      },
      1
    );
    removeFromWishlist(item.productId);
  };

  /* =========================================================
     EMPTY WISHLIST
  ========================================================= */

  if (wishlist.length === 0) {
    return (
      <main className="wishlist-page">

        <section className="wishlist-empty">

          <div className="wishlist-empty-icon">
            ♡
          </div>

          <div className="wishlist-empty-content">

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

        </section>

      </main>
    );
  }

  /* =========================================================
     WISHLIST PAGE
  ========================================================= */

  return (
    <main className="wishlist-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="wishlist-header">

        <div>

          <div className="wishlist-breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span>Wishlist</span>
          </div>

          <h1 className="wishlist-title">
            Your Wishlist
          </h1>

          <p className="wishlist-subtitle">
            {wishlist.length}{" "}
            {wishlist.length === 1
              ? "product"
              : "products"}{" "}
            saved
          </p>

        </div>

        <button
          type="button"
          className="clear-wishlist"
          onClick={clearWishlist}
        >
          Clear Wishlist
        </button>

      </section>


      {/* =====================================================
          WISHLIST CONTENT
      ===================================================== */}

      <section className="wishlist-content">

        {/* ===================================================
            RESULT COUNT
        =================================================== */}

        <div className="wishlist-results-header">

          <span className="wishlist-result-count">
            Showing {wishlist.length}{" "}
            {wishlist.length === 1
              ? "product"
              : "products"}
          </span>

        </div>


        {/* ===================================================
            PRODUCTS
        =================================================== */}

        <div className="wishlist-grid">

          {wishlist.map((item) => (

            <article
              className="wishlist-card"
              key={item.productId}
            >

              {/* =================================================
                  PRODUCT IMAGE
              ================================================= */}

              <div className="wishlist-image">

                <Link
                  to={`/product/${item.productId}`}
                  className="wishlist-image-link"
                >

                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  ) : (
                    <span className="wishlist-image-placeholder">
                      ♡
                    </span>
                  )}

                </Link>

                {/* REMOVE */}
                <button
                  type="button"
                  className="wishlist-remove-icon"
                  aria-label={`Remove ${item.name} from wishlist`}
                  onClick={() =>
                    removeFromWishlist(
                      item.productId
                    )
                  }
                >
                  ×
                </button>

              </div>


              {/* =================================================
                  PRODUCT INFORMATION
              ================================================= */}

              <div className="wishlist-info">

                <p className="wishlist-category">
                  {item.category || "Beauty"}
                </p>

                <Link
                  to={`/product/${item.productId}`}
                  className="wishlist-name"
                >
                  {item.name}
                </Link>

                <p className="wishlist-price">
                  Rs.{" "}
                  {Number(
                    item.price
                  ).toLocaleString()}
                </p>


                {/* =================================================
                    ACTIONS
                ================================================= */}

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
                    onClick={() => moveToCart(item)}
                  >
                    Move to Cart
                  </button>

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

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          SUBSCRIBE
      ===================================================== */}

      <section className="wishlist-subscribe">

        <h2>
          Subscribe to get 10% Off
        </h2>

      </section>

    </main>
  );
}

export default Wishlist;