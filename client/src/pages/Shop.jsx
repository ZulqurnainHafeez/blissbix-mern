import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import "./Shop.css";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     FILTER STATES
  ========================================================= */

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );

  const [size, setSize] = useState(
    searchParams.get("size") || "All"
  );

  const [color, setColor] = useState(
    searchParams.get("color") || "All"
  );

  const [minPrice, setMinPrice] = useState(
    searchParams.get("minPrice") || ""
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || ""
  );

  const [sort, setSort] = useState(
    searchParams.get("sort") || ""
  );

  /* =========================================================
     FETCH PRODUCTS
  ========================================================= */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const params = {};

        if (search.trim()) {
          params.search = search.trim();
        }

        if (category !== "All") {
          params.category = category;
        }

        if (size !== "All") {
          params.size = size;
        }

        if (color !== "All") {
          params.color = color;
        }

        if (minPrice !== "") {
          params.minPrice = minPrice;
        }

        if (maxPrice !== "") {
          params.maxPrice = maxPrice;
        }

        if (sort) {
          params.sort = sort;
        }

        const response = await api.get("/products", {
          params,
        });

        setProducts(response.data.products || []);
      } catch (err) {
        console.error("Products API error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load products."
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 300);

    return () => clearTimeout(timer);
  }, [
    search,
    category,
    size,
    color,
    minPrice,
    maxPrice,
    sort,
  ]);

  /* =========================================================
     UPDATE URL
  ========================================================= */

  useEffect(() => {
    const params = {};

    if (search.trim()) {
      params.search = search.trim();
    }

    if (category !== "All") {
      params.category = category;
    }

    if (size !== "All") {
      params.size = size;
    }

    if (color !== "All") {
      params.color = color;
    }

    if (minPrice !== "") {
      params.minPrice = minPrice;
    }

    if (maxPrice !== "") {
      params.maxPrice = maxPrice;
    }

    if (sort) {
      params.sort = sort;
    }

    setSearchParams(params, {
      replace: true,
    });
  }, [
    search,
    category,
    size,
    color,
    minPrice,
    maxPrice,
    sort,
    setSearchParams,
  ]);

  /* =========================================================
     CATEGORIES
  ========================================================= */

  const categories = useMemo(() => {
    const values = products
      .map((product) => product.category)
      .filter(Boolean);

    return [
      "All",
      ...new Set(values),
    ];
  }, [products]);

  /* =========================================================
     SIZES
  ========================================================= */

  const sizes = useMemo(() => {
    const values = products.flatMap(
      (product) => product.sizes || []
    );

    return [
      "All",
      ...new Set(values.filter(Boolean)),
    ];
  }, [products]);

  /* =========================================================
     COLORS
  ========================================================= */

  const colors = useMemo(() => {
    const values = products.flatMap(
      (product) => product.colors || []
    );

    return [
      "All",
      ...new Set(values.filter(Boolean)),
    ];
  }, [products]);

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSize("All");
    setColor("All");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="shop-page">
        <div className="shop-message">
          <div>
            <div className="loading-line"></div>
            <h2>Loading collection</h2>
            <p>Please wait...</p>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <main className="shop-page">
        <div className="shop-message error">
          <div>
            <span className="message-eyebrow">
              BLISSBIX COSMETICS
            </span>

            <h2>{error}</h2>

            <p>
              Something went wrong while loading the
              collection.
            </p>

            <button
              type="button"
              className="clear-filters-button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     SHOP
  ========================================================= */

  return (
    <main className="shop-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="shop-header">

        <div className="shop-header-inner">

          <div className="breadcrumb">
            <span>Home</span>
            <span className="breadcrumb-divider">/</span>
            <span>Collections</span>
            <span className="breadcrumb-divider">/</span>
            <span className="breadcrumb-current">
              Beauty
            </span>
          </div>

          <div className="shop-heading">

            <span className="shop-eyebrow">
              BLISSBIX COSMETICS
            </span>

            <h1 className="shop-title">
              Beauty Collection
            </h1>

            <p className="shop-subtitle">
              Discover our collection of beauty and
              skincare essentials.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="shop-content">

        {/* ===================================================
            FILTERS
        =================================================== */}

        <aside className="shop-filters">

          {/* SEARCH */}

          <div className="filter-search">

            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}

          </div>


          {/* FILTER GRID */}

          <div className="filter-grid">

            {/* CATEGORY */}

            <div className="filter-field">

              <label htmlFor="category">
                Category
              </label>

              <div className="select-wrapper">

                <select
                  id="category"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                >
                  {categories.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>

              </div>

            </div>


            {/* SIZE */}

            {sizes.length > 1 && (
              <div className="filter-field">

                <label htmlFor="size">
                  Size
                </label>

                <div className="select-wrapper">

                  <select
                    id="size"
                    value={size}
                    onChange={(e) =>
                      setSize(e.target.value)
                    }
                  >
                    {sizes.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>

                </div>

              </div>
            )}


            {/* COLOR */}

            {colors.length > 1 && (
              <div className="filter-field">

                <label htmlFor="color">
                  Color
                </label>

                <div className="select-wrapper">

                  <select
                    id="color"
                    value={color}
                    onChange={(e) =>
                      setColor(e.target.value)
                    }
                  >
                    {colors.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>

                </div>

              </div>
            )}


            {/* MIN PRICE */}

            <div className="filter-field">

              <label htmlFor="min-price">
                Min Price
              </label>

              <div className="price-wrapper">

                <span>Rs.</span>

                <input
                  id="min-price"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(e.target.value)
                  }
                />

              </div>

            </div>


            {/* MAX PRICE */}

            <div className="filter-field">

              <label htmlFor="max-price">
                Max Price
              </label>

              <div className="price-wrapper">

                <span>Rs.</span>

                <input
                  id="max-price"
                  type="number"
                  min="0"
                  placeholder="5000"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(e.target.value)
                  }
                />

              </div>

            </div>


            {/* SORT */}

            <div className="filter-field">

              <label htmlFor="sort">
                Sort By
              </label>

              <div className="select-wrapper">

                <select
                  id="sort"
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value)
                  }
                >

                  <option value="">
                    Default
                  </option>

                  <option value="price_asc">
                    Price: Low to High
                  </option>

                  <option value="price_desc">
                    Price: High to Low
                  </option>

                  <option value="newest">
                    Newest
                  </option>

                  <option value="oldest">
                    Oldest
                  </option>

                  <option value="popular">
                    Popular
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* FILTER FOOTER */}

          <div className="filter-footer">

            <div className="result-count">

              <span className="result-icon">
                ♡
              </span>

              <span>
                <strong>{products.length}</strong>{" "}
                {products.length === 1
                  ? "product"
                  : "products"}{" "}
                found
              </span>

            </div>

            <button
              type="button"
              className="clear-filters-button"
              onClick={clearFilters}
            >
              Clear Filters
              <span>›</span>
            </button>

          </div>

        </aside>


        {/* ===================================================
            PRODUCTS
        =================================================== */}

        <section className="products-section">

          <div className="products-toolbar">

            <span className="products-count">
              {products.length}{" "}
              {products.length === 1
                ? "product"
                : "products"}
            </span>

            <span className="products-line"></span>

            <span className="products-label">
              Beauty / Collection
            </span>

          </div>


          {products.length === 0 ? (

            <div className="shop-message no-products">

              <div>

                <span className="message-eyebrow">
                  BLISSBIX COSMETICS
                </span>

                <h2>
                  No products found
                </h2>

                <p>
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  className="clear-filters-button"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>

              </div>

            </div>

          ) : (

            <div className="products-grid">

              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

            </div>

          )}

        </section>

      </section>


      {/* =====================================================
          SUBSCRIBE
      ===================================================== */}

      <section className="subscribe">

        <div className="subscribe-inner">

          <span>
            BLISSBIX COSMETICS
          </span>

          <h2>
            Beauty, simply.
          </h2>

          <p>
            Sign up for new arrivals, beauty edits
            and exclusive offers.
          </p>

          <button type="button">
            Subscribe
          </button>

        </div>

      </section>

    </main>
  );
}

export default Shop;