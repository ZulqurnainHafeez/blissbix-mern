import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  /* =========================
     EMPTY CART
  ========================= */

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛍️</div>

          <h1>Your Cart is Empty</h1>

          <p>
            Looks like you haven't added anything
            to your cart yet.
          </p>

          <Link
            to="/shop"
            className="continue-shopping"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  /* =========================
     CART PAGE
  ========================= */

  return (
    <main className="cart-page">
      <div className="cart-container">

        {/* =========================
            CART HEADER
        ========================= */}

        <div className="cart-header">
          <div>
            <p>BLISSBIX COSMETICS</p>

            <h1>Your Shopping Cart</h1>
          </div>

          <button
            type="button"
            className="clear-cart"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>

        {/* =========================
            CART LAYOUT
        ========================= */}

        <div className="cart-layout">

          {/* =========================
              CART ITEMS
          ========================= */}

          <section className="cart-items">

            {cartItems.map((item) => (
              <div
                className="cart-item"
                key={`${item.productId}-${item.color}-${item.size}`}
              >

                {/* =========================
                    PRODUCT IMAGE
                ========================= */}

                <div className="cart-item-image">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  ) : (
                    <span>💄</span>
                  )}
                </div>

                {/* =========================
                    PRODUCT INFORMATION
                ========================= */}

                <div className="cart-item-info">

                  <p className="cart-item-category">
                    {item.category || "Beauty"}
                  </p>

                  <h2>{item.name}</h2>

                  {item.color && (
                    <p>
                      Color:{" "}
                      <strong>{item.color}</strong>
                    </p>
                  )}

                  {item.size && (
                    <p>
                      Size:{" "}
                      <strong>{item.size}</strong>
                    </p>
                  )}

                  <strong className="cart-item-price">
                    Rs.{" "}
                    {Number(item.price).toLocaleString()}
                  </strong>

                </div>

                {/* =========================
                    CART ACTIONS
                ========================= */}

                <div className="cart-item-actions">

                  {/* QUANTITY */}

                  <div className="cart-quantity">

                    <button
                      type="button"
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

                  {/* ITEM TOTAL */}

                  <strong className="item-total">
                    Rs.{" "}
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toLocaleString()}
                  </strong>

                  {/* REMOVE */}

                  <button
                    type="button"
                    className="remove-item"
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

              </div>
            ))}

          </section>

          {/* =========================
              ORDER SUMMARY
          ========================= */}

          <aside className="cart-summary">

            <h2>Order Summary</h2>

            {/* ITEMS */}

            <div className="summary-row">
              <span>Items</span>

              <span>{cartCount}</span>
            </div>

            {/* SUBTOTAL */}

            <div className="summary-row">
              <span>Subtotal</span>

              <strong>
                Rs. {cartTotal.toLocaleString()}
              </strong>
            </div>

            {/* DELIVERY */}

            <div className="summary-row">
              <span>Delivery</span>

              <span>
                Calculated at checkout
              </span>
            </div>

            {/* TOTAL */}

            <div className="summary-total">
              <span>Total</span>

              <strong>
                Rs. {cartTotal.toLocaleString()}
              </strong>
            </div>

            {/* CHECKOUT */}

            <button
              type="button"
              className="checkout-button"
              onClick={() =>
                alert("Checkout coming soon!")
              }
            >
              Proceed to Checkout
            </button>

            {/* CONTINUE SHOPPING */}

            <Link
              to="/shop"
              className="continue-shopping-small"
            >
              ← Continue Shopping
            </Link>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default Cart;