import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  /* =========================================================
     EMPTY CART
  ========================================================= */

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">

        <section className="cart-header">
          <div>

            <div className="cart-breadcrumb">
              <span>Home</span>
              <span>/</span>
              <span>Cart</span>
            </div>

            <h1 className="cart-title">
              Shopping Cart
            </h1>

            <p className="cart-subtitle">
              Your selected beauty essentials.
            </p>

          </div>
        </section>


        <section className="cart-empty">

          <div className="cart-empty-content">

            <p className="cart-empty-label">
              YOUR CART
            </p>

            <h2>
              Your cart is empty.
            </h2>

            <p>
              Looks like you haven't added anything
              to your cart yet.
            </p>

            <Link
              to="/shop"
              className="cart-primary-button"
            >
              Continue Shopping
            </Link>

          </div>

        </section>

      </main>
    );
  }


  /* =========================================================
     CART
  ========================================================= */

  return (
    <main className="cart-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="cart-header">

        <div>

          <div className="cart-breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span>Cart</span>
          </div>

          <h1 className="cart-title">
            Shopping Cart
          </h1>

          <p className="cart-subtitle">
            Review your selected products before checkout.
          </p>

        </div>

        <button
          type="button"
          className="clear-filters"
          onClick={clearCart}
        >
          Clear Cart
        </button>

      </section>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="cart-content">

        {/* ===================================================
            CART ITEMS
        =================================================== */}

        <section className="cart-items">

          <div className="cart-result-count">
            Showing {cartCount}{" "}
            {cartCount === 1 ? "item" : "items"}
          </div>


          {cartItems.map((item) => (

            <article
              className="cart-item"
              key={`${item.productId}-${item.color}-${item.size}`}
            >

              {/* IMAGE */}

              <div className="cart-item-image">

                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                ) : (
                  <span>Beauty</span>
                )}

              </div>


              {/* INFORMATION */}

              <div className="cart-item-info">

                <p className="cart-item-category">
                  {item.category || "Beauty"}
                </p>

                <h2>
                  {item.name}
                </h2>

                {item.color && (
                  <p className="cart-item-option">
                    Color:
                    <strong>
                      {item.color}
                    </strong>
                  </p>
                )}

                {item.size && (
                  <p className="cart-item-option">
                    Size:
                    <strong>
                      {item.size}
                    </strong>
                  </p>
                )}

                <p className="cart-item-price">
                  Rs.{" "}
                  {Number(item.price).toLocaleString()}
                </p>

              </div>


              {/* ACTIONS */}

              <div className="cart-item-actions">

                <div className="cart-quantity">

                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() =>
                      decreaseQuantity(
                        item.productId,
                        item.color,
                        item.size
                      )
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() =>
                      increaseQuantity(
                        item.productId,
                        item.color,
                        item.size
                      )
                    }
                    disabled={
                      item.quantity >= item.stock
                    }
                  >
                    +
                  </button>

                </div>


                <strong className="cart-item-total">
                  Rs.{" "}
                  {(
                    Number(item.price) *
                    item.quantity
                  ).toLocaleString()}
                </strong>


                <button
                  type="button"
                  className="cart-remove"
                  onClick={() =>
                    removeFromCart(
                      item.productId,
                      item.color,
                      item.size
                    )
                  }
                >
                  Remove
                </button>

              </div>

            </article>

          ))}

        </section>


        {/* ===================================================
            SUMMARY
        =================================================== */}

        <aside className="cart-summary">

          <p className="cart-summary-label">
            SUMMARY
          </p>

          <h2>
            Order Summary
          </h2>


          <div className="summary-row">

            <span>
              Items
            </span>

            <span>
              {cartCount}
            </span>

          </div>


          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              Rs.{" "}
              {cartTotal.toLocaleString()}
            </strong>

          </div>


          <div className="summary-row">

            <span>
              Delivery
            </span>

            <span>
              Calculated at checkout
            </span>

          </div>


          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              Rs.{" "}
              {cartTotal.toLocaleString()}
            </strong>

          </div>


          <button
            type="button"
            className="checkout-button"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>


          <Link
            to="/shop"
            className="continue-shopping-small"
          >
            ← Continue Shopping
          </Link>

        </aside>

      </section>

    </main>
  );
}

export default Cart;