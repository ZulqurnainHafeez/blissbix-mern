import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/api";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  const [message, setMessage] = useState("");
  const {
    isInWishlist,
    toggleWishlist,
  } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/products/${id}`
        );

        const productData =
          response.data.product;

        setProduct(productData);

        if (productData?.colors?.length > 0) {
          setSelectedColor(
            productData.colors[0]
          );
        }

        if (productData?.sizes?.length > 0) {
          setSelectedSize(
            productData.sizes[0]
          );
        }

        setSelectedImage(0);
      } catch (error) {
        console.error(
          "Product details error:",
          error
        );

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

  const increaseQuantity = () => {
    if (
      product &&
      quantity < product.stock
    ) {
      setQuantity(
        (current) => current + 1
      );
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(
        (current) => current - 1
      );
    }
  };

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) {
      return;
    }

    if (
      product.sizes?.length > 0 &&
      !selectedSize
    ) {
      setMessage(
        "Please select a size."
      );
      return;
    }

    addToCart(
      product,
      quantity,
      selectedColor,
      selectedSize
    );

    setMessage(
      "Product added to cart successfully."
    );

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const isWishlisted = isInWishlist(product?._id);

  const handleWishlist = () => {
    if (!product) return;

    toggleWishlist(product);

    setMessage(isWishlisted ? "Removed from wishlist." : "Added to wishlist.");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  if (loading) {
    return (
      <main className="product-message">
        <div>
          <div className="loading-spinner"></div>
          <h2>Loading product...</h2>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="product-message">
        <div>
          <div className="error-icon">
            !
          </div>

          <h2>{error}</h2>

          <Link
            to="/shop"
            className="primary-button"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="product-message">
        <div>
          <h2>
            Product not found.
          </h2>

          <Link
            to="/shop"
            className="primary-button"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const images =
    product.images?.length > 0
      ? product.images
      : [];

  const currentImage =
    images[selectedImage] || "";

  return (
    <main className="product-details-page">

      <div className="product-details-container">

        {/* GALLERY */}

        <section className="product-gallery">

          <div className="thumbnail-list">

            {images.length > 0 ? (
              images.map(
                (image, index) => (
                  <button
                    type="button"
                    key={index}
                    className={
                      selectedImage ===
                      index
                        ? "thumbnail active"
                        : "thumbnail"
                    }
                    onClick={() =>
                      setSelectedImage(
                        index
                      )
                    }
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${
                        index + 1
                      }`}
                    />
                  </button>
                )
              )
            ) : (
              <div className="thumbnail-placeholder">
                💄
              </div>
            )}

          </div>

          <div className="details-image">

            {currentImage ? (
              <img
                src={currentImage}
                alt={product.name}
              />
            ) : (
              <div className="image-placeholder">
                💄
              </div>
            )}

          </div>

        </section>

        {/* INFORMATION */}

        <section className="details-info">

          <p className="eyebrow">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <div className="details-price">
            Rs.{" "}
            {Number(
              product.price
            ).toLocaleString()}
          </div>

          <p className="details-description">
            {product.description ||
              "Premium quality beauty product from Blissbix Cosmetics."}
          </p>

          <div
            className={
              product.stock > 0
                ? "details-stock"
                : "details-stock out-of-stock"
            }
          >
            {product.stock > 0
              ? `${product.stock} items available`
              : "Out of stock"}
          </div>

          {/* COLOR */}

          {product.colors?.length > 0 && (
            <div className="option-group">

              <div className="option-heading">
                <h3>Color</h3>

                <span>
                  {selectedColor}
                </span>
              </div>

              <div className="color-options">

                {product.colors.map(
                  (color) => (
                    <button
                      type="button"
                      key={color}
                      className={
                        selectedColor ===
                        color
                          ? "color-option active"
                          : "color-option"
                      }
                      onClick={() =>
                        setSelectedColor(
                          color
                        )
                      }
                    >
                      <span
                        className="color-dot"
                        style={{
                          backgroundColor:
                            color.toLowerCase(),
                        }}
                      />

                      {color}
                    </button>
                  )
                )}

              </div>

            </div>
          )}

          {/* SIZE */}

          {product.sizes?.length > 0 && (
            <div className="option-group">

              <div className="option-heading">
                <h3>
                  Size
                  <span className="required">
                    *
                  </span>
                </h3>

                <span>
                  {selectedSize ||
                    "Select size"}
                </span>
              </div>

              <div className="options">

                {product.sizes.map(
                  (size) => (
                    <button
                      type="button"
                      key={size}
                      className={
                        selectedSize ===
                        size
                          ? "option active"
                          : "option"
                      }
                      onClick={() =>
                        setSelectedSize(
                          size
                        )
                      }
                    >
                      {size}
                    </button>
                  )
                )}

              </div>

              {!selectedSize && (
                <p className="size-hint">
                  Please select a size.
                </p>
              )}

            </div>
          )}

          {/* QUANTITY */}

          <div className="quantity-group">

            <h3>Quantity</h3>

            <div className="quantity-control">

              <button
                type="button"
                onClick={
                  decreaseQuantity
                }
                disabled={
                  quantity <= 1
                }
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={
                  increaseQuantity
                }
                disabled={
                  product.stock <= 0 ||
                  quantity >=
                    product.stock
                }
              >
                +
              </button>

            </div>

          </div>

          {message && (
            <div className="action-message">
              {message}
            </div>
          )}

          {/* ACTIONS */}

          <div className="product-actions">

            <button
              type="button"
              className="primary-button product-add-button"
              disabled={
                product.stock <= 0
              }
              onClick={
                handleAddToCart
              }
            >
              {product.stock > 0
                ? "Add to Cart"
                : "Out of Stock"}
            </button>

            <button
              type="button"
              className={
                isWishlisted
                  ? "secondary-action wishlist-button active"
                  : "secondary-action wishlist-button"
              }
              onClick={
                handleWishlist
              }
            >
              {isWishlisted
                ? "♥ In Wishlist"
                : "♡ Add to Wishlist"}
            </button>

          </div>

          <Link
            to="/cart"
            className="view-cart-link"
          >
            View Cart →
          </Link>

        </section>

      </div>

    </main>
  );
}

export default ProductDetails;