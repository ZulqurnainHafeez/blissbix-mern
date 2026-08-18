const dns = require("dns");

dns.setServers([
  "1.1.1.1",
  "8.8.8.8",
]);

require("dotenv").config();

const connectDB = require("./config/db");
const Product = require("./models/Product");
const products = require("./data/products");

const seedProducts = async () => {
  try {
    console.log("========================================");
    console.log("   BLISSBIX COSMETICS PRODUCT SEED");
    console.log("========================================");

    // Connect MongoDB
    await connectDB();

    console.log("✅ MongoDB connected successfully.");
    console.log("");

    // Check products.js
    if (!Array.isArray(products)) {
      throw new Error(
        "data/products.js must export an array."
      );
    }

    console.log(
      `📦 ${products.length} products found in products.js`
    );

    console.log("");
    console.log("🔍 Checking existing products...");
    console.log("");

    let addedCount = 0;
    let skippedCount = 0;

    // ============================================
    // CHECK EACH PRODUCT
    // ============================================

    for (const product of products) {
      if (!product.name) {
        console.log("⚠️ Skipping product without a name.");
        continue;
      }

      // Find existing product by name
      const existingProduct = await Product.findOne({
        name: product.name,
      });

      // ============================================
      // PRODUCT ALREADY EXISTS
      // ============================================

      if (existingProduct) {
        console.log(
          `⏭️ Already exists: ${product.name}`
        );

        skippedCount++;
        continue;
      }

      // ============================================
      // PREPARE NEW PRODUCT
      // ============================================

      const newProduct = {
        name: product.name,

        description:
          product.description ||
          "Quality beauty product from Blissbix Cosmetics.",

        price:
          Number(product.price) || 0,

        category:
          product.category || "Beauty",

        // Support both:
        // image: "/products/example.jpg"
        // images: ["/products/example.jpg"]

        images:
          Array.isArray(product.images)
            ? product.images
            : product.image
              ? [product.image]
              : [],

        sizes:
          Array.isArray(product.sizes)
            ? product.sizes
            : [],

        colors:
          Array.isArray(product.colors)
            ? product.colors
            : [],

        stock:
          Number(product.stock) || 0,
      };

      // ============================================
      // ADD NEW PRODUCT
      // ============================================

      await Product.create(newProduct);

      console.log(
        `✅ Added: ${product.name}`
      );

      addedCount++;
    }

    // ============================================
    // FINAL RESULT
    // ============================================

    console.log("");
    console.log("========================================");
    console.log("          SEEDING COMPLETED");
    console.log("========================================");

    console.log(
      `✅ New products added: ${addedCount}`
    );

    console.log(
      `⏭️ Existing products skipped: ${skippedCount}`
    );

    console.log("");

    const totalProducts =
      await Product.countDocuments();

    console.log(
      `📦 Total products in database: ${totalProducts}`
    );

    console.log("");

    console.log(
      "🎉 Previous products were NOT removed."
    );

    if (addedCount > 0) {
      console.log(
        `🎉 ${addedCount} new products were added successfully.`
      );
    } else {
      console.log(
        "ℹ️ No new products needed to be added."
      );
    }

    console.log("");

    // Close MongoDB connection
    await Product.db.close();

    process.exit(0);

  } catch (error) {
    console.error("");
    console.error("❌ SEEDING ERROR:");
    console.error(error.message);

    try {
      await Product.db.close();
    } catch (closeError) {
      // Ignore connection close error
    }

    process.exit(1);
  }
};

seedProducts();