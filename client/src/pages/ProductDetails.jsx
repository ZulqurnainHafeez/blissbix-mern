import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);

        console.log("Product details:", response.data);

        const productData = response.data.product;

        setProduct(productData);

        // Don't automatically select size.
        // This allows us to validate size before adding to cart.
        if (productData?.colors?.length > 0) {
          setSelectedColor(productData.colors[0]);
        }
      } catch (error) {
        console.error("Product details error:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /* =========================
     QUANTITY
  ========================= */

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((previous) => previous + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((previous) => previous - 1);
    }
  };

  /* =========================
     ADD TO CART
  ========================= */

  const handleAddToCart = () => {
    if (!product) return;

    if (product.stock <= 0) {
      setMessage("This product is currently out of stock.");
      return;
    }

    if (product.sizes?.length > 0 && !selectedSize) {
      setMessage("Please select a size first.");
      return;
    }

    if (product.colors?.length > 0 && !selectedColor) {
      setMessage("Please select a color first.");
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
      quantity,
      size: selectedSize,
      color: selectedColor,
    };

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = existingCart.findIndex(
      (item) =>
        item.productId === cartItem.productId &&
        item.size === cartItem.size &&
        item.color === cartItem.color
    );

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += quantity;

      if (
        existingCart[existingIndex].quantity >
        product.stock
      ) {
        existingCart[existingIndex].quantity = product.stock;
      }
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    setMessage("✓ Product added to cart successfully!");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  /* =========================
     ADD TO WISHLIST
  ========================= */

  const handleAddToWishlist = () => {
    if (!product) return;

    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyExists = wishlist.some(
      (item) => item.productId === product._id
    );

    if (alreadyExists) {
      setMessage("♡ Product is already in your wishlist.");

      setTimeout(() => {
        setMessage("");
      }, 2500);

      return;
    }

    const wishlistItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
      category: product.category,
    };

    wishlist.push(wishlistItem);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

    setMessage("♥ Product added to wishlist!");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="product-message">
        <div>
          <div className="loading-spinner"></div>
          <h2>Loading product...</h2>
        </div>
      </div>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <div className="product-message error">
        <div>
          <h2>{error}</h2>
          <Link to="/shop" className="back-shop">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  /* =========================
     PRODUCT NOT FOUND
  ========================= */

  if (!product) {
    return (
      <div className="product-message">
        <div>
          <h2>Product not found.</h2>

          <Link to="/shop" className="back-shop">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [];

  return (
    <main className="product-details-page">

      {/* Breadcrumb */}
      <div className="product-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <strong>{product.name}</strong>
      </div>

      <div className="product-details-container">

        {/* =========================
            IMAGE GALLERY
        ========================= */}

        <div className="details-gallery">

          <div className="details-image">
            {images.length > 0 ? (
              <img
                src={images[selectedImage]}
                alt={product.name}
              />
            ) : (
              <div className="image-placeholder">
                💄
              </div>
            )}

            {product.stock <= 0 && (
              <span className="out-of-stock-badge">
                Out of Stock
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="image-thumbnails">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={
                    selectedImage === index
                      ? "thumbnail active"
                      : "thumbnail"
                  }
                  onClick={() =>
                    setSelectedImage(index)
                  }
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* =========================
            PRODUCT INFORMATION
        ========================= */}

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

          {/* Stock */}
          <div
            className={
              product.stock > 0
                ? "details-stock"
                : "details-stock out"
            }
          >
            {product.stock > 0
              ? `✓ ${product.stock} items available`
              : "✕ Currently out of stock"}
          </div>

          {/* =========================
              COLORS
          ========================= */}

          {product.colors &&
            product.colors.length > 0 && (
              <div className="option-group">
                <div className="option-title">
                  <h3>Color</h3>
                  <span>{selectedColor}</span>
                </div>

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
                      onClick={() =>
                        setSelectedColor(color)
                      }
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* =========================
              SIZES
          ========================= */}

          {product.sizes &&
            product.sizes.length > 0 && (
              <div className="option-group">

                <div className="option-title">
                  <h3>Size</h3>

                  {!selectedSize && (
                    <span className="required">
                      Required
                    </span>
                  )}
                </div>

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
                      onClick={() =>
                        setSelectedSize(size)
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* =========================
              QUANTITY
          ========================= */}

          {product.stock > 0 && (
            <div className="quantity-group">
              <h3>Quantity</h3>

              <div className="quantity-control">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={
                    quantity >= product.stock
                  }
                >
                  +
                </button>

              </div>
            </div>
          )}

          {/* =========================
              MESSAGE
          ========================= */}

          {message && (
            <div className="product-action-message">
              {message}
            </div>
          )}

          {/* =========================
              ACTION BUTTONS
          ========================= */}

          <div className="product-actions">

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

            <button
              type="button"
              className="wishlist-button"
              onClick={handleAddToWishlist}
            >
              ♡ Add to Wishlist
            </button>

          </div>

          {/* Small benefits */}
          <div className="product-benefits">

            <div>
              <span>✓</span>
              <p>
                <strong>Authentic Products</strong>
                <small>100% genuine beauty products</small>
              </p>
            </div>

            <div>
              <span>✓</span>
              <p>
                <strong>Secure Shopping</strong>
                <small>Your information is protected</small>
              </p>
            </div>

            <div>
              <span>✓</span>
              <p>
                <strong>Easy Shopping</strong>
                <small>Simple and convenient ordering</small>
              </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}

export default ProductDetails;