import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem(
        "blissbix-wishlist"
      );

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];
    } catch (error) {
      console.error(
        "Error loading wishlist:",
        error
      );

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "blissbix-wishlist",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  useEffect(() => {
    if (!user) return;

    api.get("/wishlist")
      .then((response) => {
        const items = response.data.wishlist.map((item) => ({
          wishlistId: item._id,
          productId: item.product?._id || item.product,
          name: item.product?.name || "Product",
          price: item.product?.price || 0,
          image: item.product?.images?.[0] || "",
          category: item.product?.category || "",
          description: item.product?.description || "",
        }));

        setWishlistItems(items);
      })
      .catch(() => {});
  }, [user]);

  const isInWishlist = (productId) => {
    return wishlistItems.some(
      (item) => item.productId === productId
    );
  };

  const addToWishlist = (product) => {
    if (user) {
      api.post("/wishlist", { product: product._id }).catch(() => {});
    }

    setWishlistItems((currentItems) => {
      if (
        currentItems.some(
          (item) => item.productId === product._id
        )
      ) {
        return currentItems;
      }

      return [
        ...currentItems,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || "",
          category: product.category || "",
          description: product.description || "",
        },
      ];
    });
  };

  const removeFromWishlist = (productId) => {
    if (user) {
      api.delete(`/wishlist/${productId}`).catch(() => {});
    }

    setWishlistItems((currentItems) =>
      currentItems.filter(
        (item) => item.productId !== productId
      )
    );
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    if (user) {
      wishlistItems
        .forEach((item) => {
          api.delete(`/wishlist/${item.productId}`).catch(() => {});
        });
    }

    setWishlistItems([]);
  };

  const wishlistCount = wishlistItems.length;

  const value = {
    wishlistItems,
    wishlistCount,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}