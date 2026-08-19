import { Link, useLocation, Navigate } from "react-router-dom";
import "./OrderConfirmation.css";

function OrderConfirmation() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return <Navigate to="/account" replace />;
  }

  return (
    <main className="confirmation-page">
      <section className="confirmation-card">
        <div className="confirmation-mark" aria-hidden="true">✓</div>
        <p className="confirmation-eyebrow">ORDER CONFIRMED</p>
        <h1>Thank you for your order.</h1>
        <p className="confirmation-message">
          Your order has been placed successfully and is now being prepared.
        </p>

        <div className="confirmation-meta">
          <div>
            <span>Order number</span>
            <strong>{order._id}</strong>
          </div>
          <div>
            <span>Payment</span>
            <strong>{order.paymentMethod || "Cash on Delivery"}</strong>
          </div>
          <div>
            <span>Total</span>
            <strong>Rs. {Number(order.totalPrice).toLocaleString()}</strong>
          </div>
        </div>

        <div className="confirmation-items">
          <h2>Order summary</h2>
          {order.items?.map((item, index) => (
            <div className="confirmation-item" key={`${item.product?._id || item.product}-${index}`}>
              <div>
                <strong>{item.product?.name || "Product"}</strong>
                <span>{item.quantity} x {item.size || "Standard"} / {item.color || "Default"}</span>
              </div>
              <strong>Rs. {(Number(item.price) * item.quantity).toLocaleString()}</strong>
            </div>
          ))}
        </div>

        <p className="confirmation-address">
          <strong>Shipping to</strong>
          {order.shippingAddress}
        </p>

        <div className="confirmation-actions">
          <Link to="/account" className="confirmation-primary">View account</Link>
          <Link to="/shop" className="confirmation-secondary">Continue shopping</Link>
        </div>
      </section>
    </main>
  );
}

export default OrderConfirmation;