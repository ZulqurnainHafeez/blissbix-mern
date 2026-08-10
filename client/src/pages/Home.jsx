import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <main className="home">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-small-title">BEAUTY • CONFIDENCE • YOU</p>

          <h1>
            Your Beauty,
            <br />
            Your Glow.
          </h1>

          <p className="hero-description">
            Discover beautiful cosmetics made to enhance your
            everyday look and celebrate your natural beauty.
          </p>

          <Link to="/shop" className="hero-button">
            Shop Now
          </Link>
        </div>

        <div className="hero-image">
          <div className="hero-circle">
            💄
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="section-heading">
          <p>EXPLORE</p>
          <h2>Shop By Category</h2>
        </div>

        <div className="categories-grid">
          <Link to="/shop" className="category-card">
            <span>💄</span>
            <h3>Makeup</h3>
            <p>Express your beauty</p>
          </Link>

          <Link to="/shop" className="category-card">
            <span>🧴</span>
            <h3>Skincare</h3>
            <p>Care for your skin</p>
          </Link>

          <Link to="/shop" className="category-card">
            <span>🌸</span>
            <h3>Fragrance</h3>
            <p>Find your signature scent</p>
          </Link>

          <Link to="/shop" className="category-card">
            <span>💅</span>
            <h3>Nails</h3>
            <p>Complete your look</p>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-heading">
          <p>OUR COLLECTION</p>
          <h2>Beauty Essentials</h2>
        </div>

        <div className="featured-grid">

          <div className="featured-card">
            <div className="product-placeholder">💄</div>
            <h3>Matte Lipstick</h3>
            <p>Beautiful long-lasting color</p>
            <Link to="/shop">View Product</Link>
          </div>

          <div className="featured-card">
            <div className="product-placeholder">🧴</div>
            <h3>Vitamin C Face Serum</h3>
            <p>For a brighter natural glow</p>
            <Link to="/shop">View Product</Link>
          </div>

          <div className="featured-card">
            <div className="product-placeholder">👁️</div>
            <h3>Waterproof Mascara</h3>
            <p>Bold and beautiful lashes</p>
            <Link to="/shop">View Product</Link>
          </div>

          <div className="featured-card">
            <div className="product-placeholder">🌞</div>
            <h3>Sunscreen</h3>
            <p>Everyday protection for your skin</p>
            <Link to="/shop">View Product</Link>
          </div>

        </div>
      </section>

      {/* Promotional Section */}
      <section className="promo-section">
        <div>
          <p>BEAUTY STARTS WITH YOU</p>
          <h2>Feel Beautiful. Feel Confident.</h2>
          <p>
            Explore our collection of carefully selected beauty
            essentials designed for your everyday routine.
          </p>

          <Link to="/shop" className="promo-button">
            Explore Collection
          </Link>
        </div>
      </section>

    </main>
  );
}

export default Home;