import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================================================
     FETCH PRODUCTS
  ========================================================= */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");

        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Home products error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* =========================================================
     PRODUCT IMAGE HELPER
  ========================================================= */

  const getProductImage = (product) => {
    if (!product) return "";

    return (
      product.image ||
      product.images?.[0] ||
      product.imageUrl ||
      ""
    );
  };

  /* =========================================================
     CATEGORY DATA
  ========================================================= */

  const categories = [
    {
      name: "Makeup",
      description: "Express your beauty",
      slug: "Makeup",
    },
    {
      name: "Skincare",
      description: "Care for your skin",
      slug: "Skincare",
    },
    {
      name: "Fragrance",
      description: "Find your signature scent",
      slug: "Fragrance",
    },
    {
      name: "Nails",
      description: "Complete your look",
      slug: "Nails",
    },
  ];

  /* =========================================================
     CATEGORY IMAGES
  ========================================================= */

  const categoryProducts = useMemo(() => {
    return categories.map((category) => {
      const product = products.find(
        (item) =>
          item.category?.toLowerCase() ===
          category.name.toLowerCase()
      );

      return {
        ...category,
        image: getProductImage(product),
      };
    });
  }, [products]);

  /* =========================================================
     FEATURED PRODUCTS
  ========================================================= */

  const featuredProducts = useMemo(() => {
    return products.slice(0, 4);
  }, [products]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="home-page">
        <div className="home-loading">
          <span className="home-loading-line"></span>

          <p>BLISSBIX COSMETICS</p>

          <h2>Loading collection</h2>

          <span>Please wait...</span>
        </div>
      </main>
    );
  }

  /* =========================================================
     HOME
  ========================================================= */

  return (
    <main className="home-page">

      {/* =====================================================
          HERO
      ===================================================== */}

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


        {/* HERO IMAGE */}

        <div className="home-hero-visual">

          <div className="home-hero-image">

            {products[0] &&
            getProductImage(products[0]) ? (
              <img
                src={getProductImage(products[0])}
                alt={products[0].name || "Beauty product"}
              />
            ) : (
              <div className="home-image-empty">
                <span>BEAUTY</span>
              </div>
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          CATEGORY
      ===================================================== */}

      <section className="home-section home-category-section">

        <div className="home-section-header">

          <p>EXPLORE</p>

          <h2>
            Shop By Category
          </h2>

        </div>


        <div className="home-category-grid">

          {categoryProducts.map((category) => (

            <Link
              key={category.name}
              to={`/shop?category=${category.slug}`}
              className="home-category-card"
            >

              <div className="home-category-image">

                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                  />
                ) : (
                  <div className="home-image-empty">
                    <span>
                      {category.name.toUpperCase()}
                    </span>
                  </div>
                )}

              </div>


              <div className="home-category-info">

                <h3>
                  {category.name}
                </h3>

                <p>
                  {category.description}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </section>


      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}

      <section className="home-section home-featured">

        <div className="home-section-header home-featured-header">

          <div>

            <p>
              OUR COLLECTION
            </p>

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


        {featuredProducts.length > 0 ? (

          <div className="home-product-grid">

            {featuredProducts.map((product, index) => {

              const productImage =
                getProductImage(product);

              const productName =
                product.name ||
                product.title ||
                "Beauty Product";

              const productPrice =
                product.price ?? 0;

              return (

                <article
                  className="home-product-card"
                  key={product._id}
                >

                  {/* PRODUCT IMAGE */}

                  <Link
                    to={`/product/${product._id}`}
                    className="home-product-image"
                  >

                    {productImage ? (

                      <img
                        src={productImage}
                        alt={productName}
                        loading="lazy"
                      />

                    ) : (

                      <div className="home-image-empty">
                        <span>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                    )}

                  </Link>


                  {/* PRODUCT INFO */}

                  <div className="home-product-info">

                    <p className="home-product-category">
                      {product.category || "BEAUTY"}
                    </p>

                    <h3>
                      {productName}
                    </h3>

                    {product.description && (
                      <p>
                        {product.description}
                      </p>
                    )}

                    <div className="home-product-bottom">

                      <span className="home-product-price">
                        Rs.{" "}
                        {Number(
                          productPrice
                        ).toLocaleString("en-PK")}
                      </span>

                      <Link
                        to={`/product/${product._id}`}
                      >
                        View Product
                      </Link>

                    </div>

                  </div>

                </article>

              );
            })}

          </div>

        ) : (

          <div className="home-empty-products">

            <p>
              BLISSBIX COSMETICS
            </p>

            <h3>
              No products available
            </h3>

            <Link to="/shop">
              Visit Shop →
            </Link>

          </div>

        )}

      </section>


      {/* =====================================================
          EDITORIAL BANNER
      ===================================================== */}

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


      {/* =====================================================
          SUBSCRIBE
      ===================================================== */}

      <section className="home-subscribe">

        <p>
          BLISSBIX COSMETICS
        </p>

        <h2>
          Subscribe to get 10% Off
        </h2>

        <span>
          Stay updated with new products and exclusive offers.
        </span>

      </section>

    </main>
  );
}

export default Home;