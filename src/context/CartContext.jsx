import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("dapoerniswah_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("dapoerniswah_cart", JSON.stringify(cart));
  }, [cart]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (product, sizeItem, quantity) => {
    if (quantity <= 0) return;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id && item.size.size === sizeItem.size,
      );

      if (existingItemIndex >= 0) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, size: sizeItem, quantity }];
      }
    });
  };

  const updateQuantity = (productId, sizeName, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter(
          (item) =>
            !(item.product.id === productId && item.size.size === sizeName),
        );
      }

      return prevCart.map((item) => {
        if (item.product.id === productId && item.size.size === sizeName) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const removeFromCart = (productId, sizeName) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.product.id === productId && item.size.size === sizeName),
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.size.harga * item.quantity,
    0,
  );
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        toggleCart,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
