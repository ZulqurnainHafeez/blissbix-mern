import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>

          <Navbar />

          <Routes>

            {/* HOME */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* SHOP */}
            <Route
              path="/shop"
              element={<Shop />}
            />

            {/* PRODUCT DETAILS */}
            <Route
              path="/product/:id"
              element={<ProductDetails />}
            />

            {/* LOGIN */}
            <Route
              path="/login"
              element={<Login />}
            />

            {/* REGISTER */}
            <Route
              path="/register"
              element={<Register />}
            />

            <Route element={<ProtectedRoute />}>
              {/* CART */}
              <Route path="/cart" element={<Cart />} />

              {/* WISHLIST */}
              <Route path="/wishlist" element={<Wishlist />} />

              {/* ACCOUNT */}
              <Route path="/account" element={<Account />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>

          </Routes>

          <Footer />

          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;