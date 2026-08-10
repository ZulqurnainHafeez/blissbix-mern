import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);

        console.log("Product details:", response.data);

        setProduct(response.data.product);

        if (response.data.product?.colors?.length > 0) {
          setSelectedColor(response.data.product.colors[0]);
        }

        if (response.data.product?.sizes?.length > 0) {
          setSelectedSize(response.data.product.sizes[0]);
        }
      } catch (error) {
        console.error("Product details error:", error);

        setError(
          error.response?.data?.message || "Unable to load product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    console.log("Add to cart:", {
      product: product._id,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });

    alert("Product added to cart!");
  };

  if (loading) {
    return (
      <div className="product-message">
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-message error">
        <h2>{error}</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-message">
        <h2>Product not found.</h2>
      </div>
    );
  }

  return (
    <main className="product-details-page">
      <div className="product-details-container">
        {/* Product Image */}
        <div className="details-image">
          {product.images && product.images.length > 0 ? (
            <img src={product.images[0]} alt={product.name} />
          ) : (
            <div className="image-placeholder">💄</div>
          )}
        </div>

        {/* Product Information */}
        <div className="details-info">
          <p className="details-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <div className="details-price">
            Rs. {product.price.toLocaleString()}
          </div>

          <p className="details-description">
            {product.description}
          </p>

          <div className="details-stock">
            {product.stock > 0
              ? `${product.stock} items available`
              : "Out of stock"}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="option-group">
              <h3>Color</h3>

              <div className="options">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={
                      selectedColor === color
                        ? "option active"
                        : "option"
                    }
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="option-group">
              <h3>Size</h3>

              <div className="options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={
                      selectedSize === size
                        ? "option active"
                        : "option"
                    }
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="quantity-group">
            <h3>Quantity</h3>

            <div className="quantity-control">
              <button
                type="button"
                onClick={decreaseQuantity}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            type="button"
            className="add-cart-button"
            disabled={product.stock <= 0}
            onClick={handleAddToCart}
          >
            {product.stock > 0
              ? "Add to Cart"
              : "Out of Stock"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;