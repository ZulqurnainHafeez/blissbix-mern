import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

const initialForm = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartCount, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState(initialForm);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const values = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()])
    );

    if (Object.values(values).some((value) => !value)) {
      setError("Please complete all shipping address fields.");
      return;
    }

    if (!/^\+?[0-9\s-]{7,15}$/.test(values.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!/^\d{4,10}$/.test(values.postalCode)) {
      setError("Please enter a valid postal code.");
      return;
    }

    setLoading(true);

    try {
      const shippingAddress = [
        values.fullName,
        values.phone,
        values.address,
        values.city,
        values.postalCode,
      ].join(", ");

      const response = await api.post("/orders", {
        shippingAddress,
        paymentMethod,
      });

      const order = {
        ...response.data.order,
        items: response.data.order.items.map((orderItem) => {
          const cartItem = cartItems.find(
            (item) => item.productId === orderItem.product
          );

          return {
            ...orderItem,
            product: {
              _id: orderItem.product,
              name: cartItem?.name || "Product",
            },
          };
        }),
      };

      clearCart();
      navigate("/order-confirmation", {
        state: { order },
      });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to place your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <section className="checkout-empty">
          <p className="checkout-eyebrow">CHECKOUT</p>
          <h1>Your cart is empty.</h1>
          <p>Add an item before starting checkout.</p>
          <Link to="/shop" className="checkout-primary-button">
            Continue Shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <header className="checkout-header">
        <p className="checkout-eyebrow">BLISSBIX COSMETICS</p>
        <h1>Checkout</h1>
        <p>Confirm your delivery details and payment method.</p>
      </header>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <section className="checkout-panel">
            <p className="checkout-section-label">01 / DELIVERY</p>
            <h2>Shipping address</h2>

            <div className="checkout-fields">
              <label>
                Full name
                <input name="fullName" value={formData.fullName} onChange={handleChange} />
              </label>
              <label>
                Phone number
                <input name="phone" value={formData.phone} onChange={handleChange} inputMode="tel" />
              </label>
              <label className="checkout-field-wide">
                Street address
                <textarea name="address" value={formData.address} onChange={handleChange} rows="3" />
              </label>
              <label>
                City
                <input name="city" value={formData.city} onChange={handleChange} />
              </label>
              <label>
                Postal code
                <input name="postalCode" value={formData.postalCode} onChange={handleChange} inputMode="numeric" />
              </label>
            </div>
          </section>

          <section className="checkout-panel">
            <p className="checkout-section-label">02 / PAYMENT</p>
            <h2>Payment method</h2>
            <div className="payment-options">
              <label className={paymentMethod === "Cash on Delivery" ? "payment-option selected" : "payment-option"}>
                <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={paymentMethod === "Cash on Delivery"} onChange={(event) => setPaymentMethod(event.target.value)} />
                <span><strong>Cash on Delivery</strong><small>Pay when your order arrives.</small></span>
              </label>
              <label className={paymentMethod === "Card" ? "payment-option selected" : "payment-option"}>
                <input type="radio" name="paymentMethod" value="Card" checked={paymentMethod === "Card"} onChange={(event) => setPaymentMethod(event.target.value)} />
                <span><strong>Online payment</strong><small>Card payment integration coming next.</small></span>
              </label>
            </div>
          </section>

          {error && <p className="checkout-error" role="alert">{error}</p>}

          <button type="submit" className="checkout-submit" disabled={loading}>
            {loading ? "Placing order..." : "Place order"}
          </button>
        </form>

        <aside className="checkout-summary">
          <p className="checkout-section-label">ORDER SUMMARY</p>
          <h2>{cartCount} {cartCount === 1 ? "item" : "items"}</h2>

          <div className="checkout-items">
            {cartItems.map((item) => (
              <div className="checkout-item" key={`${item.productId}-${item.color}-${item.size}`}>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.quantity} x Rs. {Number(item.price).toLocaleString()}</span>
                  <span>{item.size || "Standard"} / {item.color || "Default"}</span>
                </div>
                <strong>Rs. {(Number(item.price) * item.quantity).toLocaleString()}</strong>
              </div>
            ))}
          </div>

          <div className="checkout-total-row"><span>Subtotal</span><strong>Rs. {cartTotal.toLocaleString()}</strong></div>
          <div className="checkout-total-row"><span>Shipping</span><span>Calculated at checkout</span></div>
          <div className="checkout-grand-total"><span>Total</span><strong>Rs. {cartTotal.toLocaleString()}</strong></div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;