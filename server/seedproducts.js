const dns = require("dns");

dns.setServers([
  "1.1.1.1",
  "8.8.8.8",
]);

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const products = require("./data/products");

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    const createdProducts = await Product.insertMany(products);

    console.log(`${createdProducts.length} products added successfully`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error.message);
    process.exit(1);
  }
};

seedProducts();