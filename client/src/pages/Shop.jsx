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

  /* =========================
     FILTER STATES
  ========================= */

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

  /* =========================
     FETCH PRODUCTS
  ========================= */

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

        console.log("Product filters:", params);

        const response = await api.get("/products", {
          params,
        });

        console.log("Products response:", response.data);

        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Products API error:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load products."
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);

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

  /* =========================
     UPDATE URL
  ========================= */

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

    setSearchParams(params, { replace: true });
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

  /* =========================
     CATEGORIES
  ========================= */

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  /* =========================
     SIZES
  ========================= */

  const sizes = useMemo(() => {
    const allSizes = products.flatMap(
      (product) => product.sizes || []
    );

    return [
      "All",
      ...new Set(allSizes.filter(Boolean)),
    ];
  }, [products]);

  /* =========================
     COLORS
  ========================= */

  const colors = useMemo(() => {
    const allColors = products.flatMap(
      (product) => product.colors || []
    );

    return [
      "All",
      ...new Set(allColors.filter(Boolean)),
    ];
  }, [products]);

  /* =========================
     CLEAR FILTERS
  ========================= */

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSize("All");
    setColor("All");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
  };

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

          <button
            type="button"
            onClick={clearFilters}
            className="clear-filters-button"
          >
            Clear Filters
          </button>
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
          Discover our collection of beauty and skincare
          essentials.
        </span>
      </section>

      {/* =========================
          FILTERS
      ========================= */}

      <section className="shop-filters">

        {/* SEARCH */}

        <div className="shop-search">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* CATEGORY */}

        <div className="filter-group">
          <label htmlFor="category">
            Category
          </label>

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

        {/* SIZE */}

        <div className="filter-group">
          <label htmlFor="size">
            Size
          </label>

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

        {/* COLOR */}

        <div className="filter-group">
          <label htmlFor="color">
            Color
          </label>

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

        {/* MIN PRICE */}

        <div className="filter-group price-filter">
          <label htmlFor="minPrice">
            Min Price
          </label>

          <input
            id="minPrice"
            type="number"
            min="0"
            placeholder="Rs. 0"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value)
            }
          />
        </div>

        {/* MAX PRICE */}

        <div className="filter-group price-filter">
          <label htmlFor="maxPrice">
            Max Price
          </label>

          <input
            id="maxPrice"
            type="number"
            min="0"
            placeholder="Rs. 5000"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value)
            }
          />
        </div>

        {/* SORT */}

        <div className="filter-group">
          <label htmlFor="sort">
            Sort By
          </label>

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

        {/* CLEAR */}

        <button
          type="button"
          className="clear-filters-button"
          onClick={clearFilters}
        >
          Clear Filters
        </button>

      </section>

      {/* =========================
          ACTIVE FILTER INFO
      ========================= */}

      <section className="shop-results-info">

        <div>
          <strong>
            {products.length}
          </strong>{" "}
          {products.length === 1
            ? "product"
            : "products"}{" "}
          found
        </div>

        {(search ||
          category !== "All" ||
          size !== "All" ||
          color !== "All" ||
          minPrice ||
          maxPrice ||
          sort) && (
          <span>
            Filters are active
          </span>
        )}

      </section>

      {/* =========================
          PRODUCTS
      ========================= */}

      <section className="products-section">

        {products.length === 0 ? (
          <div className="shop-message">

            <h2>
              No products found.
            </h2>

            <p>
              Try changing your search or
              filters.
            </p>

            <button
              type="button"
              className="clear-filters-button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

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

    </main>
  );
}

export default Shop;