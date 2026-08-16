import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <main className="home-page">

      {/* =========================
          HERO
      ========================= */}
      <section className="home-hero">

        <div className="home-hero-content">

          <div className="home-breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span>Beauty Collection</span>
          </div>

          <p className="home-eyebrow">
            BLISSBIX COSMETICS
          </p>

          <h1>
            Beauty,
            <br />
            simply refined.
          </h1>

          <p className="home-hero-description">
            Discover carefully selected beauty and skincare
            essentials designed for your everyday routine.
          </p>

          <Link
            to="/shop"
            className="home-primary-button"
          >
            Shop Collection
          </Link>

        </div>

        <div className="home-hero-visual">
          <div className="home-hero-image">
            <span>Beauty</span>
          </div>
        </div>

      </section>


      {/* =========================
          CATEGORY
      ========================= */}
      <section className="home-section">

        <div className="home-section-header">

          <p>EXPLORE</p>

          <h2>
            Shop By Category
          </h2>

        </div>

        <div className="home-category-grid">

          <Link
            to="/shop?category=Makeup"
            className="home-category-card"
          >
            <div className="home-category-image">
              <span>Makeup</span>
            </div>

            <div className="home-category-info">
              <h3>Makeup</h3>
              <p>Express your beauty</p>
            </div>
          </Link>


          <Link
            to="/shop?category=Skincare"
            className="home-category-card"
          >
            <div className="home-category-image">
              <span>Skincare</span>
            </div>

            <div className="home-category-info">
              <h3>Skincare</h3>
              <p>Care for your skin</p>
            </div>
          </Link>


          <Link
            to="/shop?category=Fragrance"
            className="home-category-card"
          >
            <div className="home-category-image">
              <span>Fragrance</span>
            </div>

            <div className="home-category-info">
              <h3>Fragrance</h3>
              <p>Find your signature scent</p>
            </div>
          </Link>


          <Link
            to="/shop?category=Nails"
            className="home-category-card"
          >
            <div className="home-category-image">
              <span>Nails</span>
            </div>

            <div className="home-category-info">
              <h3>Nails</h3>
              <p>Complete your look</p>
            </div>
          </Link>

        </div>

      </section>


      {/* =========================
          FEATURED
      ========================= */}
      <section className="home-section home-featured">

        <div className="home-section-header home-featured-header">

          <div>
            <p>OUR COLLECTION</p>

            <h2>
              Beauty Essentials
            </h2>
          </div>

          <Link
            to="/shop"
            className="home-view-all"
          >
            View all products →
          </Link>

        </div>


        <div className="home-product-grid">

          <article className="home-product-card">

            <div className="home-product-image">
              <span>01</span>
            </div>

            <div className="home-product-info">

              <p className="home-product-category">
                Makeup
              </p>

              <h3>
                Matte Lipstick
              </h3>

              <p>
                Beautiful long-lasting color.
              </p>

              <Link to="/shop">
                View Product
              </Link>

            </div>

          </article>


          <article className="home-product-card">

            <div className="home-product-image">
              <span>02</span>
            </div>

            <div className="home-product-info">

              <p className="home-product-category">
                Skincare
              </p>

              <h3>
                Vitamin C Face Serum
              </h3>

              <p>
                For a brighter natural glow.
              </p>

              <Link to="/shop">
                View Product
              </Link>

            </div>

          </article>


          <article className="home-product-card">

            <div className="home-product-image">
              <span>03</span>
            </div>

            <div className="home-product-info">

              <p className="home-product-category">
                Makeup
              </p>

              <h3>
                Waterproof Mascara
              </h3>

              <p>
                Bold and beautiful lashes.
              </p>

              <Link to="/shop">
                View Product
              </Link>

            </div>

          </article>


          <article className="home-product-card">

            <div className="home-product-image">
              <span>04</span>
            </div>

            <div className="home-product-info">

              <p className="home-product-category">
                Skincare
              </p>

              <h3>
                Sunscreen
              </h3>

              <p>
                Everyday protection for your skin.
              </p>

              <Link to="/shop">
                View Product
              </Link>

            </div>

          </article>

        </div>

      </section>


      {/* =========================
          EDITORIAL BANNER
      ========================= */}
      <section className="home-editorial">

        <div className="home-editorial-inner">

          <p>
            BEAUTY STARTS WITH YOU
          </p>

          <h2>
            Simple essentials.
            <br />
            Everyday confidence.
          </h2>

          <span>
            Explore our carefully selected collection of beauty
            essentials created for your everyday routine.
          </span>

          <Link
            to="/shop"
            className="home-secondary-button"
          >
            Explore Collection
          </Link>

        </div>

      </section>


      {/* =========================
          SUBSCRIBE
      ========================= */}
      <section className="home-subscribe">

        <h2>
          Subscribe to get 10% Off
        </h2>

        <p>
          Stay updated with new products and exclusive offers.
        </p>

      </section>

    </main>
  );
}

export default Home;