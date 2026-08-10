import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "./Shop.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");

        console.log("Products response:", response.data);

        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Products API error:", error);

        setError(
          error.response?.data?.message || "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="shop-message">
        <h2>Loading products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-message error">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <main className="shop-page">
      {/* Shop Header */}
      <section className="shop-header">
        <p>BLISSBIX COSMETICS</p>
        <h1>Beauty Collection</h1>
        <span>
          Discover our collection of beauty and skincare essentials.
        </span>
      </section>

      {/* Products */}
      <section className="products-section">
        {products.length === 0 ? (
          <div className="shop-message">
            <h2>No products available.</h2>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                {/* Product Image */}
                <div className="product-image">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                    />
                  ) : (
                    <span>💄</span>
                  )}
                </div>

                {/* Product Info */}
                <div className="product-info">
                  <p className="product-category">
                    {product.category}
                  </p>

                  <h2>{product.name}</h2>

                  <p className="product-description">
                    {product.description}
                  </p>

                  <div className="product-bottom">
                    <strong>
                      Rs. {product.price.toLocaleString()}
                    </strong>

                    <span>
                      Stock: {product.stock}
                    </span>
                  </div>

                  <Link
                    to={`/product/${product._id}`}
                    className="view-product"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Shop;