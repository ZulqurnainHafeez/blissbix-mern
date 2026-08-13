import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("blissbix-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("blissbix-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart
  const addToCart = (product, quantity = 1, color = "", size = "") => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) =>
          item.productId === product._id &&
          item.color === color &&
          item.size === size
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === product._id &&
          item.color === color &&
          item.size === size
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantity,
                  product.stock
                ),
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || "",
          color,
          size,
          quantity: Math.min(quantity, product.stock),
          stock: product.stock,
        },
      ];
    });
  };

  // Increase quantity
  const increaseQuantity = (productId, color = "", size = "") => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (
          item.productId === productId &&
          item.color === color &&
          item.size === size
        ) {
          return {
            ...item,
            quantity: Math.min(item.quantity + 1, item.stock),
          };
        }

        return item;
      })
    );
  };

  // Decrease quantity
  const decreaseQuantity = (productId, color = "", size = "") => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) => {
          if (
            item.productId === productId &&
            item.color === color &&
            item.size === size
          ) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }

          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item
  const removeFromCart = (productId, color = "", size = "") => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.color === color &&
            item.size === size
          )
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Total number of products
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Cart subtotal
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}