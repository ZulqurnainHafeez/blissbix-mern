import { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import "./Shop.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  /* =========================
     FETCH PRODUCTS
  ========================= */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");

        console.log("Products response:", response.data);

        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Products API error:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* =========================
     CATEGORIES
  ========================= */

  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  /* =========================
     SEARCH + CATEGORY FILTER
  ========================= */

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "All" ||
      product.category === category;

    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      product.name
        ?.toLowerCase()
        .includes(searchText) ||
      product.category
        ?.toLowerCase()
        .includes(searchText);

    return matchesCategory && matchesSearch;
  });

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="shop-page">
        <div className="shop-message">
          <h2>Loading products...</h2>
        </div>
      </main>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <main className="shop-page">
        <div className="shop-message error">
          <h2>{error}</h2>
        </div>
      </main>
    );
  }

  /* =========================
     SHOP PAGE
  ========================= */

  return (
    <main className="shop-page">

      {/* =========================
          SHOP HEADER
      ========================= */}

      <section className="shop-header">
        <p>BLISSBIX COSMETICS</p>

        <h1>Beauty Collection</h1>

        <span>
          Discover our collection of beauty and skincare essentials.
        </span>
      </section>

      {/* =========================
          FILTERS
      ========================= */}

      <section className="shop-filters">

        {/* Search */}

        <div className="shop-search">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}

        <div className="category-filters">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={
                category === item
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

      </section>

      {/* =========================
          PRODUCTS
      ========================= */}

      <section className="products-section">

        {filteredProducts.length === 0 ? (
          <div className="shop-message">
            <h2>No products found.</h2>

            {search && (
              <p>
                Try another search or select a different category.
              </p>
            )}
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}

      </section>

    </main>
  );
}

export default Shop;