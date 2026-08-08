import { useEffect, useState } from "react";
import api from "../api/api";

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
    return <h1>Loading products...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1>Blissbix Cosmetics</h1>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product) => (
          <div key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: Rs. {product.price}</p>
            <p>Category: {product.category}</p>
            <p>Stock: {product.stock}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Shop;