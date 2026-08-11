import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-image">
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.name} />
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

        {/* Quick Colors / Sizes Preview */}
        {product.colors && product.colors.length > 0 && (
          <div className="product-options">
            <span>
              Colors: {product.colors.join(", ")}
            </span>
          </div>
        )}

        {product.sizes && product.sizes.length > 0 && (
          <div className="product-options">
            <span>
              Sizes: {product.sizes.join(", ")}
            </span>
          </div>
        )}

        {/* Price + Stock */}
        <div className="product-bottom">
          <strong>
            Rs. {product.price.toLocaleString()}
          </strong>

          <span>
            {product.stock} in stock
          </span>
        </div>

        {/* View Product */}
        <Link
          to={`/product/${product._id}`}
          className="view-product"
        >
          View Product
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;