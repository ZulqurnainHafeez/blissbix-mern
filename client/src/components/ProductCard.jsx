import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const {
    _id,
    name,
    title,
    category,
    description,
    price,
    oldPrice,
    compareAtPrice,
    image,
    images,
    sizes,
    colors,
    stock,
    quantity,
  } = product;

  /* =========================================================
     PRODUCT NAME
  ========================================================= */

  const productName =
    name ||
    title ||
    "Beauty Product";

  /* =========================================================
     PRODUCT IMAGE
  ========================================================= */

  const productImage =
    image ||
    images?.[0] ||
    product.imageUrl ||
    "";

  /* =========================================================
     PRICE
  ========================================================= */

  const currentPrice =
    price ?? 0;

  const previousPrice =
    oldPrice ??
    compareAtPrice ??
    null;

  /* =========================================================
     STOCK
  ========================================================= */

  let stockText = "In stock";

  if (typeof stock === "number") {
    stockText =
      stock > 0
        ? `${stock} in stock`
        : "Out of stock";
  }

  if (typeof quantity === "number") {
    stockText =
      quantity > 0
        ? `${quantity} in stock`
        : "Out of stock";
  }

  /* =========================================================
     OPTIONS
  ========================================================= */

  const optionParts = [];

  if (sizes?.length) {
    optionParts.push(
      `Sizes: ${sizes.join(", ")}`
    );
  }

  if (colors?.length) {
    optionParts.push(
      `Colors: ${colors.join(", ")}`
    );
  }

  /* =========================================================
     CARD
  ========================================================= */

  return (
    <article className="product-card">

      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div className="product-image">

        {productImage ? (
          <img
            src={productImage}
            alt={productName}
            loading="lazy"
          />
        ) : (
          <div className="product-image-placeholder">
            No image
          </div>
        )}

        {/* IMAGE NEXT */}

        <Link
          to={`/product/${_id}`}
          className="product-next"
          aria-label={`View ${productName}`}
        >
          ›
        </Link>

      </div>

      {/* =====================================================
          INFO
      ===================================================== */}

      <div className="product-info">

        {/* WISHLIST */}

        <button
          type="button"
          className="wishlist"
          aria-label={`Add ${productName} to wishlist`}
        >
        </button>

        {/* CATEGORY */}

        <p className="product-category">
          {category || "BEAUTY"}
        </p>

        {/* NAME */}

        <h2 className="product-name">
          {productName}
        </h2>

        {/* DESCRIPTION */}

        {description && (
          <p className="product-description">
            {description}
          </p>
        )}

        {/* OPTIONS */}

        {optionParts.length > 0 && (
          <div className="product-options">
            {optionParts.map(
              (option, index) => (
                <div key={index}>
                  {option}
                </div>
              )
            )}
          </div>
        )}

        {/* PRICE */}

        <p className="product-price">

          Rs.{" "}
          {Number(currentPrice).toLocaleString(
            "en-PK"
          )}

          {previousPrice !== null &&
            Number(previousPrice) >
              Number(currentPrice) && (
              <span className="old-price">
                Rs.{" "}
                {Number(
                  previousPrice
                ).toLocaleString("en-PK")}
              </span>
            )}

        </p>

        {/* BOTTOM */}

        <div className="product-bottom">

          <strong>
            {stockText}
          </strong>

          {sizes?.length > 0 && (
            <span>
              {sizes.length}{" "}
              {sizes.length === 1
                ? "size"
                : "sizes"}
            </span>
          )}

        </div>

        {/* BUTTON */}

        <Link
          to={`/product/${_id}`}
          className="view-product"
        >
          View Product
        </Link>

      </div>

    </article>
  );
}

export default ProductCard;