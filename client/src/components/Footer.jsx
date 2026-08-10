import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>Blissbix</h2>
          <p>
            Your beauty, our passion. Discover quality cosmetics
            for your everyday beauty routine.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div className="footer-links">
          <h3>Account</h3>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: support@blissbix.com</p>
          <p>Pakistan</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Blissbix Cosmetics. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;